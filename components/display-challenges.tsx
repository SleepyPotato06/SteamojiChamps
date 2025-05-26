"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdCheckmark } from "react-icons/io";
import { FaCalendarDays } from "react-icons/fa6";
import OjiCoin from "@/public/coin.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Challenge, UserChallenge } from "@/lib/definitions";
import { useUser } from "@/lib/UserContext";
import ViewChallenge from "./view-challenge-card";

export default function DisplayChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<{ state: boolean; id: string }>({
    state: false,
    id: `0`,
  });
  const { user } = useUser();

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
      } finally {
        setLoading(false);
      }
      return null;
    }

    getAllChallenges().then((challenges) => {
      if (challenges) {
        setChallenges(challenges);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="text-lg font-medium">
            <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24"></svg>
            Loading challenges...
          </span>
        </div>
      ) : (
        <div className="max-w-fit flex flex-wrap gap-3 justify-center items-center px-6 pb-6">
          {challenges.map((challenge: Challenge) => (
            <Card key={challenge.id} className="w-2/5 flex flex-col shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-full flex flex-row gap-2 justify-between items-start">
                  <div className="flex flex-col gap-4 justify-between items-start flex-1">
                    <div id="heading" className="flex flex-col gap-3">
                      <div className="w-fit h-fit flex flex-row gap-2 justify-center items-center">
                        <div>{challenge.titleIcon}</div>
                        <div
                          className={`font-semibold text-2xl ${challenge.titleHex}`}
                        >
                          {challenge.title}
                        </div>
                      </div>
                      <div id="tags" className="text-xs flex flex-wrap gap-2">
                        {challenge.tags.map((tag: string) => (
                          <div
                            key={tag}
                            className={`px-2 py-0.5 ${challenge.tagHex.bg} border-2 ${challenge.tagHex.border} rounded-xl`}
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
                        {new Date(challenge.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Image
                      className="rounded-lg"
                      src={challenge.displayImage || "/placeholder.svg"}
                      width={90}
                      height={90}
                      alt={challenge.imageAlt}
                    />
                    <div
                      id="coins-offered"
                      className="w-full flex flex-row gap-1.5 justify-center items-center px-2.5 py-1 border-2 border-blue-800 bg-blue-100 text-blue-800 font-semibold rounded-xl text-sm"
                    >
                      <Image
                        src={OjiCoin}
                        width={15}
                        height={15}
                        alt={challenge.imageAlt}
                      />
                      <div>{challenge.coinsOffered}</div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow pt-0">
                <div className="flex flex-col gap-3">
                  <div
                    id="description"
                    className="max-w-[30rem] text-wrap text-md"
                  >
                    {challenge.description}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="mt-auto">
                {/* Blurred background overlay */}
                {isOpen.state && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
                )}
                {user?.userChallenges.some(
                  (userChallenge: UserChallenge) =>
                    userChallenge.challengeId === challenge.id
                ) ? (
                  <Button
                    className={`text-green-800 bg-green-100 border-2 border-green-800 hover:bg-green-800 hover:text-white`}
                  >
                    <IoMdCheckmark />
                    Registered
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsOpen({ state: true, id: challenge.id })}
                    className={`text-blue-800 bg-blue-100 border-2 border-blue-800 hover:bg-blue-800 hover:text-white`}
                  >
                    Explore
                  </Button>
                )}
                {/* Modal window */}
                {isOpen.state &&
                  challenges
                    .filter(
                      (challenge: Challenge) => challenge.id === isOpen.id
                    )
                    .map((challenge: Challenge) => (
                      <div
                        key={challenge.id}
                        className="fixed inset-0 flex items-center justify-center z-50"
                      >
                        <ViewChallenge
                          titleIcon={challenge.titleIcon}
                          title={challenge.title}
                          setIsOpen={setIsOpen}
                          description={challenge.description}
                          coinsOffered={challenge.coinsOffered}
                          platform={challenge.platform}
                          hints={challenge.hints}
                          challengeId={challenge.id}
                        />
                      </div>
                    ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
