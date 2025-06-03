"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendarDays } from "react-icons/fa6";
import OjiCoin from "@/public/coin.svg";
import Image from "next/image";
import React, { useState } from "react";
import { Challenge } from "@/lib/definitions";
import ViewChallenge from "./view-challenge-card";

export default function DisplayChallenges({
  challenges,
  setChallenges,
}: {
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
}) {
  const [isOpen, setIsOpen] = useState<{ state: boolean; id: string | null }>({
    state: false,
    id: null,
  });

  return (
    <div>
      <div className="w-full grid grid-cols-2 gap-3 justify-center items-center">
        {challenges.map((challenge: Challenge) => (
          <Card key={challenge.id} className="h-full flex flex-col shadow-lg">
            <CardHeader>
              <div className="w-full flex flex-row gap-2 justify-between items-start">
                <div className="flex flex-col gap-4 justify-between items-start flex-1">
                  <div id="heading" className="flex flex-col gap-3">
                    <div className="w-fit h-fit flex flex-row gap-2 justify-center items-center">
                      <div>{challenge.titleIcon}</div>
                      <div className={`font-semibold text-xl`}>
                        {challenge.title}
                      </div>
                    </div>
                    <div id="tags" className="text-xs flex flex-wrap gap-2">
                      {challenge.tags?.map((tag: string) => (
                        <div
                          key={tag}
                          className={`px-2 py-0.5 bg-${challenge.themeColor}-100 border-2 border-${challenge.themeColor}-800 text-${challenge.themeColor}-800 rounded-xl`}
                        >
                          {"# "}
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div
                      id="due-date"
                      className="w-fit flex flex-row gap-1.5 justify-center items-center px-2.5 py-1 border-2 border-stone-300 bg-stone-100 rounded-xl text-sm"
                    >
                      <FaCalendarDays className="text-stone-400" size={15} />
                      {new Date(
                        challenge.dueDate ?? Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Image
                    className="rounded-lg"
                    src={challenge.displayImage || "/placeholder.svg"}
                    width={90}
                    height={90}
                    alt={challenge.imageAlt ?? `failed_image`}
                  />
                  <div
                    id="coins-offered"
                    className={`w-full flex flex-row gap-1.5 justify-center items-center px-2.5 py-1 border-2 border-${challenge.themeColor}-800 bg-${challenge.themeColor}-100 text-${challenge.themeColor}-800 font-semibold rounded-xl text-sm`}
                  >
                    <Image
                      src={OjiCoin}
                      width={15}
                      height={15}
                      alt={challenge.imageAlt ?? `failed_image`}
                    />
                    <div>{challenge.coinsOffered}</div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow pt-0">
              <div className="flex flex-col gap-3">
                <div id="description" className="text-wrap text-md">
                  {challenge.description}
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-auto">
              {/* Blurred background overlay */}
              {isOpen.state && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
              )}
              <Button
                onClick={() =>
                  setIsOpen({ state: true, id: challenge.id ?? null })
                }
                className={`text-${challenge.themeColor}-800 bg-${challenge.themeColor}-100 border-2 border-${challenge.themeColor}-800 hover:bg-${challenge.themeColor}-800 hover:text-white`}
              >
                Explore
              </Button>
              {/* Modal window */}
              {isOpen.state &&
                challenges
                  .filter((challenge: Challenge) => challenge.id === isOpen.id)
                  .map((challenge: Challenge) => (
                    <div
                      key={challenge.id}
                      className="fixed inset-0 flex items-center justify-center z-50"
                    >
                      <ViewChallenge
                        titleIcon={challenge.titleIcon ?? `⚠️`}
                        title={challenge.title ?? `Undefined Title`}
                        setIsOpen={setIsOpen}
                        description={challenge.description ?? `Undefined`}
                        coinsOffered={challenge.coinsOffered ?? 0}
                        platform={challenge.platform ?? `undefined`}
                        hints={challenge.hints ?? []}
                        challengeId={challenge.id ?? `undefined`}
                        isRegistered={false}
                      />
                    </div>
                  ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
