import OjiCoin from "@/public/coin.svg";
import { TiChevronRight } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/UserContext";

export default function ViewChallenge({
  titleIcon,
  title,
  setIsOpen,
  description,
  coinsOffered,
  platform,
  hints,
  challengeId,
  isRegistered,
}: {
  titleIcon: string;
  title: string;
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
  description: string;
  coinsOffered: number;
  platform: string;
  hints: string[];
  challengeId: string;
  isRegistered: boolean;
}) {
  const { user } = useUser();
  const router = useRouter();
  async function registerChallenge(
    userId: string | undefined,
    challengeId: string
  ) {
    if (userId === undefined) {
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/register-challenge`,
        {
          method: "POST",
          body: JSON.stringify({ challengeId, userId }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        router.push(`/home`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-h-[30rem] overflow-y-scroll flex flex-col gap-8 bg-white p-6 rounded-xl shadow-xl">
      <div className="flex flex-row justify-between items-center gap-52">
        <div className="flex flex-row gap-2 items-center">
          <div>{titleIcon}</div>
          <div className="text-2xl font-semibold">{title}</div>
        </div>
        <button
          onClick={() => setIsOpen({ state: false, id: null, action: null })}
          className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-red-600 bg-red-100 border-2 border-red-800 hover:text-white hover:bg-red-600 font-light text-sm"
        >
          Close
        </button>
      </div>
      <div className="flex flex-col gap-4" id="project-details">
        <div className="flex flex-col gap-1.5" id="description">
          <h3 className="font-bold text-lg">Description</h3>
          {description}
        </div>
        <div className="flex flex-col gap-1.5" id="reward">
          <h3 className="font-bold text-lg">Reward</h3>
          <div className=" w-fit flex flex-row gap-2 px-3 py-1.5 text-blue-800 font-bold border-2 border-blue-800 bg-blue-100 rounded-3xl">
            <Image src={OjiCoin} width={15} height={15} alt="oji_coin" />
            {coinsOffered}
          </div>
        </div>
        <div className="flex flex-col gap-1.5" id="platform">
          <h3 className="font-bold text-lg">Platform</h3>
          {platform}
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
        <div className="flex flex-col gap-1.5" id="hints">
          <h3 className="font-bold text-lg">Hints</h3>
          <div className="flex flex-col gap-2">
            {hints.map((hint: string, index) => {
              return (
                <div key={index} className="flex flex-row gap-2 items-center">
                  <TiChevronRight className="text-blue-900" />
                  {hint}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex justify-end">
          {isRegistered ? null : (
            <button
              className="flex flex-row gap-2 px-3 py-1.5 items-center w-fit rounded-md text-blue-600 bg-blue-100 border-2 border-blue-800 hover:text-white hover:bg-blue-600 font-light text-sm"
              onClick={() => registerChallenge(user?.id, challengeId)}
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
