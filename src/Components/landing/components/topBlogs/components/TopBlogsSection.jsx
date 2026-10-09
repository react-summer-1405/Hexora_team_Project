import Button from "../../../../common/Button"
import TopBlogsList from "./TopBlogsList"

const TopBlogsSection = () => {
  return (
     <div className="flex flex-col items-center justify-center gap-10 mt-30">
        <h3 className='text-3xl font-bold text-center '>بلاگ های برتر هفته</h3>
        <TopBlogsList/>
        <Button content="مشاهده بیشتر"/>

</div>
  )
}

export default TopBlogsSection