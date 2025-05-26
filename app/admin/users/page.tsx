"use client";

import DisplayAllUsers from "@/components/display-all-users";
import { Button } from "@/components/ui/button";
import { inter_md } from "@/lib/font";

export default function ManageUsers() {
  return (
    <div
      className={`${inter_md.className} w-fit h-full flex flex-col gap-4 justify-center items-center pb-6`}
    >
      <div className="w-fit h-fit flex flex-row gap-4 justify-center items-center">
        <input
          className="min-w-[35rem] min-h-[3rem] px-4 py-1 border-1 border-stone-200 rounded-lg shadow-lg text-md"
          placeholder="Search for a user..."
        />
        <Button className="bg-blue-600 hover:bg-blue-800">Add User</Button>
      </div>
      <DisplayAllUsers />
    </div>
  );
}
