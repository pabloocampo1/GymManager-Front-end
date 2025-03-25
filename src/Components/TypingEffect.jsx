import { useState, useEffect } from "react";

const TypingEffect = ({ text = [], speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState(Array(text.length).fill(""));
  const [indexes, setIndexes] = useState(Array(text.length).fill(0));

  useEffect(() => {
    const timeouts = text.map((str, i) => {
      if (indexes[i] < str.length) {
        return setTimeout(() => {
          setDisplayedText((prev) => {
            const updated = [...prev];
            updated[i] += str[indexes[i]];
            return updated;
          });
          setIndexes((prev) => {
            const updated = [...prev];
            updated[i] += 1;
            return updated;
          });
        }, speed * (i + 1));
      }
      return null;
    });

    return () => timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
  }, [indexes, text, speed]);

  return (
    <span>
      {displayedText.map((line, i) => (
        <span key={i}>
          {line}
          {i < displayedText.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
};

export default TypingEffect;