"use client";

import DisplayChallenges from "@/components/user/display-challenges";
import {
  FilterByActivityType,
  FilterByCoinsOffered,
  FilterByPlatform,
} from "@/components/user/filters";
import { Input } from "@/components/ui/input";
import { inter_md } from "@/lib/font";

export default function Challenges() {
  return (
    <div
      className={`${inter_md.className} w-full h-full flex flex-col gap-6 justify-center items-center`}
    >
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <Input
          className="max-w-[35rem]"
          placeholder="Search for a challenge..."
        />
        <FilterByPlatform />
        <FilterByCoinsOffered />
        <FilterByActivityType />
      </div>
      <DisplayChallenges />
    </div>
  );
}
