import { setUsers, addUser, deleteUser, editUser } from "./user-slice";

export const addNewUserAsync = (user) => async (dispatch) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.status === 201) {
      const data = await response.json();
      dispatch(addUser(data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
};

export const deleteUserAsync = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      dispatch(deleteUser(id));
      return true;
    } else {
      console.error("Failed to delete user. Status code:", response.status);
      return false;
    }
  } catch (error) {
    console.error("An error occurred while deleting the user:", error);
    return false;
  }
};

export const editUserAsync = (userId, userData) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.status === 200) {
      dispatch(
        editUser({
          id: userId,
          name: userData.name,
          email: userData.email,
          address: {
            city: userData.address,
          },
        })
      );
      return true;
    } else {
      console.error("Failed to update user. Status code:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};

export const fetchUsersAsync = () => async (dispatch) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.status !== 200) {
      throw new Error("Failed to fetch");
    }
    const resData = await response.json();
    dispatch(setUsers(resData));
  } catch (err) {
    console.error(err);
  }
};
