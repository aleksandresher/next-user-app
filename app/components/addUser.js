"use client";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addNewUserAsync } from "../../redux/features/userThunks";
import * as Toast from "@radix-ui/react-toast";
import { useState, useEffect } from "react";

function AddUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [toastModal, setToastModal] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (toastModal) {
      const timer = setTimeout(() => {
        setToastModal(false);
        setError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toastModal]);

  const onSubmit = async (data) => {
    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      address: {
        city: data.address,
      },
    };
    const success = await dispatch(addNewUserAsync(newUser));

    if (success) {
      setToastModal(true);
      reset();
    } else {
      setError(true);
      setToastModal(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 mb-6 b border-2 py-7 px-5 relative"
    >
      <div className="relative">
        {" "}
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="name"
          className={`text-xl bg-gray-100 p-3 rounded-xl transition focus:ring-2 ${
            errors.name?.type === "required" ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.name?.type === "required"
              ? "border-red-500"
              : "border-gray-100"
          }`}
        />
        {errors.name?.message && (
          <p className="text-red-500 absolute left-0 -bottom-6" role="alert">
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
                "Email address must be a valid address",
            },
          })}
          placeholder="email"
          className={`text-xl bg-gray-100 p-3 rounded-xl transition focus:ring-2 ${
            errors.email?.message ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.email?.message ? "border-red-500" : "border-gray-100"
          }`}
        />
        {errors.email?.message && (
          <p className="text-red-500 absolute left-0 -bottom-6" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="city"
          className={`text-xl bg-gray-100 p-3 rounded-xl transition focus:ring-2 ${
            errors.address?.message ? "ring-red-500" : "ring-green-400"
          } focus:outline-none ${
            errors.address?.message ? "border-red-500" : "border-gray-100"
          }`}
        />
        {errors.address?.message && (
          <p className="text-red-500  absolute left-0 -bottom-6" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>
      <button
        className="bg-blue-300 px-4 py-3 rounded hover:bg-blue-400"
        type="submit"
      >
        Add new User
      </button>
      <Toast.Provider>
        <Toast.Root
          open={toastModal}
          type="foreground"
          className={`absolute top-2 right-3 bottom-2 data-[data-swipe='move'] ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          <Toast.Description>
            {error ? "Adding user failed" : "New User successfully added"}
          </Toast.Description>
        </Toast.Root>

        <Toast.Viewport />
      </Toast.Provider>
    </form>
  );
}

export default AddUser;
