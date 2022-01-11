import { useEffect, useRef, useState } from "react";
import { ReactComponent as IconPlus } from "icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "icons/icon-minus.svg";
import { ReactComponent as IconReply } from "icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "icons/icon-edit.svg";
import useBool from "hooks/useBool";
import Form from "./Form";
import { formatDistanceToNowStrict, daysToWeeks } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  updateComment,
  selectUser,
} from "features/commentsSlice";
import { openModal } from "features/modalSlice";

const Comment = ({ comment, commentId, replyId }) => {
  const initialValue = comment.replyingTo
    ? `@${comment.replyingTo} ${comment.content}`
    : comment.content;
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState("");
  const isReplying = useBool();
  const isEditing = useBool();
  const commentRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const extractedUser = text.match(/^@\w+/g)
    ? text.match(/^@\w+/g).join().replace("@", "")
    : null;

  const handleChange = (e) => {
    setError("");
    setText(e.target.value);
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleModal = () => {
    dispatch(openModal({ commentId, replyId }));
  };

  const handleIncrement = () => {
    dispatch(increment({ commentId, replyId }));
  };

  const handleDecrement = () => {
    dispatch(decrement({ commentId, replyId }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (text.replace(/^@\w+/, "").trim() === "") {
      setError("Can not be empty");
      setText("");
      setTimeout(() => {
        setError("");
        setText(initialValue);
      }, 2000);
      return;
    }
    dispatch(
      updateComment({
        commentId,
        replyId,
        text: text.replace(/^@\w+/, ""),
        replyingTo: extractedUser,
      })
    );
    isEditing.off();
  };

  const handleReply = () => {
    !isReplying.value &&
      window.scroll({
        top: commentRef.current.offsetTop - 100,
        behavior: "smooth",
      });

    isReplying.toggle();
  };

  const handleEdit = () => {
    isEditing.toggle();
  };

  const getDateDistance = () => {
    const distance = formatDistanceToNowStrict(new Date(comment.createdAt), {
      addSuffix: true,
    });

    if (distance.includes("days")) {
      const days = distance.split(" ")[0];
      const weeks = daysToWeeks(days);

      if (weeks > 0) {
        if (weeks === 1) {
          return weeks + " week ago";
        } else {
          return weeks + " weeks ago";
        }
      } else {
        return distance;
      }
    }
    return distance;
  };

  useEffect(() => {
    const addedComment = [...document.getElementsByClassName("add")][0];
    addedComment?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div className="comment-container" ref={commentRef}>
      <article
        className={`card comment ${
          getDateDistance() === "0 seconds ago" ? "add" : ""
        }`}
        aria-label={`Comment by ${comment.user.username}`}
        id={comment.id}
      >
        <div className="score">
          <button
            className="btn-score"
            aria-label="like"
            onClick={handleIncrement}
          >
            <IconPlus />
          </button>
          <span
            className={`score-num ${
              comment.score === 0
                ? "zero"
                : comment.score > 0
                ? "positive"
                : "negative"
            }`}
          >
            {comment.score}
          </span>
          <button
            className="btn-score"
            aria-label="dislike"
            onClick={handleDecrement}
          >
            <IconMinus />
          </button>
        </div>
        <div className="comment-user">
          <picture>
            <source type="image/webp" srcSet={comment.user.image.webp} />
            <img src={comment.user.image.png} alt={comment.user.username} />
          </picture>
          <strong className="username">
            {comment.user.username}
            {user.username === comment.user.username && (
              <span className="badge">you</span>
            )}
          </strong>
          <p className="date">{getDateDistance()}</p>
        </div>
        <div className="comment-btns">
          {user.username === comment.user.username ? (
            <>
              <button className="btn-icon red" onClick={handleModal}>
                <IconDelete /> Delete
              </button>
              <button className="btn-icon" onClick={handleEdit}>
                <IconEdit /> Edit
              </button>
            </>
          ) : (
            <button className="btn-icon" onClick={handleReply}>
              <IconReply /> Reply
            </button>
          )}
        </div>
        <div className="comment-content">
          {isEditing.value ? (
            <form onSubmit={handleUpdate}>
              <textarea
                className={error ? "error" : ""}
                onChange={handleChange}
                onFocus={handleChange}
                placeholder={error ? "Can not be empty" : "Add a comment"}
                value={text}
                autoFocus
              ></textarea>
              <button className="btn" type="submit">
                update
              </button>
            </form>
          ) : (
            <p>
              {comment.replyingTo ? (
                <>
                  <strong>@{comment.replyingTo}</strong> {comment.content}
                </>
              ) : (
                comment.content
              )}
            </p>
          )}
        </div>
      </article>
      {isReplying.value && (
        <Form
          isReplying={isReplying}
          commentId={commentId}
          replyingTo={comment.user.username}
        />
      )}
    </div>
  );
};

export default Comment;
