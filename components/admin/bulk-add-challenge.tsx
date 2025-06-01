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
import { Challenge } from "@/lib/definitions";
import { FaDownload } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

export default function BulkAddChallengeCard({
  setIsOpen,
  setAllChallenges,
}: {
  setIsOpen: (value: {
    state: boolean;
    action: string | null;
    id: string | null;
  }) => void;
  setAllChallenges: (allChallenges: Challenge[]) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const downloadChallengeTemplate = () => {
    const rows = [{}];
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Challenges");

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "title",
          "themeColor",
          "titleIcon",
          "tags",
          "dueDate",
          "coinsOffered",
          "description",
          "referenceDescription",
          "referenceLink",
          "displayImage",
          "imageAlt",
          "platform",
          "lockStatus",
          "hints",
        ],
      ],
      {
        origin: "A1",
      }
    );

    XLSX.writeFile(workbook, "steamoji_challenges_template.xlsx");
  };

  async function bulkUpdate(file: File | null) {
    const formData = new FormData();

    if (file) {
      formData.append("steamoji_challenges", file, file.name);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/bulk-add-challenge`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllChallenges(result.challenges);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center gap-52">
          <div>Bulk Add Challenges</div>
          <button
            onClick={() => setIsOpen({ state: false, action: null, id: null })}
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
          onClick={downloadChallengeTemplate}
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
            setIsOpen({ state: false, action: null, id: null });
          }}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
        >
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
