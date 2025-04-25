"use client";

import { useEffect, useState } from "react";

interface AvatarProps {
  characterName: string;
  size?: "small" | "medium" | "large";
}

// Static configurations moved outside the component
const EMOJIS = [
  "👤",
  "🤖",
  "👽",
  "🧙‍♂️",
  "🥷",
  "🏴‍☠️",
  "🧛‍♂️",
  "🐉",
  "🐱",
  "🦸‍♂️",
  "🧟‍♂️",
  "🧚‍♀️",
  "🦖",
  "🧜‍♀️",
  "🦄",
  "🦊",
  "🐼",
  "🦁",
  "🐯",
  "🦒",
];

const COLORS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-indigo-600",
  "bg-gray-800",
  "bg-red-600",
  "bg-red-800",
  "bg-orange-600",
  "bg-yellow-600",
  "bg-blue-500",
  "bg-green-800",
  "bg-pink-500",
  "bg-green-600",
  "bg-teal-500",
  "bg-pink-400",
  "bg-cyan-500",
  "bg-amber-500",
];

// Size classes moved outside the component
const SIZE_CLASSES = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-16 h-16",
};

// Function to generate a consistent avatar based on the character name
const generateAvatar = (name: string) => {
  // Use the character name to generate a consistent hash
  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to select an emoji from a predefined list
  const emojiIndex = Math.abs(hash) % EMOJIS.length;

  // Use the hash to select a color
  const colorIndex = Math.abs(hash) % COLORS.length;

  return {
    emoji: EMOJIS[emojiIndex],
    color: COLORS[colorIndex],
  };
};

export const Avatar = ({ characterName, size = "medium" }: AvatarProps) => {
  const [avatarData, setAvatarData] = useState({
    emoji: "👤",
    color: "bg-neutral-600",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const data = generateAvatar(characterName);
    setAvatarData(data);
    setIsLoading(false);
  }, [characterName]);

  if (isLoading) {
    return (
      <div
        className={`${SIZE_CLASSES[size]} rounded-full bg-neutral-700 animate-pulse flex items-center justify-center`}
      >
        <span className="text-xs text-neutral-400">...</span>
      </div>
    );
  }

  return (
    <div
      className={`${SIZE_CLASSES[size]} rounded-full ${avatarData.color} flex items-center justify-center`}
    >
      <span className="text-lg">{avatarData.emoji}</span>
    </div>
  );
};
