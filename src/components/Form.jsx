import { selectUser } from "features/appSlice";
import { useSelector } from "react-redux";

const Form = () => {
  const user = useSelector(selectUser);

  return (
    <form className="card form">
      <picture>
        <source type="image/webp" srcSet={user?.image.webp} />
        <img src={user?.image.png} alt={user?.username} />
      </picture>
      <textarea placeholder="Add a comment"></textarea>
      <button className="btn" type="submit">
        send
      </button>
    </form>
  );
};

export default Form;
