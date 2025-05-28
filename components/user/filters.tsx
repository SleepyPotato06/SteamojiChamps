import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Challenge } from "@/lib/definitions";

const titleColors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

const titleIcons = [
  "🎮",
  "🌳",
  "🛸",
  "🚀",
  "🐉",
  "🐠",
  "🐿️",
  "🌈",
  "✨",
  "🖌️",
  "🎥",
  "🤖",
  "🦾",
  "⚙️",
  "🛠️",
  "🔩",
  "🏗️",
  "🛰️",
  "🚁",
  "🧱",
  "🏎️",
  "💻",
  "🖥️",
  "📱",
  "🧠",
  "⌨️",
  "📡",
  "🔐",
  "🧮",
  "🌐",
  "🧪",
  "🔬",
  "🧬",
  "🧫",
  "📊",
  "📐",
  "📏",
  "🧊",
  "⚡",
  "💡",
  "🧩",
  "🥇",
  "🎯",
  "🎲",
  "🪄",
  "🌟",
  "🏆",
  "🎉",
  "🎈",
  "📅",
  "⚠️",
];

export function FilterByPlatform({
  defaultPlatform,
  setChallenge,
}: {
  defaultPlatform: string | undefined;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Select
        value={defaultPlatform}
        onValueChange={(value) =>
          setChallenge((prev: Challenge) => ({ ...prev, platform: value }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
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
  );
}

export function FilterByDifficulty() {
  return (
    <div className="flex flex-col gap-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByCoinsOffered({
  defaultCoinsOffered,
  setChallenge,
}: {
  defaultCoinsOffered: string | undefined;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Select
        value={defaultCoinsOffered}
        onValueChange={(value) =>
          setChallenge((prev: Challenge) => ({
            ...prev,
            coinsOffered: parseInt(value),
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByActivityType() {
  return (
    <div className="flex flex-col gap-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an activity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="fabrication">Fabrication</SelectItem>
            <SelectItem value="physical-computing">
              Physical Computing
            </SelectItem>
            <SelectItem value="digital-arts">Digital Arts</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByLockStatus({
  defaultLockStatus,
  setChallenge,
}: {
  defaultLockStatus: string;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
}) {
  return (
    <Select
      value={defaultLockStatus}
      onValueChange={(value) =>
        setChallenge((prev: Challenge) => ({ ...prev, lockStatus: value }))
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function FilterByTitleIcon({
  defaultTitleIcon,
  setChallenge,
}: {
  defaultTitleIcon: string;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Select
        value={defaultTitleIcon}
        onValueChange={(value) =>
          setChallenge((prev: Challenge) => ({ ...prev, titleIcon: value }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {titleIcons.map((titleIcon: string) => (
              <SelectItem key={titleIcon} value={titleIcon}>
                {titleIcon}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByColor({
  defaultTitleColor,
  setChallenge,
}: {
  defaultTitleColor: string;
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>;
}) {
  return (
    <Select
      value={defaultTitleColor}
      onValueChange={(value) =>
        setChallenge((prev: Challenge) => ({ ...prev, themeColor: value }))
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {titleColors.map((titleColor: string, index: number) => (
          <SelectItem
            key={index}
            className="flex flex-row gap-2"
            value={titleColor}
          >
            <div
              className={`min-w-4 min-h-4 rounded-md bg-${titleColor}-600`}
            ></div>
            <div>
              {titleColor.split("-")[0].split("")[0].toUpperCase()}
              {titleColor.split("-")[0].slice(1)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
