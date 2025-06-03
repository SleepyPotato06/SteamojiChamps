import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import OpenSubmission from "./open-submission";
import { Challenge, UserChallenge } from "@/lib/definitions";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { toast } from "react-hot-toast";

export default function ViewSubmissions({
  setIsOpen,
  selectedChallenge,
}: {
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
  selectedChallenge: Challenge;
}) {
  const [submissions, setSubmissions] = useState<UserChallenge[]>([]);
  const [isSubmissionOpen, setSubmissionOpen] = useState<{
    state: boolean;
    id: string | null;
    action: string | null;
  }>({ state: false, id: null, action: null });
  useEffect(() => {
    async function getSubmissions(challengeId: string | undefined) {
      if (!challengeId) return;

      const fetchSubmissions = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-submissions`,
        {
          method: "POST",
          body: JSON.stringify({ challengeId }),
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch submissions");
        return res.json();
      });

      toast
        .promise(fetchSubmissions, {
          loading: "Loading submissions...",
          success: "Submissions loaded!",
          error: "Failed to load submissions.",
        })
        .then((result) => {
          setSubmissions(result.submissions || []);
        })
        .catch((err) => {
          console.error("Error fetching submissions:", err);
        });
    }

    getSubmissions(selectedChallenge.id);
  }, []);

  return (
    <>
      {isSubmissionOpen.state && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center gap-52">
          <CardTitle className="text-lg">View Submissions</CardTitle>
          <button
            onClick={() => setIsOpen({ state: false, id: null, action: null })}
            className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
          >
            Close
          </button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="text-center">Submission</TableHead>
                <TableHead className="text-center">Graded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission: UserChallenge, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {submission.user.first_name} {submission.user.last_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {submission.submissionStatus === "Pending" ? (
                      <span className="px-2 py-1 text-amber-500 bg-amber-100 border-2 border-amber-500 rounded-xl">
                        Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSubmissionOpen({
                            state: true,
                            id: submission.id ?? null,
                            action: `open-submission`,
                          });
                        }}
                        className="text-blue-600 font-bold hover:underline hover:underline-2 hover:underline-offset-4"
                      >
                        View
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {submission.isGraded ? (
                      <span className="px-2 py-1 border-2 border-green-800 text-green-800 bg-green-100 rounded-xl">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 border-2 border-red-800 text-red-800 bg-red-100 rounded-xl">
                        No
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {isSubmissionOpen.state &&
        isSubmissionOpen.action === `open-submission` && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <OpenSubmission
              selectedSubmission={
                submissions.filter(
                  (submission: UserChallenge) =>
                    submission.id === isSubmissionOpen.id
                )[0]
              }
              setIsOpen={setIsOpen}
            />
          </div>
        )}
    </>
  );
}
