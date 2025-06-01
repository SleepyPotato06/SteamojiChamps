"use client";

import { Challenge } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import { FaClipboardCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import EditChallengeCard from "./edit-challenge-card";
import ViewSubmissions from "./view-submissions";
import { useState } from "react";
import ConfirmationModal from "../ui/confirmationModal";

export default function DisplayAllChallenges({
  allChallenges,
  setAllChallenges,
  updateChallenge,
  isOpen,
  setIsOpen,
}: {
  allChallenges: Challenge[];
  setAllChallenges: (allUsers: Challenge[]) => void;
  updateChallenge: (challenge: Challenge) => void;
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
    if (challengeId === undefined) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-challenge`,
        {
          method: "DELETE",
          body: JSON.stringify({ challengeId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllChallenges(result.allChallenges);
        setConfirmChallengeDelete({
          state: false,
          id: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full grid grid-cols-3 gap-3 px-4 pb-4">
      {allChallenges.map((challenge: Challenge) => {
        return (
          <Card key={challenge.id} className="p-4">
            <div className="flex flex-col gap-5">
              <div className="font-bold flex flex-row gap-32 justify-between items-center">
                <div className="flex flex-row gap-1 items-center text-md">
                  <div>{challenge.titleIcon}</div>
                  <div>{challenge.title}</div>
                </div>
              </div>
              <div className="text-stone-400 max-w-92 text-sm">
                {challenge.description}
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                {isOpen.state &&
                  (isOpen.action === `view-submissions` ||
                    isOpen.action === `edit-challenge`) && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
                  )}
                {confirmChallengeDelete.state && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
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
                    Submissions
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
            updateChallenge={updateChallenge}
            setIsOpen={setIsOpen}
          />
        </div>
      )}

      {confirmChallengeDelete.state && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ConfirmationModal
            id={confirmChallengeDelete.id}
            type="challenge"
            setConfirmDelete={setConfirmChallengeDelete}
            deleteUserOrChallenge={deleteChallenge}
          />
        </div>
      )}
    </div>
  );
}
