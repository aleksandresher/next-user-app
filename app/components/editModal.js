"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/features/user-slice";
import { editUserAsync } from "../../redux/features/userThunks";
import * as Toast from "@radix-ui/react-toast";

function EditModal() {
  const userId = useSelector((state) => state.users.userId);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const modalContainerRef = useRef();
  const additingUser = users.filter((user) => user.id === userId);
  const [toastModal, setToastModal] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: additingUser[0].name,
      email: additingUser[0].email,
      address: additingUser[0].address.city,
    },
  });

  const onSubmit = (data) => {
    dispatch(editUserAsync(userId, data))
      .then((success) => {
        if (success) {
          setTimeout(() => {
            dispatch(closeModal());
          }, 1000);
          setToastModal(true);
        } else {
          setError(true);
          setToastModal(true);
        }
      })
      .catch((error) => {
        console.error("Error dispatching editUserAsync:", error);
      });
  };

  const handleOutsideClick = (event) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(event.target)
    ) {
      console.log("clicked outside");
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <form
      ref={modalContainerRef}
      onSubmit={handleSubmit(onSubmit)}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex items-center gap-2 justify-center py-12 px-6 rounded-xl bg-gray-300"
    >
      <div className="relative">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Enter name"
          className={` p-2 rounded-md transition focus:ring-2 ${
            errors.name?.message ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.name?.message ? "border-red-500" : "border-gray-100"
          }`}
          defaultValue={additingUser[0].name}
        />
        {errors.name?.message && (
          <p className="text-red-500  absolute left-0 -bottom-6" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Enter valid email",
            },
          })}
          placeholder="Enter email"
          className={` p-2 rounded-md transition focus:ring-2 ${
            errors.email?.message ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.email?.message ? "border-red-500" : "border-gray-100"
          }`}
          defaultValue={additingUser[0].email}
        />
        {errors.email?.message && (
          <p className="text-red-500  absolute left-0 -bottom-6" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Enter address"
          className={` p-2 rounded-md transition focus:ring-2 ${
            errors.address?.message ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.address?.message ? "border-red-500" : "border-gray-100"
          }`}
          defaultValue={additingUser[0].address?.city}
        />
        {errors.address?.message && (
          <p className="text-red-500  absolute left-0 -bottom-6" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        className="bg-green-300 px-4 py-2 rounded hover:bg-green-400"
        type="submit"
      >
        Save
      </button>
      <button
        className="bg-blue-300 px-4 py-2 rounded hover:bg-blue-400"
        type="submit"
        onClick={() => dispatch(closeModal())}
      >
        Close
      </button>
      <Toast.Provider>
        <Toast.Root
          open={toastModal}
          type="foreground"
          className={`absolute top-2 right-3 bottom-2 data-[data-swipe='move'] ${
            error ? "text-red-500" : "text-green-600"
          }`}
        >
          <Toast.Description>
            {error ? "Edit operation failed" : "User successfully edited"}
          </Toast.Description>
        </Toast.Root>

        <Toast.Viewport />
      </Toast.Provider>
    </form>
  );
}
export default EditModal;
