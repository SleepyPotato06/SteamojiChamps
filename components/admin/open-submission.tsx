import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "react-hot-toast";
import { UserChallenge } from "@/lib/definitions";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

export default function OpenSubmission({
  selectedSubmission,
  setIsOpen,
}: {
  selectedSubmission: UserChallenge;
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
  const [points, setPoints] = useState(0);
  const rawCoinsList = ["0", "25", "50", "75", "100"];
  const indexOfOfferedCoins = rawCoinsList.indexOf(
    selectedSubmission.challenge.coinsOffered?.toString() ?? `0`
  );

  async function gradeUser(
    submissionId: string,
    userId: string,
    points: number
  ) {
    const fetchGradeUser = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/grade-user`,
      {
        method: "PUT",
        body: JSON.stringify({ userId, submissionId, points }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to grade user");
      return res.json();
    });

    toast
      .promise(fetchGradeUser, {
        loading: "Grading user...",
        success: "User graded successfully!",
        error: "Failed to grade user.",
      })
      .catch((error) => {
        console.error("Error grading user:", error);
      });
  }
  return (
    <Card className="min-w-[30rem]">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Submission</CardTitle>
        <button
          onClick={() => setIsOpen({ state: false, id: null, action: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="account">
              Submission Details
            </TabsTrigger>
            <TabsTrigger className="w-full" value="password">
              Grade Submission
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="py-4">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label
                    className="text-md text-stone-500"
                    htmlFor="tabs-demo-name"
                  >
                    Title
                  </Label>
                  <div className="text-md">
                    {selectedSubmission.challenge.title}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-md text-stone-500"
                    htmlFor="tabs-demo-name"
                  >
                    Platform
                  </Label>
                  <div className="text-md">
                    {selectedSubmission.challenge.platform}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    className="text-md text-stone-500"
                    htmlFor="tabs-demo-name"
                  >
                    Submission
                  </Label>
                  <div className="text-md">
                    {selectedSubmission.submission.includes(`https`) ? (
                      <a
                        href={selectedSubmission.submission}
                        target="_blank"
                        className="hover:text-blue-700 hover:underline hover:underline-2 hover:underline-offset-4 hover:decoration-blue-700"
                      >
                        {selectedSubmission.submission}
                      </a>
                    ) : (
                      selectedSubmission.submission
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="py-4">
              <CardContent className="grid gap-6">
                <Select onValueChange={(e) => setPoints(parseInt(e))}>
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">Coins</div>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rawCoinsList
                          .slice(0, indexOfOfferedCoins + 1)
                          .map((coin) => (
                            <SelectItem key={coin} value={coin}>
                              {coin}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </Select>
              </CardContent>
              <CardFooter>
                <Button
                  className="hover:bg-blue-700"
                  onClick={() =>
                    gradeUser(
                      selectedSubmission.id,
                      selectedSubmission.userId,
                      points
                    )
                  }
                >
                  Grade
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
