
const BottomCard = ({ name, teacher, price }) => {
  return (
                    <div className="flex flex-col items-start justify-between gap-2 mt-3">
                    <h4 className="text-lg font-bold">{name}</h4>
                    <div className=" w-full flex flex-row items-between justify-between">
                        <span className="text-[14px] font-medium text-text-muted">{teacher}</span>
                        <span>

                    <span className="text-[16px] font-bold text-text-dark">{price}</span> 
                       <span className="text-[14px] font-medium text-text-muted px-1">تومان</span>   
                    </span>
                    
                </div>
            </div>
  )
}

export default BottomCard