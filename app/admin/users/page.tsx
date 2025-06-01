"use client";

import DisplayAllUsers from "@/components/admin/display-all-users";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { inter_md } from "@/lib/font";
import { User } from "@/lib/definitions";
import AddUserCard from "@/components/admin/add-user-card";
import BulkAddUserCard from "@/app/bulk-add-user-card";
import { Input } from "@/components/ui/input";

export default function ManageUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [addOpen, setAddOpen] = useState<{
    state: boolean;
    action: string | null;
  }>({
    state: false,
    action: null,
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

  return (
    <div
      className={`${inter_md.className} w-fit h-full flex flex-col gap-4 justify-center items-center pb-6`}
    >
      <div className="w-fit h-fit flex flex-row gap-4 justify-center items-center">
        <Input className="min-w-[30rem]" placeholder="Search for a user..." />
        {addOpen.state && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
        )}
        <Button
          onClick={() => setAddOpen({ state: true, action: `add` })}
          className="hover:text-white hover:bg-blue-600"
        >
          Add User
        </Button>
        <Button
          onClick={() => setAddOpen({ state: true, action: `bulk-add` })}
          className="hover:text-white hover:bg-blue-600"
        >
          Bulk Add
        </Button>
        {/* Modal window */}

        {addOpen.state && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {addOpen.action === `add` ? (
              <AddUserCard setAllUsers={setAllUsers} setAddOpen={setAddOpen} />
            ) : (
              <BulkAddUserCard
                setAllUsers={setAllUsers}
                setAddOpen={setAddOpen}
              />
            )}
          </div>
        )}
      </div>
      {allUsers.length > 0 ? (
        <DisplayAllUsers allUsers={allUsers} setAllUsers={setAllUsers} />
      ) : (
        <div>No users registered !</div>
      )}
    </div>
  );
}
