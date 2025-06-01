"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import * as XLSX from "xlsx";
import { User } from "@/lib/definitions";
import { FaDownload } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

export default function BulkAddUserCard({
  setAddOpen,
  setAllUsers,
}: {
  setAddOpen: (value: { state: boolean; action: string | null }) => void;
  setAllUsers: (allUsers: User[]) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const downloadTemplate = () => {
    const rows = [{}];
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [["username", "first_name", "last_name", "password", "level"]],
      {
        origin: "A1",
      }
    );

    XLSX.writeFile(workbook, "steamoji_users_template.xlsx");
  };

  async function bulkUpdate(file: File | null) {
    const formData = new FormData();

    if (file) {
      formData.append("steamoji_users", file, file.name);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/bulk-add-user`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllUsers(result.users);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-52">
          <div>Bulk Add Users</div>
          <button
            onClick={() => setAddOpen({ state: false, action: null })}
            className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
          >
            Close
          </button>
        </CardTitle>
        <div className="text-xs text-red-600">* Only accepting .xlsx</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <button
          className="flex flex-row gap-3 items-center text-blue-700 hover:text-blue-900"
          onClick={downloadTemplate}
        >
          {<FaDownload size={15} />}
          {`Use template`}
        </button>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            bulkUpdate(file);
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
