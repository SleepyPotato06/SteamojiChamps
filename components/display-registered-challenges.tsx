"use client";

import { Card } from "@/components/ui/card";
import { TbCancel } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { RegisteredChallenge } from "@/lib/definitions";
import Image from "next/image";
import OjiCoin from "@/public/coin.svg";
import ViewChallenge from "./view-challenge-card";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/UserContext";

export default function DisplayRegisteredChallenges() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<{ state: boolean; id: string }>({
    state: false,
    id: `0`,
  });
  const [registeredChallenges, setRegisteredChallenges] = useState<
    RegisteredChallenge[]
  >([]);
  useEffect(() => {
    async function getChallengeByUserId(userId: string | undefined) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-registered-challenges`,
          {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.ok) {
          const result = await res.json();
          const registeredChallenges = result.registeredChallenges;

          return registeredChallenges;
        }
      } catch (error) {
        console.log(error);
      }
    }

    getChallengeByUserId(user?.id).then((registeredChallenges) => {
      if (registeredChallenges) {
        setRegisteredChallenges(registeredChallenges);
      }
    });
  }, []);

  async function dropChallenge(userChallengeId: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/drop-challenge`,
        {
          method: "DELETE",
          body: JSON.stringify({ userChallengeId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        const updatedChallenges = registeredChallenges.filter(
          (registeredChallenge: RegisteredChallenge) =>
            registeredChallenge.id !== userChallengeId
        );

        setRegisteredChallenges(updatedChallenges);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {registeredChallenges.map((registeredChallenge: RegisteredChallenge) => {
        return (
          <Card key={registeredChallenge.id} className="p-4">
            <div className="flex flex-col gap-5">
              <div className="font-bold flex flex-row gap-32 justify-between items-center">
                <div className="flex flex-row gap-1 items-center text-md">
                  <div>{registeredChallenge.challenge.titleIcon}</div>
                  <div>{registeredChallenge.challenge.title}</div>
                </div>
                <div className="text-xs">
                  {registeredChallenge.submissionStatus === "Pending" ? (
                    <div className="px-2 py-1 border-2 border-amber-400 bg-amber-100 rounded-xl text-amber-500 font-medium">
                      Pending
                    </div>
                  ) : (
                    <div className="px-2 py-1 border-2 border-green-800 bg-green-100 rounded-xl text-green-800 font-medium">
                      Complete
                    </div>
                  )}
                </div>
              </div>
              <div className="text-stone-400 max-w-92 text-sm">
                {registeredChallenge.challenge.description}
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-1.5 items-center px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md text-xs font-bold text-blue-900">
                    <Image
                      src={OjiCoin}
                      width={15}
                      height={15}
                      alt="oji_coin"
                    />
                    {registeredChallenge.challenge.coinsOffered}
                  </div>
                  <div className="flex gap-2 justify-center items-center w-fit px-3 py-1.5 bg-white border-2 border-stone-200 rounded-md text-xs">
                    <FaCalendarDays size={15} />{" "}
                    {new Date(
                      registeredChallenge.challenge.dueDate
                    ).toDateString()}
                  </div>
                </div>
                {/* Blurred background overlay */}
                {isOpen.state && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
                )}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() =>
                      setIsOpen({
                        state: true,
                        id: registeredChallenge.challenge.id,
                      })
                    }
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
                  >
                    <IoEyeSharp size={18} />
                    View
                  </button>
                  <button
                    onClick={() => dropChallenge(registeredChallenge.id)}
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
                  >
                    <TbCancel size={15} />
                  </button>
                </div>
                {/* Modal window */}
                {isOpen.state &&
                  registeredChallenges
                    .filter(
                      (registeredChallenge: RegisteredChallenge) =>
                        registeredChallenge.challenge.id === isOpen.id
                    )
                    .map((registeredChallenge: RegisteredChallenge) => (
                      <div
                        key={registeredChallenge.challenge.id}
                        className="fixed inset-0 flex items-center justify-center z-50"
                      >
                        <ViewChallenge
                          titleIcon={registeredChallenge.challenge.titleIcon}
                          title={registeredChallenge.challenge.title}
                          setIsOpen={setIsOpen}
                          description={
                            registeredChallenge.challenge.description
                          }
                          coinsOffered={
                            registeredChallenge.challenge.coinsOffered
                          }
                          platform={registeredChallenge.challenge.platform}
                          hints={registeredChallenge.challenge.hints}
                          challengeId={registeredChallenge.challenge.id}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
