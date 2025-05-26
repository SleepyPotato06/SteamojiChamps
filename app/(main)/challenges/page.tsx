"use client";

import DisplayChallenges from "@/components/display-challenges";
import { inter_md } from "@/lib/font";

export default function Challenges() {
  return (
    <div
      className={`${inter_md.className} w-full h-full flex flex-col gap-4 justify-center items-center px-4`}
    >
      <input
        className="w-full max-w-[35rem] min-h-[3rem] px-4 py-1 border-1 border-stone-200 rounded-lg shadow-lg text-md"
        placeholder="Search for a challenge..."
      />
      <DisplayChallenges />
    </div>
  );
}
