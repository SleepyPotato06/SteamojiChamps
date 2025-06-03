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
import { AddUser, User } from "@/lib/definitions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export default function AddUserCard({
  setAddOpen,
  setAllUsers,
}: {
  setAddOpen: (value: { state: boolean; action: string | null }) => void;
  setAllUsers: (allUsers: User[]) => void;
}) {
  const [user, setUser] = useState<AddUser>({
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    level: `Junior`,
    password: undefined,
  });

  async function addUser(user: AddUser) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/add-user`,
        {
          method: "POST",
          body: JSON.stringify({
            user,
          }),
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
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-52">
          <div>Add User</div>
          <button
            onClick={() => setAddOpen({ state: false, action: null })}
            className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
          >
            Close
          </button>
        </CardTitle>
        <div className="text-xs text-red-600">* All fields are mandatory</div>
      </CardHeader>

      <CardContent className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-md">First Name</Label>
          <Input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                first_name: e.target.value.trim(),
              }))
            }
          />
          <Label className="text-md">Last Name</Label>
          <Input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                last_name: e.target.value.trim(),
              }))
            }
          />
          <Label className="text-md">Username</Label>
          <Input
            type="text"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                username: e.target.value.trim(),
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-md">Password</Label>
          <Input
            type="password"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                password: e.target.value.trim(),
              }))
            }
          />
          <Label className="text-md">Level</Label>
          <Select
            defaultValue={user.level}
            onValueChange={(e) =>
              setUser((prev) => ({
                ...prev,
                level: e.trim(),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Fabrication">Fabrication</SelectItem>
                <SelectItem value="Physical Computing">
                  Physical Computing
                </SelectItem>
                <SelectItem value="Digital Arts">Digital Arts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            addUser(user);
            setAddOpen({ state: false, action: null });
          }}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
        >
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
