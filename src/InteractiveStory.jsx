import { useState, useEffect } from "react";
import { storyData } from "./storyData";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

export default function InteractiveStory() {
  const START_SCENE = "start";
  const [currentScene, setCurrentScene] = useState(START_SCENE);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("storyScene");
    if (saved && storyData[saved]) setCurrentScene(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("storyScene", currentScene);
  }, [currentScene]);

  const scene = storyData[currentScene];
  if (!scene) return <p>Scene not found.</p>;

  useEffect(() => {
    let index = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + scene.text[index]);
      index++;
      if (index >= scene.text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [currentScene]);

  useEffect(() => {
    let sound;
    if (scene.music) {
      sound = new Howl({
        src: [scene.music],
        loop: true,
        volume: 0.4
      });
      sound.play();
    }
    return () => sound && sound.stop();
  }, [currentScene]);

  const restartStory = () => {
    localStorage.removeItem("storyScene");
    setCurrentScene(START_SCENE);
  };

  return (
    <div className="story-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {scene.image && (
            <img
              src={scene.image}
              alt=""
              style={{
                maxWidth: "80%",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
          )}

          <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            {displayText}
          </p>

          {scene.choices?.length > 0 ? (
            scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(choice.next)}
              >
                {choice.text}
              </button>
            ))
          ) : (
            <>
              <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                The End
              </p>
              <button onClick={restartStory}>Restart Story</button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}