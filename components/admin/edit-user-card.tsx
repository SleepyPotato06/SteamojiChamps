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
import { useState } from "react";
import { User } from "@/lib/definitions";

export default function EditUserCard({
  user,
  updateUser,
  setEditOpen,
}: {
  user: User;
  updateUser: (
    userId: string,
    first_name: string,
    last_name: string,
    level: string
  ) => void;
  setEditOpen: (value: { state: boolean; id: string | null }) => void;
}) {
  const [updatedFirstName, setUpdatedFirstName] = useState<string>(
    user.first_name
  );
  const [updatedLastName, setUpdatedLastName] = useState<string>(
    user.last_name
  );
  const [updatedLevel, setUpdatedLevel] = useState<string>(user.level);

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
      <CardContent className="flex flex-col gap-2">
        <Label className="text-md">First Name</Label>
        <Input
          type="text"
          defaultValue={updatedFirstName}
          onChange={(e) => setUpdatedFirstName(e.target.value)}
        />
        <Label className="text-md">Last Name</Label>
        <Input
          type="text"
          defaultValue={updatedLastName}
          onChange={(e) => setUpdatedLastName(e.target.value)}
        />
        <Label className="text-md">Level</Label>
        <Select
          defaultValue={updatedLevel}
          onValueChange={(value) => setUpdatedLevel(value)}
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
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            updateUser(
              user.id,
              updatedFirstName,
              updatedLastName,
              updatedLevel
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
