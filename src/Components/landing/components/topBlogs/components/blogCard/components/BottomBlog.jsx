const BottomBlog = ({ title, addUserFullName, date, view }) => {


  

  return (
    <div className="flex flex-col items-start justify-between gap-2 mt-3 px-2">
      <h5 className="text-lg font-bold text-text-dark">{title}</h5>
      <div className=" w-full flex flex-row items-between justify-between ">
        <span className="text-[14px] font-medium text-text-muted">
          {addUserFullName}
        </span>
        <span className="font-medium text-[14px] text-text-muted flex flex-row justify-center ">
          <span className=" bg-[url('../../assets/icons/calendar.svg')] bg-no-repeat bg-size-[20px] bg-left pl-6  ">
            {date}
          </span>
          <span className=" bg-[url('../../assets/icons/view.svg')] bg-no-repeat bg-size-[20px] bg-left  px-6 flex flex-row items-center ">
            {view}
          </span>
        </span>
      </div>
    </div>
  );
};

export default BottomBlog;
