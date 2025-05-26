import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export default function ViewUserCard({
  userId,
  first_name,
  last_name,
  level,
  setIsOpen,
}: {
  userId: string;
  first_name: string;
  last_name: string;
  level: string;
  setIsOpen: (value: { state: boolean; id: string | null }) => void;
}) {
  const [updatedFirstName, setUpdatedFirstName] = useState<string>(first_name);
  const [updatedLastName, setUpdatedLastName] = useState<string>(last_name);
  const [updatedLevel, setUpdatedLevel] = useState<string>(level);
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
        setIsOpen({ state: false, id: null });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-52">
          <div>Edit User</div>
          <Button
            onClick={() => setIsOpen({ state: false, id: `0` })}
            className=" bg-red-500 text-white hover:bg-red-600"
          >
            Close
          </Button>
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
          onClick={() =>
            updateUser(userId, updatedFirstName, updatedLastName, updatedLevel)
          }
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
        >
          Save
        </button>
      </CardFooter>
    </Card>
  );
}
