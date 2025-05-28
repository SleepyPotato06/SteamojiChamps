import { Card, CardHeader, CardTitle } from "../ui/card";

export default function ViewSubmissions({
  setIsOpen,
}: {
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
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
    </Card>
  );
}
