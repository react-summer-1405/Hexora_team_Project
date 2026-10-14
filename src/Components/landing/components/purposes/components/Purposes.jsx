import Topic from "../../../../common/Topic"
import PurposeDivisions from "./PurposeDivisions"

function Purposes() {
  return (
   <div className="flex flex-col items-center justify-center gap-10  ">
    <Topic content="اهداف ما در آکادمی"/>
   <PurposeDivisions/>
   </div>
  )
}

export default Purposes