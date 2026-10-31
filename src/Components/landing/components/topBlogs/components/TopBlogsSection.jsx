import { useNavigate } from "react-router-dom"
import Button from "../../../../common/Button"
import Topic from "../../../../common/texts/Topic"
import TopBlogsList from "./TopBlogsList"

const TopBlogsSection = () => {
 const navigate=useNavigate()
  return (
     <div className="flex flex-col items-center justify-center gap-12">
        <Topic content="بلاگ های برتر هفته"/>
        <TopBlogsList/>
        <Button content="مشاهده بیشتر" onClick={()=>navigate('/blogs')} />

</div>
  )
}

export default TopBlogsSection