import { IconType } from "react-icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "./ui/button";
import { FaCalendarDays } from "react-icons/fa6";
import { PiCoinsFill } from "react-icons/pi";
import Image from "next/image";

interface ChallengeDetailsProps {
  title: string;
  titleIcon: IconType;
  titleHex: string;
  tags: string[];
  tagHex: { border: string; bg: string };
  dueDate: string;
  coinsOffered: number;
  description: string;
  displayImage: string | StaticImport;
  imageAlt: string;
  buttonHex: { border: string; bg: string; hoverBg: string };
}

export default function ChallengeCard({
  title,
  titleIcon: TitleIcon,
  titleHex,
  tags,
  tagHex,
  dueDate,
  coinsOffered,
  description,
  displayImage,
  imageAlt,
  buttonHex,
}: ChallengeDetailsProps) {
  return (
    <div className="w-2/5 h-70 flex flex-col justify-between items-start p-5 border-1 border-stone-200 shadow-lg rounded-md">
      {/* Heading with logo */}
      <div className="w-full flex flex-row gap-2 justify-between items-start">
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
            <div className="text-xs flex flex-wrap gap-2">
              {tags.map((tag: string) => {
                return (
                  <div
                    key={tag}
                    className={`px-2 py-0.5 ${tagHex.bg} border-2 ${tagHex.border} rounded-xl`}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
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
          <div id="description" className="max-w-[30rem] text-wrap text-md">
            {description}
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
      <div id="register-btn">
        <Button
          className={`text-black ${buttonHex.bg} border-2 ${buttonHex.border} hover:${buttonHex.hoverBg} hover:text-white`}
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
