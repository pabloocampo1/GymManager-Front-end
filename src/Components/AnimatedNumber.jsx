import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, latest => Math.floor(latest));
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0 });
    motionValue.animate(value, { duration: 2 });
  }, [value, motionValue, controls]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {rounded.get()}
    </motion.span>
  );
};
