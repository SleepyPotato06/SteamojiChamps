"use client";

import { Button } from "./ui/button";
import { FaCalendarDays } from "react-icons/fa6";
import { PiCoinsFill } from "react-icons/pi";
import Image from "next/image";
import { ActiveChallengeDetailsProps } from "@/lib/definitions";

export default function ActiveChallengeCard({
  title,
  titleIcon: TitleIcon,
  titleHex,
  dueDate,
  coinsOffered,
  displayImage,
  imageAlt,
}: ActiveChallengeDetailsProps) {
  return (
    <div className="w-fit h-fit flex flex-col justify-between items-start p-5 border-1 border-stone-200 shadow-lg rounded-md">
      {/* Heading with logo */}
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-row gap-4 justify-between items-start">
          <div className="flex flex-col gap-4 justify-between items-start">
            <div id="heading" className="flex flex-row">
              <div className="w-fit h-fit flex flex-row gap-2 justify-center items-center">
                <TitleIcon className={`${titleHex}`} size={30} />
                <div className={`font-semibold text-2xl ${titleHex}`}>
                  {title}
                </div>
              </div>
            </div>
            <div id="tags" className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <div
                  id="due-date"
                  className="w-fit flex flex-row gap-1.5 justify-center items-center px-2.5 py-1 border-2 border-stone-300 bg-stone-100 rounded-xl text-xs"
                >
                  <FaCalendarDays className="text-stone-400" size={15} />
                  {dueDate}
                </div>
                <div
                  id="coins-offered"
                  className="w-fit flex flex-row gap-1.5 justify-center items-center px-2.5 py-1 border-2 border-yellow-400 bg-yellow-100 rounded-xl text-xs"
                >
                  <PiCoinsFill className="text-yellow-600" />
                  <div>{coinsOffered}</div>
                </div>
              </div>
            </div>
          </div>
          <Image
            className="rounded-lg"
            src={displayImage}
            width={90}
            height={90}
            alt={imageAlt}
          />
        </div>
        <div className="w-full flex flex-row gap-3">
          <div id="drop-btn" className="w-full">
            <Button
              className={`w-full  text-black bg-red-100 border-2 border-red-600 hover:bg-red-700 hover:text-white`}
            >
              Drop
            </Button>
          </div>
          <div id="drop-btn" className="w-full">
            <Button
              className={`w-full  text-black bg-blue-100 border-2 border-blue-600 hover:bg-blue-700 hover:text-white`}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
