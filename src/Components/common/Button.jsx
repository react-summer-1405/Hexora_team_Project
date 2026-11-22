const Button = ({
  type="",
  content,
  color = "bg-bg-dark",
  textColor="text-text-white",
  textSize = "text-base ",
  icon,
  onClick,
  customStyle = "",
  circle = false,
  iconSize="w-6 h-6 dark:invert",
  disabled
}) => {
  return (
    <button type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        ${circle ? "p-0 aspect-square shrink-0" : "w-max px-5 py-3"}
        ${color} ${customStyle} whitespace-nowrap
        flex flex-row items-center justify-center gap-2 rounded-full
        ${textColor} ${textSize} md:text-base transition-all duration-100 ease-in-out cursor-pointer
        hover:-translate-y-0.5 hover:shadow-[0_3px_10px_1px_#888]
        active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95
        select-none
      `}
    >
      {icon && <img src={icon} className={iconSize}  />}
      {content}
    </button>
  );
};

export default Button