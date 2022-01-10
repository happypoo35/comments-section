import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useGetDataQuery } from "app/api";
import { selectComments } from "features/commentsSlice";
import Comment from "./Comment";

const Comments = () => {
  useGetDataQuery();
  const comments = useSelector(selectComments);

  return (
    <section className="comments" aria-label="Comments section">
      {comments.map((el, commentId) => (
        <Fragment key={el.id}>
          <Comment comment={el} commentId={commentId} />
          {el.replies.length > 0 && (
            <div className="replies-container">
              <div className="replies">
                {el.replies.map((reply, replyId) => (
                  <Comment
                    comment={reply}
                    commentId={commentId}
                    replyId={replyId}
                    key={reply.id}
                  />
                ))}
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default Comments;
