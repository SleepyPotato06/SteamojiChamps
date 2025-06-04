"use client";

import { Card } from "@/components/ui/card";
import { TbCancel } from "react-icons/tb";
import { FaFlagCheckered } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { UserChallenge } from "@/lib/definitions";
import Image from "next/image";
import OjiCoin from "@/public/coin.svg";
import ViewChallenge from "@/components/user/view-challenge-card";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/UserContext";
import SubmitSolution from "./submit-solution";
import ConfirmationModal from "../ui/confirmationModal";
import toast from "react-hot-toast";

export default function DisplayRegisteredChallenges() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<{
    state: boolean;
    id: string | null;
    action: string | null;
  }>({
    state: false,
    id: null,
    action: null,
  });
  const [registeredChallenges, setRegisteredChallenges] = useState<
    UserChallenge[]
  >([]);

  const [confirmRegChallengeDelete, setConfrmRegChallengeDelete] = useState<{
    state: boolean;
    id: string | undefined;
  }>({ state: false, id: undefined });

  useEffect(() => {
    async function getChallengeByUserId(userId: string | undefined) {
      const fetchChallengeByUserId = fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-registered-challenges`,
        {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        const result = await res.json();
        if (!res.ok)
          throw new Error(result.message || "Failed to fetch challenges");
        return result.registeredChallenges;
      });

      toast
        .promise(fetchChallengeByUserId, {
          loading: "Fetching registered challenges...",
          success: "Challenges loaded!",
          error: "Failed to load challenges.",
        })
        .then((registeredChallenges) => {
          setRegisteredChallenges(registeredChallenges);
        })
        .catch((err) => {
          console.error("Challenge fetch error:", err);
        });
    }

    getChallengeByUserId(user?.id);
  }, []);

  async function deleteRegisteredChallenge(
    userChallengeId: string | undefined
  ) {
    if (!userChallengeId) {
      toast.error("Challenge ID is missing.");
      return;
    }

    const fetchDeleteRegisteredChallenge = fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/delete-registered-challenge`,
      {
        method: "DELETE",
        body: JSON.stringify({ userChallengeId }),
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to delete challenge.");
      }
      return result;
    });

    try {
      await toast.promise(fetchDeleteRegisteredChallenge, {
        loading: "Deleting challenge...",
        success: "Challenge deleted!",
        error: (err) => `Delete failed: ${err.message}`,
      });

      // Only update state on success
      const updatedChallenges = registeredChallenges.filter(
        (registeredChallenge: UserChallenge) =>
          registeredChallenge.id !== userChallengeId
      );

      setTimeout(() => {
        setRegisteredChallenges(updatedChallenges);
        setConfrmRegChallengeDelete({ state: false, id: undefined });
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {registeredChallenges.map((registeredChallenge: UserChallenge) => {
        return (
          <Card key={registeredChallenge.id} className="p-4">
            <div className="flex flex-col gap-5">
              <div className="font-bold flex flex-row gap-32 justify-between items-center">
                <div className="flex flex-row gap-1 items-center text-md">
                  <div>{registeredChallenge.challenge.titleIcon}</div>
                  <div className="text-no-wrap">
                    {registeredChallenge.challenge.title}
                  </div>
                </div>
                <div className="text-xs">
                  {registeredChallenge.submissionStatus === "Pending" ? (
                    <div className="px-2 py-1 border-2 border-amber-400 bg-amber-100 rounded-xl text-amber-500 font-medium">
                      Pending
                    </div>
                  ) : (
                    <div className="font-medium">
                      {registeredChallenge.isGraded ? (
                        <span className="px-2 py-1 border-2 border-indigo-800 bg-indigo-100 rounded-xl text-indigo-800">
                          Graded
                        </span>
                      ) : (
                        <span className="px-2 py-1 border-2 border-green-800 bg-green-100 rounded-xl text-green-800">
                          Submitted
                        </span>
                      )}
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
                      registeredChallenge.challenge.dueDate === undefined
                        ? Date.now()
                        : registeredChallenge.challenge.dueDate
                    ).toDateString()}
                  </div>
                </div>
                {/* Blurred background overlay */}
                {(isOpen.state || confirmRegChallengeDelete.state) && (
                  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
                )}
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() =>
                      setIsOpen({
                        state: true,
                        id:
                          registeredChallenge.challenge.id === undefined
                            ? null
                            : registeredChallenge.id,
                        action: `submit-solution`,
                      })
                    }
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-indigo-600 hover:bg-indigo-100 hover:border-indigo-800 text-sm"
                  >
                    <FaFlagCheckered size={15} />
                    Submit
                  </button>
                  <button
                    onClick={() =>
                      setIsOpen({
                        state: true,
                        id:
                          registeredChallenge.challenge.id === undefined
                            ? null
                            : registeredChallenge.challenge.id,
                        action: `view-challenge`,
                      })
                    }
                    className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-blue-600 hover:bg-blue-100 hover:border-blue-800 text-sm"
                  >
                    <IoEyeSharp size={18} />
                  </button>
                  {registeredChallenge.isGraded ? null : (
                    <button
                      onClick={() =>
                        setConfrmRegChallengeDelete({
                          state: true,
                          id: registeredChallenge.id,
                        })
                      }
                      className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md bg-white border-2 border-stone-200 text-black hover:text-red-600 hover:bg-red-100 hover:border-red-800 text-sm"
                    >
                      <TbCancel size={15} />
                    </button>
                  )}
                </div>
                {/* Modal window */}
                {isOpen.state &&
                  isOpen.action === `view-challenge` &&
                  registeredChallenges
                    .filter(
                      (registeredChallenge: UserChallenge) =>
                        registeredChallenge.challenge.id === isOpen.id
                    )
                    .map((registeredChallenge: UserChallenge) => (
                      <div
                        key={registeredChallenge.challenge.id}
                        className="fixed inset-0 flex items-center justify-center z-50"
                      >
                        <ViewChallenge
                          titleIcon={
                            registeredChallenge.challenge.titleIcon ===
                            undefined
                              ? `🧩`
                              : registeredChallenge.challenge.titleIcon
                          }
                          title={
                            registeredChallenge.challenge.title === undefined
                              ? `Undefined title`
                              : registeredChallenge.challenge.title
                          }
                          setIsOpen={setIsOpen}
                          description={
                            registeredChallenge.challenge.description ===
                            undefined
                              ? `Undefined description`
                              : registeredChallenge.challenge.description
                          }
                          coinsOffered={
                            registeredChallenge.challenge.coinsOffered ===
                            undefined
                              ? 0
                              : registeredChallenge.challenge.coinsOffered
                          }
                          platform={
                            registeredChallenge.challenge.platform === undefined
                              ? `undefined`
                              : registeredChallenge.challenge.platform
                          }
                          hints={
                            registeredChallenge.challenge.hints === undefined
                              ? []
                              : registeredChallenge.challenge.hints
                          }
                          challengeId={
                            registeredChallenge.challenge.id === undefined
                              ? `0`
                              : registeredChallenge.challenge.id
                          }
                          isRegistered={true}
                        />
                      </div>
                    ))}

                {isOpen.state && isOpen.action === `submit-solution` && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <SubmitSolution
                      userId={user?.id}
                      registeredChallengeId={isOpen.id}
                      setRegisteredChallenges={setRegisteredChallenges}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                )}

                {confirmRegChallengeDelete.state && (
                  <ConfirmationModal
                    id={confirmRegChallengeDelete.id}
                    deleteUserOrChallenge={deleteRegisteredChallenge}
                    setConfirmDelete={setConfrmRegChallengeDelete}
                  />
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
