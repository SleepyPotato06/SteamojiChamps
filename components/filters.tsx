import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterByPlatform() {
  return (
    <div className="flex flex-col gap-2">
      <div>Platform</div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="scratch">Scratch</SelectItem>
            <SelectItem value="blender-3d">Blender 3D</SelectItem>
            <SelectItem value="onshape">OnShape</SelectItem>
            <SelectItem value="tinkercad">TinkerCAD 3D</SelectItem>
            <SelectItem value="microbit">Microsoft Micro::bit</SelectItem>
            <SelectItem value="circuit-playground">
              Circuit Playground
            </SelectItem>
            <SelectItem value="unity">Unity</SelectItem>
            <SelectItem value="inkscape">InkScape</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByDifficulty() {
  return (
    <div className="flex flex-col gap-2">
      <div>Difficulty Level</div>
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

export function FilterByCoinsOffered() {
  return (
    <div className="flex flex-col gap-2">
      <div>Coins Offered</div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="150">150</SelectItem>
            <SelectItem value="200">200</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterByActivityType() {
  return (
    <div className="flex flex-col gap-2">
      <div>Activity Type</div>
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
