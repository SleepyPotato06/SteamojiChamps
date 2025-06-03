import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { User } from "@/lib/definitions";

export default function EditUserCard({
  user,
  setAllUsers,
  setEditOpen,
}: {
  user: User;
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setEditOpen: (value: { state: boolean; id: string | null }) => void;
}) {
  const [updatedFirstName, setUpdatedFirstName] = useState<string>(
    user.first_name
  );
  const [updatedLastName, setUpdatedLastName] = useState<string>(
    user.last_name
  );
  const [updatedLevel, setUpdatedLevel] = useState<string>(user.level);

  const [updatedTotalCoinsAchieved, setUpdatedTotalCoinsAchieved] =
    useState<number>(user.totalCoinsAchieved);

  async function updateUser(
    userId: string,
    first_name: string,
    last_name: string,
    level: string,
    totalCoinsAchieved: number
  ) {
    const updateUser = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/update-user`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId,
          first_name,
          last_name,
          level,
          totalCoinsAchieved,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    });

    toast
      .promise(updateUser, {
        loading: "Updating user...",
        success: "User updated successfully!",
        error: "Failed to update user.",
      })
      .then((result) => {
        setAllUsers(result.updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-52">
          <div>Edit User</div>
          <button
            onClick={() => setEditOpen({ state: false, id: `0` })}
            className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
          >
            Close
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div id="first_name" className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">First Name</Label>
          <Input
            type="text"
            defaultValue={updatedFirstName}
            onChange={(e) => setUpdatedFirstName(e.target.value)}
          />
        </div>
        <div id="last_name" className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">Last Name</Label>
          <Input
            type="text"
            defaultValue={updatedLastName}
            onChange={(e) => setUpdatedLastName(e.target.value)}
          />
        </div>
        <div id="coins_achieved" className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">Coins Achieved</Label>
          <Input
            defaultValue={updatedTotalCoinsAchieved.toString()}
            onChange={(e) =>
              setUpdatedTotalCoinsAchieved(parseInt(e.target.value))
            }
          />
        </div>
        <div id="level" className="flex flex-col gap-2">
          <Label className="text-sm font-semibold">Level</Label>
          <Select
            defaultValue={updatedLevel}
            onValueChange={(value) => setUpdatedLevel(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Tinkerer">Tinkerer</SelectItem>
                <SelectItem value="Engineer">Engineer</SelectItem>
                <SelectItem value="Inventor">Inventor</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Crafter">Crafter</SelectItem>
                <SelectItem value="Builder">Builder</SelectItem>
                <SelectItem value="Innovator">Innovator</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            updateUser(
              user.id,
              updatedFirstName,
              updatedLastName,
              updatedLevel,
              updatedTotalCoinsAchieved
            );
            setEditOpen({ state: false, id: `0` });
          }}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
        >
          Save
        </button>
      </CardFooter>
    </Card>
  );
}
