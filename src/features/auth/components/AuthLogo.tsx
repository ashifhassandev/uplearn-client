import { motion } from "framer-motion";

const AuthLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14 flex justify-center"
    >
      <motion.img
        src="/uplearn-logo.png"
        alt="UpLearn logo"
        className="
          h-28 sm:h-32 md:h-36 lg:h-40
          drop-shadow-[0_0_45px_rgba(34,211,238,0.5)]
        "
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
};

export default AuthLogo;