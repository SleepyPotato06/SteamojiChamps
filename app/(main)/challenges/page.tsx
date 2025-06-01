"use client";

import DisplayChallenges from "@/components/user/display-challenges";
import {
  FilterByActivityType,
  FilterByCoinsOffered,
  FilterByPlatform,
} from "@/components/user/filters";
import { Input } from "@/components/ui/input";
import { inter_md } from "@/lib/font";
import { useState } from "react";
import { Challenge } from "@/lib/definitions";

export default function Challenges() {
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
  return (
    <div
      className={`${inter_md.className} w-full h-full flex flex-col gap-6 justify-center items-center`}
    >
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <Input
          className="max-w-[35rem]"
          placeholder="Search for a challenge..."
        />
        <FilterByPlatform
          defaultPlatform={challenge?.platform}
          setChallenge={setChallenge}
        />
        <FilterByCoinsOffered
          defaultCoinsOffered={challenge?.coinsOffered?.toString()}
          setChallenge={setChallenge}
        />
        <FilterByActivityType />
      </div>
      <DisplayChallenges />
    </div>
  );
}
