import { motion } from "framer-motion";
import * as React from "react";

interface IInputFormProps extends React.ComponentPropsWithRef<"form"> {}

const InputForm: React.FunctionComponent<IInputFormProps> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
			exit={{ opacity: 0 }}
    >
      <form {...props}>{children}</form>
    </motion.div>
  );
};

export default React.memo(InputForm);
