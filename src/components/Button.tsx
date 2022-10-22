import * as React from "react";

interface IButtonProps extends React.ComponentPropsWithRef<"button"> {
  color: "red" | "green" | "orange";
}

const Button: React.FunctionComponent<IButtonProps> = ({
  color,
  children,
  ...props
}) => {
  return (
    <button className={`list-button list-button__${color}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
