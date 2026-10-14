import Button from "../../../../common/Button"
import Topic from "../../../../common/texts/Topic"
import TopBlogsList from "./TopBlogsList"

const TopBlogsSection = () => {
  return (
     <div className="flex flex-col items-center justify-center gap-12">
        <Topic content="بلاگ های برتر هفته"/>
        <TopBlogsList/>
        <Button content="مشاهده بیشتر" color="bg-lightDark"/>

</div>
  )
}

export default TopBlogsSection