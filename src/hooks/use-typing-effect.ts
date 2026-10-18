"use client";

import { useEffect, useState } from "react";

type UseTypingEffectOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
};

export function useTypingEffect(
  words: string[],
  { typingSpeed = 55, deletingSpeed = 30, pauseDuration = 1800, loop = true }: UseTypingEffectOptions = {}
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex % words.length];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (loop ? prev + 1 : Math.min(prev + 1, words.length - 1)));
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return text;
}
