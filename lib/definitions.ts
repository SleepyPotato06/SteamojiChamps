import { IconType } from "react-icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

//----------Interfaces----------------
export interface ActiveChallengeDetailsProps {
  title: string;
  titleIcon: IconType;
  titleHex: string;
  dueDate: string;
  coinsOffered: number;
  displayImage: string | StaticImport;
  imageAlt: string;
}

export interface ChallengeDetailsProps {
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

export interface UserCardProps {
  name: string;
  level: string;
  coinsAchieved: number;
  activeChallengeCount: number;
  achievementCount: number;
}

//----------Types----------------
export type User = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  totalCoinsAchieved: number;
  achievements: string[];
  role: string;
  userChallenges: UserChallenge[];
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export type Challenge = {
  id: string;
  title: string;
  dueDate: Date;
  coinsOffered: number;
  description: string;
  tags: string[];
  status: string;
  displayImage: string;
  hints: string[];
  userChallenges: UserChallenge[];
};

export type UserChallenge = {
  id: string;
  user: User;
  userId: string;
  challenge: Challenge;
  challengeId: string;
  status: string;
  submittedAt: Date;
  coinsEarned: number;
};
