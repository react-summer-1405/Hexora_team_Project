import yellowStar from '../../../../../assets/icons/details/yellowStar.svg'

const PointAndPrice = () => {
  return (
              
          <div className="w-full flex flex-row-reverse justify-between">
            <div className="flex flex-row gap-1 items-center text-text-dark">
  
              <span className="text-2xl font-bold ">2،500،000</span> 
                        <span className="text-sm font-medium">تومان</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-base font-medium text-text-dark">
              <span>(4)</span>
              <div className="flex flex-row  items-center gap-0.5">
                <img src={yellowStar} className="w-7 h-7"/>
                <img src={yellowStar} className="w-7 h-7"/>
                <img src={yellowStar} className="w-7 h-7"/>
                <img src={yellowStar} className="w-7 h-7"/>          
              </div>
              <span className="text-base font-medium text-text-dark">+ ( 120 ) نظرات  </span>
            </div>
          </div>
  )
}

export default PointAndPrice