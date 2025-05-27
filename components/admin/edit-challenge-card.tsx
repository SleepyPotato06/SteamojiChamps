import { Challenge } from "@/lib/definitions";
import { TiChevronRight } from "react-icons/ti";
import OjiCoin from "@/public/coin.svg";
import Image from "next/image";

export default function EditChallengeCard({
  challenge,
  updateChallenge,
  setEditOpen,
}: {
  challenge: Challenge;
  updateChallenge: (
    challengeId: string,
    title: string,
    titleHex: string,
    titleIcon: string,
    tags: string[],
    tagHex: { bg: string; border: string },
    coinsOffered: number,
    dueDate: Date,
    description: string,
    reference: {
      refereceDescription: string;
      referenceLink: string;
    },
    displayImage: string,
    imageAlt: string,
    platform: string,
    lockStatus: string,
    hints: string[],
    buttonHex: { bg: string; border: string; hoverBg: string }
  ) => void;
  setEditOpen: (value: { state: boolean; id: string | null }) => void;
}) {
  return (
    <div className="flex flex-col gap-8 bg-white p-6 rounded-xl shadow-xl">
      <div className="flex flex-row justify-between items-center gap-52">
        <div className="flex flex-row gap-2 items-center">
          <div>{challenge.titleIcon}</div>
          <div className="text-2xl font-semibold">{challenge.title}</div>
        </div>
        <button
          onClick={() => setEditOpen({ state: false, id: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto" id="project-details">
        <div className="flex flex-col gap-1.5" id="description">
          <h3 className="font-bold text-lg">Description</h3>
          {challenge.description}
        </div>
        <div className="flex flex-col gap-1.5" id="reward">
          <h3 className="font-bold text-lg">Reward</h3>
          <div className=" w-fit flex flex-row gap-2 px-3 py-1.5 text-blue-800 font-bold border-2 border-blue-800 bg-blue-100 rounded-3xl">
            <Image src={OjiCoin} width={15} height={15} alt="oji_coin" />
            {challenge.coinsOffered}
          </div>
        </div>
        <div className="flex flex-col gap-1.5" id="platform">
          <h3 className="font-bold text-lg">Platform</h3>
          {challenge.platform}
        </div>
        <div className="flex flex-col gap-1.5" id="hints">
          <h3 className="font-bold text-lg">Hints</h3>
          <div className="flex flex-col gap-2">
            {challenge.hints.map((hint: string, index) => {
              return (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <TiChevronRight className="text-blue-900" />
                  {hint}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1.5" id="reference">
          <h3 className="font-bold text-lg">Reference</h3>
          {"Description about the reference"}
          {
            <a
              href={
                "https://www.steamoji.com/wp-content/uploads/2024/10/Steamoji-Logo-w-descr_wht-on-blu_RGB.png"
              }
              className="w-fit hover:underline hover:underline-2 hover:underline-offset-4 decoration-blue-800 text-blue-800 font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Me
            </a>
          }
        </div>
        <div className="w-full flex justify-end">
          <button
            className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-800 text-sm"
            onClick={() =>
              updateChallenge(
                challenge.id,
                challenge.title,
                challenge.titleHex,
                challenge.titleIcon,
                challenge.tags,
                challenge.tagHex,
                challenge.coinsOffered,
                challenge.dueDate,
                challenge.description,
                challenge.reference,
                challenge.displayImage,
                challenge.imageAlt,
                challenge.platform,
                challenge.lockStatus,
                challenge.hints,
                challenge.buttonHex
              )
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
