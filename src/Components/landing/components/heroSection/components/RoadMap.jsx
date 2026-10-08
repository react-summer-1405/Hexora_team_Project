import html5Pic from "../../../../../assets/images/html5.png";
import css3Pic from "../../../../../assets/images/css3.png";
import figmaPic from "../../../../../assets/images/figma.png";
import reactPic from "../../../../../assets/images/react.png";
import jsPic from "../../../../../assets/images/js.png";

const RoadMap = () => {
      const logoImages = [ figmaPic, reactPic, jsPic,css3Pic,html5Pic]

  return (
        <div className=" bg-[#00000014] h-1.5  flex flex-row justify-around items-center  ">
      {logoImages.map((image, index) => (
        <div key={index} className="relative ">
        
           <div  className=" w-6 h-6 rounded-full border-6 border-border bg-white">  </div>  
           <div className="absolute top-[-70px] left-[-18px] w-16 h-16 rounded-full ">
                 <img src={image}  />
           </div>
      
      </div>
     
      ))}
    </div>
  )
}

export default RoadMap