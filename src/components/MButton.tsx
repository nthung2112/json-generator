import { ButtonHTMLAttributes } from "react";

interface MButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string | false;
  label?: string | false;
  primary?: boolean;
  small?: boolean;
}

const MButton = ({ icon, label, primary, small, className = "", ...props }: MButtonProps) => {
  const baseClasses =
    "font-sans text-white-80 flex items-center gap-[5px] rounded bg-white-5 border border-white-10 hover:cursor-pointer hover:bg-white-10 active:bg-white-15";
  const sizeClasses = small ? "h-[30px]" : "h-[40px]";
  const variantClasses = primary
    ? "text-primary border-primary-20 bg-primary/10 hover:bg-primary-hover active:bg-primary-active"
    : "";

  const buttonClass = [baseClasses, sizeClasses, variantClasses, className]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [
    "ri",
    `ri-${icon}`,
    "flex justify-center items-center",
    small ? "w-6 h-6 text-base" : "w-8 h-8 text-lg",
    primary ? "text-primary-70" : "text-white-50",
  ].join(" ");

  const labelClasses = small ? "flex-grow pr-[7px]" : "flex-grow pr-[10px]";

  return (
    <button className={buttonClass} {...props}>
      {icon && <span className={iconClasses}></span>}
      {label && <span className={labelClasses}>{label}</span>}
    </button>
  );
};

export default MButton;
