"use client";
import { useDispatch } from "react-redux";
import { deleteUserAsync } from "../../redux/features/userThunks";
import { useState, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DeleteBtn({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastModal, setToastModal] = useState(false);
  const [error, setError] = useState(false);
  const dialogContainerRef = useRef();

  useEffect(() => {
    if (toastModal) {
      const timer = setTimeout(() => {
        setToastModal(false);
        setError(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toastModal]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const success = await dispatch(deleteUserAsync(id));

      if (success) {
        setToastModal(true);
        setLoading(false);
      } else {
        setError(true);
        setToastModal(true);
      }
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
    }
  };

  function handleContClick(event) {
    if (
      dialogContainerRef.current &&
      !dialogContainerRef.current.contains(event.target)
    ) {
      if (event.target.tagName.toLowerCase() !== "button") {
        setOpen(false);
        console.log("clicked outside");
      }
    } else {
      event.stopPropagation();
    }
  }

  return (
    <div
      className="bg-red-400 px-3 py-2 rounded hover:bg-red-500"
      onMouseDown={handleContClick}
      ref={dialogContainerRef}
    >
      <AlertDialog
        open={open}
        useRef={dialogContainerRef}
        onOpenChange={setOpen}
      >
        <AlertDialogTrigger>delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            {!loading ? (
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            ) : (
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toast.Provider>
        <Toast.Root
          open={toastModal}
          type="foreground"
          className={`absolute top-2 right-3 bottom-2 data-[data-swipe='move'] ${
            error ? "text-red-500" : "text-green-600"
          }`}
        >
          <Toast.Description>
            {error ? "Delete operation failed" : "User successfully deleted"}
          </Toast.Description>
        </Toast.Root>

        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}

export default DeleteBtn;
