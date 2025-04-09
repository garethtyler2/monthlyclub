import { useEffect, useRef, useState } from "react";

export const useTypingPlaceholder = (placeholderList: string[] = []) => {
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("");

  const placeholderIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    if (!placeholderList.length) return;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 1500;

    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentPhrase = placeholderList[placeholderIndex.current];

      if (!isDeleting.current) {
        const nextText = currentPhrase.substring(0, charIndex.current + 1);
        setDynamicPlaceholder(nextText);
        charIndex.current++;

        if (nextText === currentPhrase) {
          isDeleting.current = true;
          timeout = setTimeout(handleTyping, pauseTime);
          return;
        }

        timeout = setTimeout(handleTyping, typeSpeed);
      } else {
        const nextText = currentPhrase.substring(0, charIndex.current - 1);
        setDynamicPlaceholder(nextText);
        charIndex.current--;

        if (nextText === "") {
          isDeleting.current = false;
          placeholderIndex.current =
            (placeholderIndex.current + 1) % placeholderList.length;
        }

        timeout = setTimeout(handleTyping, deleteSpeed);
      }
    };

    timeout = setTimeout(handleTyping, typeSpeed);

    return () => clearTimeout(timeout);
  }, [placeholderList]);

  return placeholderList.length ? dynamicPlaceholder : "";
};
