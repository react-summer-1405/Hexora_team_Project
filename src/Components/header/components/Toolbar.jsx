const Toolbar = () => {
  return (
    <div className="w-55 flex flex-row justify-end gap-2" >
    <span className=" w-11 h-11 rounded-full  cursor-pointer border border-border bg-[url('../../assets/icons/notification-02.svg')] bg-center bg-no-repeat bg-size-[24px]">
    <div className="relative top-7.5 right-0.5  w-4 h-4 rounded-full bg-danger border-white text-white text-[12px] leading-[20px]">2</div>
    </span>
    <span className="w-11 h-11 rounded-full bg-bg-dark cursor-pointer  bg-[url('../../assets/icons/moon-02.svg')]  bg-center bg-no-repeat bg-size-[24px]"></span>
    </div>
  )
}

export default Toolbar