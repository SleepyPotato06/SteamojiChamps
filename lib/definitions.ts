//----------Interfaces----------------
export interface UserCardProps {
  users: User[];
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
    referenceDescription: string | undefined;
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
  isGraded: boolean;
  pointsAwareded: number;
  submissionStatus: string;
  submission: string;
  submissionDate: Date;
};

export type AddChallenge = {
  title: string | undefined;
  titleIcon: string | undefined;
  themeColor: string | undefined;
  tags: string[] | undefined;
  dueDate: Date | undefined;
  coinsOffered: number | undefined;
  description: string | undefined;
  reference: {
    referenceDescription: string | undefined;
    referenceLink: string | undefined;
  };
  displayImage: string | undefined;
  imageAlt: string | undefined;
  platform: string | undefined;
  lockStatus: string | undefined;
  hints: string[] | undefined;
};

export type AddUser = {
  first_name: string | undefined;
  last_name: string | undefined;
  username: string | undefined;
  level: string | undefined;
  password: string | undefined;
};
