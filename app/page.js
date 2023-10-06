"use client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { setCurrentPage } from "../redux/features/user-slice";
import { fetchUsersAsync } from "../redux/features/userThunks";
import DeleteBtn from "./components/deleteBtn";
import EditBtn from "./components/editBtn";
import EditModal from "./components/editModal";
import AddUser from "./components/addUser";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function SingleUser() {
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const users = useSelector((state) => state.users.users);
  const modal = useSelector((state) => state.users.isModalOpen);
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage);
  const currentPage = useSelector((state) => state.users.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    if (endIndex > users.length) {
      endIndex = users.length;
    }

    setUsersToDisplay(users.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, users]);

  function handlePageClick(page) {
    dispatch(setCurrentPage(page));
  }
  return (
    <div className="py-10 px-20 flex flex-col items-center">
      <AddUser />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersToDisplay?.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Link href={`user/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell className="text-right flex gap-3 justify-end">
                <EditBtn id={user.id} />
                <DeleteBtn id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {modal ? <EditModal /> : ""}
      <div className="pagination flex gap-3 mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={
              currentPage === index + 1
                ? "bg-blue-300 px-2 py-1 rounded-md"
                : ""
            }
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
