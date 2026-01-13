export const storyData = {
  start: {
    text: "You wake up in a mysterious forest. The sun is barely rising.",
    image: "/images/forest.jpg",
    music: "/audio/forest.mp3",
    choices: [
      { text: "Explore the forest", next: "explore" },
      { text: "Stay put and wait", next: "wait" }
    ]
  },
  explore: {
    text: "You venture deeper into the forest and discover a glowing cave.",
    image: "/images/cave.jpg",
    music: "/audio/cave.mp3",
    choices: [
      { text: "Enter the cave", next: "cave" },
      { text: "Return to the forest", next: "start" }
    ]
  },
  wait: {
    text: "You wait under the tree. Night falls and you hear wolves howling in the distance.",
    image: "/images/night_forest.jpg",
    music: "/audio/night.mp3",
    choices: [
      { text: "Run into the forest", next: "explore" },
      { text: "Climb a tree", next: "tree" }
    ]
  },
  cave: {
    text: "Inside the cave, you find a treasure chest full of gold! You win!",
    image: "/images/treasure.jpg",
    music: "/audio/treasure.mp3",
    choices: []
  },
  tree: {
    text: "You climb the tree, but a branch snaps! You fall to the ground. Bad ending!",
    image: "/images/fall.jpg",
    music: "/audio/fall.mp3",
    choices: []
  }
};
