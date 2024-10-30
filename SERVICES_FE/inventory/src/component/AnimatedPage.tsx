import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type AnimatedPageProps = {
  children: ReactNode;
  animaDuration?: number;
};

const AnimatedPage = ({ children, animaDuration = 0.4 }: AnimatedPageProps) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: animaDuration }}
      className="animated-page"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
