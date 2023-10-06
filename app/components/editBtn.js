"use client";
import { useDispatch } from "react-redux";
import { openModal, setUserId } from "../../redux/features/user-slice";

function EditBtn({ id }) {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(setUserId(id));
    dispatch(openModal());
  };

  return (
    <div
      className="bg-green-400 px-3 py-2 rounded hover:bg-green-500 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      edit
    </div>
  );
}

export default EditBtn;
