import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "react-hot-toast";
import { UserChallenge } from "@/lib/definitions";
import { Textarea } from "../ui/textarea";

export default function SubmitSolution({
  userId,
  registeredChallengeId,
  setRegisteredChallenges,
  setIsOpen,
}: {
  userId: string | undefined;
  registeredChallengeId: string | null;
  setRegisteredChallenges: React.Dispatch<
    React.SetStateAction<UserChallenge[]>
  >;
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
  const [solution, setSolution] = useState<string>();

  async function submitSolution(
    userId: string | undefined,
    registeredChallengeId: string | null,
    solution: string | undefined
  ) {
    if (!userId || !registeredChallengeId || !solution) {
      toast.error("Missing data to submit the solution.");
      return;
    }

    const promise = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/submit-solution`,
      {
        method: "PUT",
        body: JSON.stringify({ userId, registeredChallengeId, solution }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Failed to submit solution.");
      return result;
    });

    toast.promise(promise, {
      loading: "Submitting solution...",
      success: "Solution submitted successfully!",
      error: (err) => `Submission failed: ${err.message}`,
    });

    try {
      const result = await promise;
      setRegisteredChallenges(result.updatedRegisteredChallenges);
    } catch (err) {
      // Error already handled by toast, but you can log or perform fallback here
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-52">
        <CardTitle>Submit Solution</CardTitle>
        <button
          onClick={() => setIsOpen({ state: false, id: null, action: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-3">{`Challenge ID: ${registeredChallengeId}`}</CardDescription>
        <Textarea
          placeholder="Add a link to your solution or the name for your project."
          className="w-128 h-64"
          onChange={(e) => setSolution(e.target.value)}
        />
      </CardContent>
      <CardFooter className="w-full flex justify-end">
        <button
          onClick={() => {
            submitSolution(userId, registeredChallengeId, solution);
            setIsOpen({ state: false, id: null, action: null });
          }}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
        >
          Submit
        </button>
      </CardFooter>
    </Card>
  );
}
