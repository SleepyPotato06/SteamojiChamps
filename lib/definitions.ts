//----------Interfaces----------------
export interface UserCardProps {
  name: string;
  level: string;
  coinsAchieved: number;
  activeChallengeCount: number;
  achievementCount: number;
}

export interface RegisteredChallengeCardProp {
  registeredChallenges: RegisteredChallenge[];
}

export interface ChallengeCardProp {
  challenges: Challenge[];
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
  titleHex: string;
  titleIcon: string;
  tags: string[];
  tagHex: { bg: string; border: string };
  dueDate: Date;
  coinsOffered: number;
  description: string;
  reference: {
    refereceDescription: string;
    referenceLink: string;
  };
  displayImage: string;
  imageAlt: string;
  platform: string;
  lockStatus: string;
  hints: string[];
  buttonHex: { bg: string; border: string; hoverBg: string };
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

export type RegisteredChallenge = {
  id: string;
  challenge: {
    id: string;
    title: string;
    titleHex: string;
    titleIcon: string;
    tags: string[];
    tagHex: { bg: string; border: string };
    dueDate: Date;
    coinsOffered: number;
    description: string;
    reference: {
      refereceDescription: string;
      referenceLink: string;
    };
    displayImage: string;
    imageAlt: string;
    platform: string;
    lockStatus: string;
    hints: string[];
    buttonHex: { bg: string; border: string; hoverBg: string };
  };
  submissionStatus: string;
};
