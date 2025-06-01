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
} from "../ui/card";
import EditUserCard from "./edit-user-card";
import ConfirmationModal from "../ui/confirmationModal";
import { useState } from "react";

export default function DisplayAllUsers({
  allUsers,
  setAllUsers,
}: {
  allUsers: User[];
  setAllUsers: (allUsers: User[]) => void;
}) {
  const [confirmUserDelete, setConfirmUserDelete] = useState<{
    state: boolean;
    id: string | undefined;
  }>({ state: false, id: undefined });

  const [editOpen, setEditOpen] = useState<{
    state: boolean;
    id: string | null;
  }>({
    state: false,
    id: null,
  });

  async function deleteUser(userId: string | undefined) {
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

  async function updateUser(
    userId: string,
    first_name: string,
    last_name: string,
    level: string
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/update-user`,
        {
          method: "PATCH",
          body: JSON.stringify({ userId, first_name, last_name, level }),
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
            <CardTitle className="flex flex-row gap-2 items-center text-lg">
              <div>{user.first_name}</div>
              <div>{user.last_name}</div>
              <div className="px-2 py-1 border-2 border-blue-800 text-blue-800 bg-blue-100 rounded-xl text-xs mx-2">
                {user.level}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="min-w-[18rem] flex flex-col gap-2">
              <div className="flex flex-row justify-between px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md font-semibold text-blue-900">
                <div>Coins Earned</div>
                <div>{user.totalCoinsAchieved}</div>
              </div>
              <div className="flex flex-row justify-between px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md font-semibold text-amber-500">
                <div>Achievements</div>
                <div>{user.achievements.length}</div>
              </div>
              <div className="flex flex-row justify-between px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md font-semibold text-green-500">
                <div>Challenges</div>
                <div>{user.achievements.length}</div>
              </div>{" "}
            </CardDescription>
          </CardContent>
          {editOpen.state && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
          )}
          {confirmUserDelete.state && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
          )}
          <CardFooter className="w-full flex flex-row gap-2">
            <button
              onClick={() => setEditOpen({ state: true, id: user.id })}
              className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
            >
              <MdEdit size={18} />
              Edit
            </button>
            <button
              onClick={() => setConfirmUserDelete({ state: true, id: user.id })}
              className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
            >
              <TbCancel size={15} />
            </button>
          </CardFooter>
          {/* Modal window */}

          {editOpen.state && (
            <div
              key={user.id}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <EditUserCard
                user={
                  allUsers.filter((userInner) => userInner.id === user.id)[0]
                }
                updateUser={updateUser}
                setEditOpen={setEditOpen}
              />
            </div>
          )}
        </Card>
      ))}
      {confirmUserDelete.state && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ConfirmationModal
            id={confirmUserDelete.id}
            type="user"
            setConfirmDelete={setConfirmUserDelete}
            deleteUserOrChallenge={deleteUser}
          />
        </div>
      )}
    </div>
  );
}
