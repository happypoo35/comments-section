import { useSelector } from "react-redux";
import { useGetDataQuery } from "../app/api";
import { selectComments } from "../features/appSlice";
import Comment from "./Comment";

const Comments = () => {
  useGetDataQuery();
  const comments = useSelector(selectComments);

  return (
    <section className="comments" aria-label="Comments section">
      {comments.map((el) => (
        <div className="comment-container" key={el.id}>
          <Comment comment={el} />
          {el.replies.length > 0 && (
            <div className="replies">
              <div className="replies-container">
                {el.replies.map((reply) => (
                  <Comment comment={reply} key={reply.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Comments;
