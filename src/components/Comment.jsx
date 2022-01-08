import { ReactComponent as IconPlus } from "icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "icons/icon-minus.svg";
import { ReactComponent as IconReply } from "icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "icons/icon-edit.svg";
import { useSelector } from "react-redux";
import { selectUser } from "features/appSlice";

const Comment = ({ comment }) => {
  const user = useSelector(selectUser);

  return (
    <article
      className="card comment"
      aria-label={`Comment by ${comment.user.username}`}
    >
      <div className="score">
        <button className="btn-score">
          <IconPlus />
        </button>
        <span className="score-num">{comment.score}</span>
        <button className="btn-score">
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
        <p className="date">{comment.createdAt}</p>
      </div>
      <div className="comment-btns">
        {user.username === comment.user.username ? (
          <>
            <button className="btn-icon red">
              <IconDelete /> Delete
            </button>
            <button className="btn-icon">
              <IconEdit /> Edit
            </button>
          </>
        ) : (
          <button className="btn-icon">
            <IconReply /> Reply
          </button>
        )}
      </div>
      <p className="comment-content">
        {comment.replyingTo ? (
          <>
            <strong>@{comment.replyingTo}</strong> {comment.content}
          </>
        ) : (
          comment.content
        )}
      </p>
    </article>
  );
};

export default Comment;
