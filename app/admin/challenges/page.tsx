"use client";
import { useState, useEffect } from "react";
import { Challenge } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import DisplayAllChallenges from "@/components/admin/display-all-challenges";
import EditChallengeCard from "@/components/admin/edit-challenge-card";
import ViewSubmissions from "@/components/admin/view-submissions";
import BulkAddChallengeCard from "@/components/admin/bulk-add-challenge";

export default function ManageChallenges() {
  const challenge = {
    id: undefined,
    title: undefined,
    themeColor: undefined,
    titleIcon: undefined,
    tags: undefined,
    dueDate: undefined,
    coinsOffered: undefined,
    description: undefined,
    reference: {
      refereceDescription: undefined,
      referenceLink: undefined,
    },
    displayImage: undefined,
    imageAlt: undefined,
    platform: undefined,
    lockStatus: undefined,
    hints: undefined,
  };

  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [isOpen, setIsOpen] = useState<{
    state: boolean;
    id: string | null;
    action: string | null;
  }>({
    state: false,
    id: null,
    action: null,
  });

  async function updateChallenge(challenge: Challenge) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/update-challenge`,
        {
          method: "PATCH",
          body: JSON.stringify({ challenge }),
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

  useEffect(() => {
    async function getAllChallenges() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-all-challenges`,
          {
            method: "GET",
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

    getAllChallenges();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row gap-2 items-center">
        <input
          className="min-w-[35rem] min-h-[3rem] px-4 py-1 border-1 border-stone-200 rounded-lg shadow-lg text-md"
          placeholder="Search for a challenge..."
        />
        {isOpen.state && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
        )}
        <Button
          onClick={() => setIsOpen({ state: true, action: `add`, id: null })}
          className="min-h-[3rem] text-white bg-blue-700 hover:bg-blue-800"
        >
          Add Challenge
        </Button>
        <Button
          onClick={() =>
            setIsOpen({ state: true, action: `bulk-add`, id: null })
          }
          className="min-h-[3rem] text-white bg-blue-700 hover:bg-blue-800"
        >
          Bulk Add
        </Button>
      </div>
      {isOpen.state && isOpen.action === `add` && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <EditChallengeCard
            selectedChallenge={challenge}
            setIsOpen={setIsOpen}
            updateChallenge={updateChallenge}
          />
        </div>
      )}

      {isOpen.state && isOpen.action === `bulk-add` && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <BulkAddChallengeCard
            setIsOpen={setIsOpen}
            setAllChallenges={setAllChallenges}
          />
        </div>
      )}

      {allChallenges.length !== 0 ? (
        <DisplayAllChallenges
          allChallenges={allChallenges}
          setAllChallenges={setAllChallenges}
          updateChallenge={updateChallenge}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <div>No Challenges available !</div>
      )}
    </div>
  );
}
