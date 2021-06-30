export const pageAnimation = {
  hidden: {
    y: 1000,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
  exit: {
    y: -1000,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
