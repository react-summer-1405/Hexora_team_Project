
const Button = ({ content }) => {
  return (
    <div className='rounded-full bg-bg-dark text-text-white px-5 py-3 transition-all transition-100 ease-in-out cursor-pointer hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_5px_10px_1px_#666]  active:shadow-[0_4px_8px_rgba(0,0,0,0.15)] active:-translate-y-0.5 active:scale-95 active:duration-100 active:ease-in select-none'>{content}</div>
  )
}

export default Button