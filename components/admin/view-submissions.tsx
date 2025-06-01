import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Submission } from "@/lib/definitions";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export default function ViewSubmissions({
  setIsOpen,
  challengeId,
}: {
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
  challengeId: string | undefined;
}) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  useEffect(() => {
    async function getSubmissions(challengeId: string | undefined) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-submissions`,
          {
            method: "POST",
            body: JSON.stringify({ challengeId }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const result = await res.json();
          setSubmissions(result.submissions);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getSubmissions(challengeId);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center gap-52">
        <CardTitle className="text-lg">View Submissions</CardTitle>
        <button
          onClick={() => setIsOpen({ state: false, id: `0`, action: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission: Submission, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {submission.user.first_name} {submission.user.last_name}
                </TableCell>
                <TableCell>
                  {submission.submissionStatus === "Pending" ? (
                    <span className="px-2 py-1 text-amber-500 bg-amber-100 border-2 border-amber-500 rounded-xl">
                      Pending
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-green-500 bg-green-100 border-2 border-green-500 rounded-xl">
                      Complete
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
