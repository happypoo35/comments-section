import Comments from "components/Comments";
import Form from "components/Form";
import Modal from "components/Modal";

import { useSelector } from "react-redux";
import { selectModal } from "features/modalSlice";

function App() {
  const isModal = useSelector(selectModal);

  return (
    <main>
      <h1>Comment Section</h1>
      <div className="container">
        {isModal.value && <Modal />}
        <Comments />
        <Form />
      </div>
    </main>
  );
}

export default App;
