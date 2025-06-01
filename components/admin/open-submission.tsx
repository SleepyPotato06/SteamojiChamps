import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { UserChallenge } from "@/lib/definitions";

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
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Submission</CardTitle>
        <button
          onClick={() => setIsOpen({ state: false, id: null, action: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="px-2 py-1 w-fit text-blue-800 border-2 border-stone-300 bg-white rounded-2xl text-sm">
            {selectedSubmission.challenge.title}
          </div>
          <div className="px-2 py-1 w-fit text-blue-800 border-2 border-stone-300 bg-white rounded-2xl text-sm">
            {selectedSubmission.challenge.platform}
          </div>
        </div>
        <Textarea
          className="min-w-128 min-h-64 border-2 text-blue-800 border-stone-300 bg-white font-extrabold"
          value={selectedSubmission.submission}
          disabled
        />
      </CardContent>
    </Card>
  );
}
