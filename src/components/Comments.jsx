import { useSelector } from "react-redux";
import { useGetDataQuery } from "../app/api";
import { selectComments } from "../features/appSlice";

const Comments = () => {
  useGetDataQuery();
  const comments = useSelector(selectComments);
  console.log(comments);

  return (
    <section className="comments">
      <h1>Comments</h1>
      {comments.map((el) => (
        <h4 key={el.id}>Comment</h4>
      ))}
    </section>
  );
};

export default Comments;
