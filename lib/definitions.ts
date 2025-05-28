//----------Interfaces----------------
export interface UserCardProps {
  users: User[];
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
  level: string;
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
  id: string | undefined;
  title: string | undefined;
  titleIcon: string | undefined;
  themeColor: string | undefined;
  tags: string[] | undefined;
  dueDate: Date | undefined;
  coinsOffered: number | undefined;
  description: string | undefined;
  reference: {
    refereceDescription: string | undefined;
    referenceLink: string | undefined;
  };
  displayImage: string | undefined;
  imageAlt: string | undefined;
  platform: string | undefined;
  lockStatus: string | undefined;
  hints: string[] | undefined;
};

export type UserChallenge = {
  id: string;
  user: User;
  userId: string;
  challenge: Challenge;
  challengeId: string;
  submissionStatus: string;
  submittedAt: Date;
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
