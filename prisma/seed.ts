import prismapg from "../lib/prisma";

async function main() {
  // Create Users
  const adminUser = await prismapg.user.create({
    data: {
      username: "admin",
      first_name: "Alice",
      last_name: "Admin",
      password: "admin123",
      level: "Admin",
      role: "ADMIN",
      totalCoinsAchieved: 0,
      achievements: ["Launched First Challenge"],
    },
  });

  const regularUser = await prismapg.user.create({
    data: {
      username: "john_doe",
      first_name: "John",
      last_name: "Doe",
      password: "pass",
      level: "Junior",
      role: "USER",
      totalCoinsAchieved: 50,
      achievements: ["Completed Beginner Challenge"],
    },
  });

  // Create Challenges
  const challenge1 = await prismapg.challenge.create({
    data: {
      title: "Underwater Adventure Game",
      titleHex: "#1E90FF",
      titleIcon: "🌊",
      tags: ["Game", "Scratch", "Ocean"],
      tagHex: { bg: "#B3E5FC", border: "#0288D1" },
      dueDate: new Date(),
      coinsOffered: 50,
      description:
        "Design a Scratch game where a fish avoids seaweed and sharks while collecting treasures!",
      reference: {
        refereceDescription: "Learn to animate characters in Scratch.",
        referenceLink: "https://scratch.mit.edu/projects/editor/?tutorial=all",
      },
      displayImage: "/images/underwater-game.png",
      imageAlt: "Colorful fish swimming underwater",
      platform: "Scratch",
      lockStatus: "active",
      hints: [
        "Use broadcast messages to change levels.",
        "Add background music for underwater effect.",
      ],
      buttonHex: { bg: "#0288D1", border: "#01579B", hoverBg: "#0277BD" },
    },
  });

  const challenge2 = await prismapg.challenge.create({
    data: {
      title: "Robot Arm Designer",
      titleHex: "#8E24AA",
      titleIcon: "🤖",
      tags: ["STEM", "OnShape", "Robotics"],
      tagHex: { bg: "#E1BEE7", border: "#6A1B9A" },
      dueDate: new Date("2025-07-15"),
      coinsOffered: 60,
      description:
        "Use OnShape to design a robot arm that can pick up small cubes!",
      reference: {
        refereceDescription: "Intro to sketches and constraints in OnShape.",
        referenceLink:
          "https://learn.onshape.com/learn/article/introduction-to-sketching",
      },
      displayImage: "/images/robot-arm.png",
      imageAlt: "A robotic arm holding a cube",
      platform: "OnShape",
      lockStatus: "active",
      hints: [
        "Start with simple rectangles and circles.",
        "Think about how the joints will move.",
      ],
      buttonHex: { bg: "#6A1B9A", border: "#4A148C", hoverBg: "#7B1FA2" },
    },
  });

  const challenge3 = await prismapg.challenge.create({
    data: {
      title: "Magical Forest Animation",
      titleHex: "#43A047",
      titleIcon: "🌳",
      tags: ["Animation", "Blender", "Nature"],
      tagHex: { bg: "#C8E6C9", border: "#2E7D32" },
      dueDate: new Date("2025-08-01"),
      coinsOffered: 75,
      description:
        "Create a short Blender animation showing a magical forest where animals dance under glowing trees.",
      reference: {
        refereceDescription: "Learn basic animation in Blender.",
        referenceLink: "https://www.blender.org/support/tutorials/",
      },
      displayImage: "/images/magical-forest.png",
      imageAlt: "A glowing tree in a magical forest",
      platform: "Blender",
      lockStatus: "active",
      hints: [
        "Use keyframes to animate movement.",
        "Play with light and fog effects.",
      ],
      buttonHex: { bg: "#2E7D32", border: "#1B5E20", hoverBg: "#388E3C" },
    },
  });

  const challenge4 = await prismapg.challenge.create({
    data: {
      title: "Design a Dream Treehouse",
      titleHex: "#FFA000",
      titleIcon: "🏡",
      tags: ["Design", "TinkerCAD", "Architecture"],
      tagHex: { bg: "#FFE082", border: "#FF6F00" },
      dueDate: new Date("2025-07-10"),
      coinsOffered: 40,
      description:
        "Use TinkerCAD to build your dream treehouse—add slides, secret rooms, and swings!",
      reference: {
        refereceDescription: "Learn to use TinkerCAD shapes.",
        referenceLink: "https://www.tinkercad.com/learn/designs",
      },
      displayImage: "/images/treehouse-design.png",
      imageAlt: "A colorful treehouse with a slide",
      platform: "TinkerCAD",
      lockStatus: "active",
      hints: [
        "Use cylinders for tree trunks.",
        "Try combining shapes to make new ones.",
      ],
      buttonHex: { bg: "#FB8C00", border: "#E65100", hoverBg: "#FF9800" },
    },
  });

  const challenge5 = await prismapg.challenge.create({
    data: {
      title: "Space Explorer Animation",
      titleHex: "#3949AB",
      titleIcon: "🚀",
      tags: ["Space", "Scratch", "Animation"],
      tagHex: { bg: "#C5CAE9", border: "#1A237E" },
      dueDate: new Date("2025-07-25"),
      coinsOffered: 55,
      description:
        "Animate a space explorer flying to new planets and meeting aliens using Scratch!",
      reference: {
        refereceDescription: "Explore Scratch motion and costumes.",
        referenceLink:
          "https://scratch.mit.edu/projects/editor/?tutorial=getStarted",
      },
      displayImage: "/images/space-explorer.png",
      imageAlt: "A cartoon rocket flying through space",
      platform: "Scratch",
      lockStatus: "active",
      hints: [
        "Use ‘glide’ and ‘change costume’ blocks.",
        "Add sound effects for alien planets!",
      ],
      buttonHex: { bg: "#303F9F", border: "#1A237E", hoverBg: "#5C6BC0" },
    },
  });

  // Create UserChallenges
  await prismapg.userChallenge.createMany({
    data: [
      {
        userId: adminUser.id,
        challengeId: challenge1.id,
      },
      {
        userId: regularUser.id,
        challengeId: challenge2.id,
      },
      {
        userId: regularUser.id,
        challengeId: challenge3.id,
      },
      {
        userId: regularUser.id,
        challengeId: challenge4.id,
      },
      {
        userId: regularUser.id,
        challengeId: challenge5.id,
      },
    ],
  });

  console.log("🌱 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismapg.$disconnect();
  });
