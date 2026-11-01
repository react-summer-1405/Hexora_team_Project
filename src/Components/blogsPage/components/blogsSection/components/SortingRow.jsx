
const SortingRow = ({ sortingButtons, selected, sortingHandler , toggle , isOpenModal }) => {



  return (
    <>
    <div className="hidden sort lg:flex lg:flex-row lg:items-center lg:justify-start lg:gap-4">
      <h6 className="text-[20px] font-bold">ترتیب</h6>
      <div className="flex gap-2 ">
        {sortingButtons.map((s) => (
          <button
            onClick={() => {
              sortingHandler(s);
            }}
            key={s.name}
            className={`rounded-[34px] sort-btn border ${selected === s.name ? "border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] bg-no-repeat bg-[90%] bg-5 ps-9" : "border-border-black text-text-dark"} transition-[border-color,text-color,scale] duration-400 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85`}
          >
            {s.name}
          </button>
        ))}
      </div>

    </div>
  


{  isOpenModal &&  <div className="fixed  w-screen bottom-0 left-0 z-50 rounded-t-[32px] flex flex-col items-start justify-start gap-6 p-6 shadow-2xl border bg-bg-main">
      <div className="flex flex-row justify-between w-full">
        <h6 className="text-[24px] text-text-dark font-bold">ترتیب</h6>
        <button className="rounded-[34px] border border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] 
        bg-no-repeat bg-[90%] bg-5 ps-9 transition-[border-color,text-color,scale]
         duration-200 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85" 
         onClick={toggle}>بستن</button>
      </div>
            <div className="flex flex-wrap gap-4 ">
        {sortingButtons.map((s) => (
          <button
            onClick={() => {
              sortingHandler(s);
            }}
            key={s.name}
            className={`rounded-[34px] border ${selected === s.name ? "border-danger text-danger bg-[url(../../assets/icons/cancel-01.svg)] bg-no-repeat bg-[90%] bg-5 ps-9" : "border-border-black text-text-dark"} transition-[border-color,text-color,scale] duration-400 cursor-pointer text-lg  font-medium py-1.5 px-4 active:scale-85`}
          >
            {s.name}
          </button>
        ))}
      </div>
            


    </div>}
    </>
  )
};

export default SortingRow;
