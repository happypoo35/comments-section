import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addReply,
  selectLastId,
  selectUser,
} from "features/commentsSlice";

const Form = ({ isReplying, replyingTo, commentId }) => {
  const initialValue = replyingTo ? `@${replyingTo} ` : "";
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const lastId = useSelector(selectLastId);

  const extractedUser = text.match(/^@\w+/g)
    ? text.match(/^@\w+/g).join().replace("@", "")
    : null;

  const handleSubmit = (e) => {
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
    if (!isReplying) {
      dispatch(
        addComment({
          id: lastId + 1,
          content: text,
          createdAt: Date.now(),
          score: 0,
          user: user,
          replies: [],
        })
      );
    } else {
      dispatch(
        addReply({
          commentId,
          data: {
            id: lastId + 1,
            content: text.replace(/^@\w+/, ""),
            createdAt: Date.now(),
            score: 0,
            user: user,
            replyingTo: extractedUser,
          },
        })
      );
      isReplying.off();
    }
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleCaretPosition = (e) => {
    setError("");
    setText(initialValue);
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  return (
    <form
      className={`card form ${isReplying ? "form-reply" : ""}`}
      onSubmit={handleSubmit}
    >
      <picture>
        <source type="image/webp" srcSet={user?.image.webp} />
        <img src={user?.image.png} alt={user?.username} />
      </picture>
      <textarea
        className={error ? "error" : ""}
        autoFocus={isReplying}
        placeholder={error ? "Can not be empty" : "Add a comment"}
        onFocus={handleCaretPosition}
        onChange={handleChange}
        value={text}
      ></textarea>
      <button className="btn" type="submit">
        {isReplying ? "reply" : "send"}
      </button>
    </form>
  );
};

export default Form;
