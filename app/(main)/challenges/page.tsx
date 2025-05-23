"use client";

// import {
//   FilterByPlatform,
//   FilterByDifficulty,
//   FilterByCoinsOffered,
//   FilterByActivityType,
// } from "@/components/filters";
import ChallengeCard from "@/components/challenge-card";
import { FaTree, FaBiohazard, FaRobot } from "react-icons/fa6";
import JungleAdventure from "@/public/ja.png";
import AlienTranslator from "@/public/at.png";
import LunarRover from "@/public/lr.png";
import { inter_md } from "@/lib/font";

export default function Challenges() {
  return (
    <div
      className={`${inter_md.className} w-full h-full flex flex-col gap-4 justify-center items-center`}
    >
      <input
        className="min-w-[35rem] min-h-[3rem] px-4 py-1 border-1 border-stone-200 rounded-lg shadow-lg text-md"
        placeholder="Search for a challenge..."
      />
      <div className="w-full flex flex-wrap gap-3 justify-center items-center px-6 pb-6">
        <ChallengeCard
          title={`Jungle Adventure`}
          titleIcon={FaTree}
          titleHex="text-green-800"
          tags={["Scratch", "Block Coding", "Junior", "Creative"]}
          tagHex={{ border: "border-emerald-800", bg: "bg-emerald-50" }}
          dueDate="22nd May 3:00 PM"
          coinsOffered={50}
          description="Use sprites and logic to build an interactive jungle game."
          displayImage={JungleAdventure}
          imageAlt="jungle_adventure_img"
          buttonHex={{
            bg: "bg-green-50",
            border: "border-green-800",
            hoverBg: "bg-green-800",
          }}
        />
        <ChallengeCard
          title={`Alien Translator`}
          titleIcon={FaBiohazard}
          titleHex="text-purple-800"
          tags={["Blender", "Animation", "Junior", "Creative"]}
          tagHex={{ border: "border-purple-800", bg: "bg-purple-50" }}
          dueDate="25th May 4:00 PM"
          coinsOffered={100}
          description="Make a 3d animation where humans communicate with aliens using visual cues."
          displayImage={AlienTranslator}
          imageAlt="alient_translator_img"
          buttonHex={{
            bg: "bg-purple-50",
            border: "border-purple-800",
            hoverBg: "bg-purple-800",
          }}
        />
        <ChallengeCard
          title={`Lunar Rover`}
          titleIcon={FaRobot}
          titleHex="text-blue-800"
          tags={["OnShape", "3D Design", "Designer", "Creative"]}
          tagHex={{ border: "border-blue-800", bg: "bg-blue-50" }}
          dueDate="30th May 2:00 PM"
          coinsOffered={100}
          description="Design a rover with moving wheels and sensor mounts."
          displayImage={LunarRover}
          imageAlt="lunar_rover_img"
          buttonHex={{
            bg: "bg-blue-50",
            border: "border-blue-800",
            hoverBg: "bg-blue-800",
          }}
        />
        <ChallengeCard
          title={`Jungle Adventure`}
          titleIcon={FaTree}
          titleHex="text-green-800"
          tags={["Scratch", "Block Coding", "Junior", "Creative"]}
          tagHex={{ border: "border-emerald-800", bg: "bg-emerald-50" }}
          dueDate="22nd May 3:00 PM"
          coinsOffered={50}
          description="Use sprites and logic to build an interactive jungle game."
          displayImage={JungleAdventure}
          imageAlt="jungle_adventure_img"
          buttonHex={{
            bg: "bg-green-50",
            border: "border-green-800",
            hoverBg: "bg-green-800",
          }}
        />
        <ChallengeCard
          title={`Jungle Adventure`}
          titleIcon={FaTree}
          titleHex="text-green-800"
          tags={["Scratch", "Block Coding", "Junior", "Creative"]}
          tagHex={{ border: "border-emerald-800", bg: "bg-emerald-50" }}
          dueDate="22nd May 3:00 PM"
          coinsOffered={100}
          description="Use sprites and logic to build an interactive jungle game."
          displayImage={JungleAdventure}
          imageAlt="jungle_adventure_img"
          buttonHex={{
            bg: "bg-green-50",
            border: "border-green-800",
            hoverBg: "bg-green-800",
          }}
        />
        <ChallengeCard
          title={`Alien Translator`}
          titleIcon={FaBiohazard}
          titleHex="text-purple-800"
          tags={["Blender", "Animation", "Junior", "Creative"]}
          tagHex={{ border: "border-purple-800", bg: "bg-purple-50" }}
          dueDate="25th May 4:00 PM"
          coinsOffered={50}
          description="Make a 3d animation where humans communicate with aliens using visual cues."
          displayImage={AlienTranslator}
          imageAlt="alient_translator_img"
          buttonHex={{
            bg: "bg-purple-50",
            border: "border-purple-800",
            hoverBg: "bg-purple-800",
          }}
        />
        <ChallengeCard
          title={`Lunar Rover`}
          titleIcon={FaRobot}
          titleHex="text-blue-800"
          tags={["OnShape", "3D Design", "Designer", "Creative"]}
          tagHex={{ border: "border-blue-800", bg: "bg-blue-50" }}
          dueDate="30th May 2:00 PM"
          coinsOffered={10}
          description="Design a rover with moving wheels and sensor mounts."
          displayImage={LunarRover}
          imageAlt="lunar_rover_img"
          buttonHex={{
            bg: "bg-blue-50",
            border: "border-blue-800",
            hoverBg: "bg-blue-800",
          }}
        />
        <ChallengeCard
          title={`Jungle Adventure`}
          titleIcon={FaTree}
          titleHex="text-green-800"
          tags={["Scratch", "Block Coding", "Junior", "Creative"]}
          tagHex={{ border: "border-emerald-800", bg: "bg-emerald-50" }}
          dueDate="22nd May 3:00 PM"
          coinsOffered={50}
          description="Use sprites and logic to build an interactive jungle game."
          displayImage={JungleAdventure}
          imageAlt="jungle_adventure_img"
          buttonHex={{
            bg: "bg-green-50",
            border: "border-green-800",
            hoverBg: "bg-green-800",
          }}
        />
      </div>
    </div>
  );
}
