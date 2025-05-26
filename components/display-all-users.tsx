"use client";

import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { User } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ViewUserCard from "./view-user-card";
import { useState, useEffect } from "react";

export default function DisplayAllUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<{ state: boolean; id: string | null }>({
    state: false,
    id: null,
  });
  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-all-users`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const result = await res.json();
          setAllUsers(result.allUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAllUsers();
  }, []);

  async function deleteUser(userId: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-user`,
        {
          method: "DELETE",
          body: JSON.stringify({ userId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllUsers(result.updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-start">
      {allUsers.map((user: User) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 text-lg">
              <div>{user.first_name}</div>
              <div>{user.last_name}</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="min-w-[18rem] flex flex-col gap-2">
              <div className="flex flex-row justify-between px-3 py-1.5 border-2 border-blue-500 bg-blue-100 text-blue-600 font-medium rounded-sm">
                <div>Coins Earned</div>
                <div>{user.totalCoinsAchieved}</div>
              </div>
              <div className="flex flex-row justify-between px-3 py-1.5 border-2 border-amber-500 bg-amber-100 text-amber-600 font-medium rounded-sm">
                <div>Achievements</div>
                <div>{user.achievements.length}</div>
              </div>
              <div className="flex flex-row justify-between px-3 py-1.5 border-2 border-green-500 bg-green-100 text-green-600 font-medium rounded-sm">
                <div>Challenges</div>
                <div>{user.achievements.length}</div>
              </div>{" "}
            </CardDescription>
          </CardContent>
          {isOpen.state && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
          )}

          <CardFooter className="w-full flex flex-row justify-end gap-2">
            <button
              onClick={() => setIsOpen({ state: true, id: user.id })}
              className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
            >
              <MdEdit size={18} />
              Edit
            </button>
            <button
              onClick={() => deleteUser(user.id)}
              className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
            >
              <TbCancel size={15} />
            </button>
          </CardFooter>
          {/* Modal window */}

          {isOpen.state && (
            <div
              key={user.id}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <ViewUserCard
                userId={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                level={user.level}
                setIsOpen={setIsOpen}
              />{" "}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
