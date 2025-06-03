"use client";

import DisplayAllUsers from "@/components/admin/display-all-users";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { inter_md } from "@/lib/font";
import { User } from "@/lib/definitions";
import toast from "react-hot-toast";
import AddUserCard from "@/components/admin/add-user-card";
import BulkAddUserCard from "@/app/bulk-add-user-card";
import { Input } from "@/components/ui/input";

export default function ManageUsers() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchByName, setSearchByName] = useState<string>(``);
  const [addOpen, setAddOpen] = useState<{
    state: boolean;
    action: string | null;
  }>({
    state: false,
    action: null,
  });

  useEffect(() => {
    async function getAllUsers() {
      const getAllUsers = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-all-users`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      });

      toast
        .promise(getAllUsers, {
          loading: "Fetching users...",
          success: "Users loaded!",
          error: "Failed to load users.",
        })
        .then((result) => {
          console.log(result.allUsers);
          setAllUsers(result.allUsers || []);
          setFilteredUsers(result.allUsers || []);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setAllUsers([]);
          setFilteredUsers([]);
        });
    }

    getAllUsers();
  }, []);

  useEffect(() => {
    // Add safety check to ensure allUsers is an array
    if (!Array.isArray(allUsers)) {
      setFilteredUsers([]);
      return;
    }

    if (searchByName === ``) {
      setFilteredUsers(allUsers);
      return;
    }

    setFilteredUsers(
      allUsers.filter(
        (user: User) =>
          user.first_name?.toLowerCase().includes(searchByName.toLowerCase()) ||
          user.last_name?.toLowerCase().includes(searchByName.toLowerCase())
      )
    );
  }, [searchByName, allUsers]);

  const updateAllUsers = (newUsers: User[]) => {
    const users = Array.isArray(newUsers) ? newUsers : [];
    setAllUsers(users);

    // Apply current search filter to new users
    if (searchByName === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user: User) =>
            user.first_name
              ?.toLowerCase()
              .includes(searchByName.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(searchByName.toLowerCase())
        )
      );
    }
  };
  return (
    <div
      className={`${inter_md.className} w-fit h-full flex flex-col gap-4 justify-center items-center pb-6`}
    >
      <div className="w-fit h-fit flex flex-row gap-4 justify-center items-center">
        <Input
          onChange={(e) => setSearchByName(e.target.value)}
          className="min-w-[30rem]"
          placeholder="Search for a user..."
        />
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
              <AddUserCard
                setAllUsers={updateAllUsers}
                setAddOpen={setAddOpen}
              />
            ) : (
              <BulkAddUserCard
                setAllUsers={updateAllUsers}
                setAddOpen={setAddOpen}
              />
            )}
          </div>
        )}
      </div>
      {/* Add safety check here */}
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        <DisplayAllUsers allUsers={filteredUsers} setAllUsers={setAllUsers} />
      ) : (
        <div>
          {Array.isArray(filteredUsers) ? "No users registered!" : "Loading..."}
        </div>
      )}
    </div>
  );
}
