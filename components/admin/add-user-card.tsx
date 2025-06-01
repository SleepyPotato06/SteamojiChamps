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
import { User } from "@/lib/definitions";
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
  const [username, setUsername] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function addUser(
    username: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    level: string | undefined,
    password: string | undefined
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/add-user`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            first_name: firstName,
            last_name: lastName,
            level,
            password,
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
          <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
          <Label className="text-md">Last Name</Label>
          <Input type="text" onChange={(e) => setLastName(e.target.value)} />
          <Label className="text-md">Username</Label>
          <Input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-md">Password</Label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label className="text-md">Level</Label>
          <Select
            defaultValue={`Junior`}
            onValueChange={(value) => setLevel(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Engineer">Engineer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            addUser(username, firstName, lastName, level, password);
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
