
const PendingCards = () => {
  return (
        <div className="w-full max-w-343 py-7 px-6" dir="ltr">
          <div className="flex gap-6 overflow-hidden py-5">
            {Array.from({ length: 4 }).map((i) => (
              <div
                key={i}
                className=" w-80 h-91 cursor-pointer  hover:-translate-y-2 transition duration-300 rounded-4xl  shrink-0 animate-pulse  bg-white p-4 shadow-sm ring-1 ring-border" dir="rtl"
              >
                
                   <div className="relative h-73  rounded-4xl">
                     <div className="h-full flex flex-col bg-gray-200 rounded-2xl justify-center items-center">
    
                     </div>
                     <div className="absolute flex flex-row gap-2 top-2 right-4">
                       <span className="text-[14px] w-20 h-5 font-medium text-text-white bg-gray-300 rounded-4xl px-2 py-0.5">
                         
                       </span>
                       <span className="w-20 h-5 text-text-white bg-gray-300 rounded-4xl px-2 py-0.5">
                        
                       </span>
                     </div>
                   </div>
    
                        <div className="flex flex-col items-start justify-between gap-2 mt-3">
                        <div className="w-20 h-3 rounded-full bg-gray-300"></div>
                        <div className=" w-full flex flex-row items-between justify-between">
                            <span className="w-15 h-3 rounded-full bg-gray-300"></span>
                            <span>
    
                        <span className="w-10 h-3 rounded-full bg-gray-300"></span> 
                              
                        </span>
                        
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default PendingCards