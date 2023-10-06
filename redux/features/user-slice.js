"use client";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isModalOpen: false,
    userId: null,
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      state.users.unshift(newUser);
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    editUser: (state, action) => {
      const updatedUserData = action.payload;
      const userId = updatedUserData.id;
      const userToUpdate = state.users.find((user) => user.id === userId);

      if (userToUpdate) {
        for (const key in updatedUserData) {
          if (Object.hasOwnProperty.call(updatedUserData, key)) {
            userToUpdate[key] = updatedUserData[key];
          }
        }
      }
    },
  },
});

export const {
  setUsers,
  addUser,
  deleteUser,
  openModal,
  closeModal,
  setUserId,
  editUser,
  setCurrentPage,
} = userSlice.actions;

export default userSlice.reducer;
