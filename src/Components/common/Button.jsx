
const Button = ({ content , color='bg-lightDark',icon ,onClick}) => {
  return (
    <div onClick={onClick}  className={`flex flex-row justify-center gap-2 w-max rounded-full bg-${color} text-text-white px-5 py-3 transition-all transition-100 
    ease-in-out cursor-pointer  hover:-translate-y-0.5 hover:shadow-[0_3px_10px_1px_#888]
      active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95
       active:duration-100 active:ease-in select-none`}>
        <img src={icon} className="w-6 h-6"/>
        {content}
    </div>
  )
}

export default Button