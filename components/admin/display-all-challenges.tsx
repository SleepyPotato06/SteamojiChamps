"use client";

import { Challenge } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { FaClipboardCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import EditChallengeCard from "./edit-challenge-card";
import ViewSubmissions from "./view-submissions";
import { useState } from "react";
import { FaRegDotCircle } from "react-icons/fa";
import ConfirmationModal from "../ui/confirmationModal";

export default function DisplayAllChallenges({
  allChallenges,
  setAllChallenges,
  isOpen,
  setIsOpen,
}: {
  allChallenges: Challenge[];
  setAllChallenges: (allChallenges: Challenge[]) => void;
  isOpen: { state: boolean; id: string | null; action: string | null };
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
  const [confirmChallengeDelete, setConfirmChallengeDelete] = useState<{
    state: boolean;
    id: string | undefined;
  }>({ state: false, id: undefined });

  async function deleteChallenge(challengeId: string | undefined) {
    if (!challengeId) return;

    const deleteChallenge = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-challenge`,
      {
        method: "DELETE",
        body: JSON.stringify({ challengeId }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      if (!res.ok) throw new Error("Failed to delete challenge");
      return res.json();
    });

    toast
      .promise(deleteChallenge, {
        loading: "Deleting challenge...",
        success: "Challenge deleted successfully!",
        error: "Failed to delete challenge.",
      })
      .then((result) => {
        setAllChallenges(result.allChallenges);
        setConfirmChallengeDelete({
          state: false,
          id: undefined,
        });
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="w-full grid grid-cols-3 gap-3 px-4 pb-4">
      {allChallenges.map((challenge: Challenge) => {
        return (
          <Card key={challenge.id} className="p-4">
            <div className="h-full flex flex-col justify-between gap-6">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1 items-center text-md">
                  <div>{challenge.titleIcon}</div>
                  <div>{challenge.title}</div>
                </div>
                {challenge.lockStatus === `active` ? (
                  <div className="px-2 py-1 shadow-lg shadow-green-200 border-1 border-green-800 bg-green-100 text-green-800  rounded-xl text-xs flex flex-row gap-1 items-center">
                    <FaRegDotCircle size={10} className="text-green-800" />
                    <div>active</div>
                  </div>
                ) : (
                  <div className="px-2 py-1 shadow-lg shadow-red-200 border-1 border-red-800 bg-red-100 text-red-800  rounded-xl text-xs flex flex-row gap-1 items-center">
                    <FaRegDotCircle size={10} className="text-red-600" />
                    <div>inactive</div>
                  </div>
                )}
              </div>
              <div className="text-stone-400 max-w-92 text-sm">
                {challenge.description}
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                {isOpen.state &&
                  (isOpen.action === `view-submissions` ||
                    isOpen.action === `edit-challenge`) && (
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"></div>
                  )}
                {confirmChallengeDelete.state && (
                  <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"></div>
                )}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => {
                      setIsOpen({
                        state: true,
                        id: challenge.id ?? null,
                        action: `view-submissions`,
                      });
                    }}
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-indigo-600 hover:bg-indigo-100 hover:border-indigo-800 text-sm"
                  >
                    <FaClipboardCheck size={15} />
                    Submissions {`(${challenge})`}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen({
                        state: true,
                        id: challenge.id ?? null,
                        action: `edit-challenge`,
                      });
                    }}
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
                  >
                    <MdEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setConfirmChallengeDelete({
                        state: true,
                        id: challenge.id,
                      })
                    }
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
                  >
                    <TbCancel size={15} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {isOpen.state && isOpen.action === `view-submissions` && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ViewSubmissions
            selectedChallenge={
              allChallenges.filter(
                (challenge: Challenge) => challenge.id === isOpen.id
              )[0]
            }
            setIsOpen={setIsOpen}
          />
        </div>
      )}

      {isOpen.state && isOpen.action === `edit-challenge` && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <EditChallengeCard
            selectedChallenge={
              allChallenges.filter(
                (challenge: Challenge) => challenge.id === isOpen.id
              )[0]
            }
            setAllChallenges={setAllChallenges}
            setIsOpen={setIsOpen}
          />
        </div>
      )}

      {confirmChallengeDelete.state && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ConfirmationModal
            id={confirmChallengeDelete.id}
            setConfirmDelete={setConfirmChallengeDelete}
            deleteUserOrChallenge={deleteChallenge}
          />
        </div>
      )}
    </div>
  );
}
