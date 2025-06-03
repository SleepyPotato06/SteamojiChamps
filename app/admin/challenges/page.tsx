"use client";
import { useState, useEffect } from "react";
import { Challenge } from "@/lib/definitions";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import DisplayAllChallenges from "@/components/admin/display-all-challenges";
import BulkAddChallengeCard from "@/components/admin/bulk-add-challenge";
import { Input } from "@/components/ui/input";
import AddChallengeCard from "@/components/admin/add-challenge-card";

export default function ManageChallenges() {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchByName, setSearchByName] = useState<string>(``);
  const [isOpen, setIsOpen] = useState<{
    state: boolean;
    id: string | null;
    action: string | null;
  }>({
    state: false,
    id: null,
    action: null,
  });

  useEffect(() => {
    async function getAllChallenges() {
      const getAllChallenges = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-all-challenges`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch challenges");
        return res.json();
      });

      toast
        .promise(getAllChallenges, {
          loading: "Fetching all challenges...",
          success: "Challenges loaded!",
          error: "Failed to load challenges.",
        })
        .then((result) => {
          setAllChallenges(result.allChallenges || []);
          setFilteredChallenges(result.allChallenges || []);
        })
        .catch((error) => {
          console.error("Error fetching challenges:", error);
          setAllChallenges([]);
          setFilteredChallenges([]);
        });
    }

    getAllChallenges();
  }, []);

  useEffect(() => {
    // Add safety check to ensure allUsers is an array
    if (!Array.isArray(allChallenges)) {
      setFilteredChallenges([]);
      return;
    }

    if (searchByName === ``) {
      setFilteredChallenges(allChallenges);
      return;
    }

    setFilteredChallenges(
      allChallenges.filter((challenge: Challenge) =>
        challenge.title?.toLowerCase().includes(searchByName.toLowerCase())
      )
    );
  }, [searchByName, allChallenges]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row gap-2 items-center">
        <Input
          onChange={(e) => setSearchByName(e.target.value)}
          className="min-w-[30rem]"
          placeholder="Search for a challenge..."
        />
        {isOpen.state && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
        )}
        <Button
          onClick={() => setIsOpen({ state: true, action: `add`, id: null })}
          className="hover:text-white hover:bg-blue-600"
        >
          Add Challenge
        </Button>
        <Button
          onClick={() =>
            setIsOpen({ state: true, action: `bulk-add`, id: null })
          }
          className="hover:text-white hover:bg-blue-600"
        >
          Bulk Add
        </Button>
      </div>
      {isOpen.state && isOpen.action === `add` && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <AddChallengeCard
            setIsOpen={setIsOpen}
            setAllChallenges={setAllChallenges}
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

      {filteredChallenges.length !== 0 ? (
        <DisplayAllChallenges
          allChallenges={filteredChallenges}
          setAllChallenges={setAllChallenges}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : (
        <div>No Challenges available !</div>
      )}
    </div>
  );
}
