"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function oneUser() {
  const [user, setUser] = useState();
  const params = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((resData) => {
        setUser(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="py-10 px-20 flex flex-col items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{user?.name}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.address.city}</TableCell>
            <TableCell className="text-right">
              <Link href={`/`}>
                {" "}
                <Button>Back</Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
