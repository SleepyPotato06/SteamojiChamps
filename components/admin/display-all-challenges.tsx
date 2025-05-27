"use client";
import { useState } from "react";
import { Challenge } from "@/lib/definitions";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import OjiCoin from "@/public/coin.svg";
import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import EditChallengeCard from "./edit-challenge-card";

export default function DisplayAllChallenges({
  allChallenges,
  setAllChallenges,
}: {
  allChallenges: Challenge[];
  setAllChallenges: (allUsers: Challenge[]) => void;
}) {
  const [editOpen, setEditOpen] = useState<{
    state: boolean;
    id: string | null;
  }>({
    state: false,
    id: null,
  });

  async function updateChallenge(
    challengeId: string,
    title: string,
    titleHex: string,
    titleIcon: string,
    tags: string[],
    tagHex: { bg: string; border: string },
    coinsOffered: number,
    dueDate: Date,
    description: string,
    reference: {
      refereceDescription: string;
      referenceLink: string;
    },
    displayImage: string,
    imageAlt: string,
    platform: string,
    lockStatus: string,
    hints: string[],
    buttonHex: { bg: string; border: string; hoverBg: string }
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/update-challenge`,
        {
          method: "PATCH",
          body: JSON.stringify({
            challengeId,
            title,
            titleHex,
            titleIcon,
            tags,
            tagHex,
            coinsOffered,
            dueDate,
            description,
            reference,
            displayImage,
            imageAlt,
            platform,
            lockStatus,
            hints,
            buttonHex,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllChallenges(result.updatedChallenges);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteChallenge(challengeId: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-challenges`,
        {
          method: "DELETE",
          body: JSON.stringify({ challengeId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAllChallenges(result.allChallenges);
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
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-1.5 items-center px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md text-xs font-bold text-blue-900">
                    <Image
                      src={OjiCoin}
                      width={15}
                      height={15}
                      alt="oji_coin"
                    />
                    {challenge.coinsOffered}
                  </div>
                  <div className="flex gap-2 justify-center items-center w-fit px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md text-xs">
                    <FaCalendarDays size={15} />{" "}
                    {new Date(challenge.dueDate).toDateString()}
                  </div>
                </div>
                {/* Blurred background overlay */}
                {editOpen.state && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
                )}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() =>
                      setEditOpen({
                        state: true,
                        id: challenge.id,
                      })
                    }
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
                  >
                    <MdEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteChallenge(challenge.id)}
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
                  >
                    <TbCancel size={15} />
                  </button>
                </div>
                {/* Modal window */}
                {editOpen.state &&
                  allChallenges
                    .filter(
                      (challenge: Challenge) => challenge.id === editOpen.id
                    )
                    .map((challenge: Challenge) => (
                      <div
                        key={challenge.id}
                        className="fixed inset-0 flex items-center justify-center z-50"
                      >
                        <EditChallengeCard
                          challenge={challenge}
                          updateChallenge={updateChallenge}
                          setEditOpen={setEditOpen}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
