import { deleteComment } from "features/commentsSlice";
import { closeModal, selectModal } from "features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const handleDelete = () => {
    dispatch(
      deleteComment({ commentId: modal.commentId, replyId: modal.replyId })
    );
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal">
      <div className="modal-card card">
        <h4>Delete comment</h4>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal-btns">
          <button className="btn btn-gray" onClick={handleCancel}>
            no, cancel
          </button>
          <button className="btn btn-red" onClick={handleDelete}>
            yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
