"use client";

import DisplayChallenges from "@/components/user/display-challenges";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterByActivityType,
  FilterByCoinsOffered,
  FilterByPlatform,
} from "@/components/user/filters";
import { Input } from "@/components/ui/input";
import { inter_md } from "@/lib/font";
import { useState, useEffect } from "react";
import { Challenge } from "@/lib/definitions";
import { useUser } from "@/lib/UserContext";

export default function Challenges() {
  const { user } = useUser();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [challenge, setChallenge] = useState<Challenge>({
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
  });
  const [searchByPlatform, setSearchByPlatform] = useState(`All`);
  const [searchByCoins, setSearchByCoins] = useState(`All`);
  const [searchByName, setSearchByName] = useState(``);

  useEffect(() => {
    async function getAllChallenges() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-all-challenges`,
          {
            method: "POST",
            body: JSON.stringify({ userId: user?.id }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const result = await res.json();
          const challenges = result.allUnregisteredChallenges;
          return challenges;
        }
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
      return null;
    }

    getAllChallenges().then((challenges) => {
      if (challenges) {
        setChallenges(challenges);
        setFilteredChallenges(challenges);
      }
    });
  }, []);

  useEffect(() => {
    const filtered = challenges.filter((challenge: Challenge) => {
      const matchesCoins =
        searchByCoins === "All" ||
        challenge.coinsOffered?.toString() === searchByCoins;

      const matchesPlatform =
        searchByPlatform === "All" || challenge.platform === searchByPlatform;

      const matchesName =
        searchByName === "" ||
        challenge.title?.toLowerCase().includes(searchByName.toLowerCase());

      return matchesCoins && matchesPlatform && matchesName;
    });

    setFilteredChallenges(filtered);
  }, [searchByCoins, searchByPlatform, searchByName, challenges]);

  return (
    <div
      className={`${inter_md.className} w-full h-full flex flex-col gap-6 justify-center items-center`}
    >
      <div className="w-full flex flex-row items-center justify-center gap-4">
        <Input
          className="max-w-[35rem]"
          placeholder="Search for a challenge..."
          onChange={(e) => setSearchByName(e.target.value.trim().toLowerCase())}
        />
        <div id="search-by-coins">
          <Select
            defaultValue="All"
            onValueChange={(val) => {
              setSearchByCoins(val);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select coins" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value={`25`}>25</SelectItem>
                <SelectItem value={`50`}>50</SelectItem>
                <SelectItem value={`75`}>75</SelectItem>
                <SelectItem value={`100`}>100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div id="search-by-platform">
          <Select
            defaultValue="All"
            onValueChange={(val) => {
              setSearchByPlatform(val);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Scratch">Scratch</SelectItem>
                <SelectItem value="Blender 3D">Blender 3D</SelectItem>
                <SelectItem value="OnShape">OnShape</SelectItem>
                <SelectItem value="TinkerCAD 3D">TinkerCAD 3D</SelectItem>
                <SelectItem value="Microsoft Micro::bit">
                  Microsoft Micro::bit
                </SelectItem>
                <SelectItem value="Circuit Playground">
                  Circuit Playground
                </SelectItem>
                <SelectItem value="Unity">Unity</SelectItem>
                <SelectItem value="Inkscape">InkScape</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <FilterByActivityType /> */}
      </div>
      <DisplayChallenges
        challenges={filteredChallenges}
        setChallenges={setChallenges}
      />
    </div>
  );
}
