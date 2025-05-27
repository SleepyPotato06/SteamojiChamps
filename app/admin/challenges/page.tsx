"use client";
import { useState, useEffect } from "react";
import { Challenge } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import DisplayAllChallenges from "@/components/admin/display-all-challenges";

export default function ManageChallenges() {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [isOpen, setIsOpen] = useState<{
    state: boolean;
    id: string | null;
  }>({
    state: false,
    id: null,
  });

  const [addOpen, setAddOpen] = useState<{
    state: boolean;
    action: string | null;
  }>({
    state: false,
    action: null,
  });

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
        {addOpen.state && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
        )}
        <Button
          onClick={() => setAddOpen({ state: true, action: `add` })}
          className="min-h-[3rem] text-white bg-blue-700 hover:bg-blue-800"
        >
          Add Challenge
        </Button>
        <Button
          onClick={() => setAddOpen({ state: true, action: `bulk-add` })}
          className="min-h-[3rem] text-white bg-blue-700 hover:bg-blue-800"
        >
          Bulk Add
        </Button>
      </div>
      {allChallenges.length !== 0 ? (
        <DisplayAllChallenges
          allChallenges={allChallenges}
          setAllChallenges={setAllChallenges}
        />
      ) : (
        <div>No Challenges available !</div>
      )}
    </div>
  );
}
