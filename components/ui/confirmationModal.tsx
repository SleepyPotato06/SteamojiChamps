import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import React from "react";

export default function ConfirmationModal({
  id,
  deleteUserOrChallenge,
  setConfirmDelete,
}: {
  id: string | undefined;
  deleteUserOrChallenge: (id: string | undefined) => void;
  setConfirmDelete: React.Dispatch<
    React.SetStateAction<{ state: boolean; id: string | undefined }>
  >;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="min-w-[18rem] flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-2">
          <Button
            onClick={() => deleteUserOrChallenge(id)}
            className="hover:bg-blue-600 hover:text-white w-1/2"
          >
            Yes
          </Button>
          <Button
            onClick={() => setConfirmDelete({ state: false, id: undefined })}
            className="hover:bg-red-600 hover:text-white w-1/2"
          >
            No
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
