import grayStar from "../../../../../assets/icons/details/grayStar.svg"
import attachment from '../../../../../assets/icons/details/attachment.svg'
import Button from "../../../../common/Button";

const Description = () => {
  return (
      <div className="flex flex-col gap-4 items-start text-right">
    <h6 className="text-[20px] font-bold text-text-muted">توضیحات دوره</h6>
    <p className="text-base font-medium text-text-dark">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
     <div className="flex flex-row justify-center items-center gap-4">
      <span className="text-base font-semibold text-primary">امتیاز بدید</span>
      <div className="flex flex-row gap-0.5">
        <img src={grayStar} className="w-7 h-7" />
        <img src={grayStar} className="w-7 h-7" />
        <img src={grayStar} className="w-7 h-7" />
        <img src={grayStar} className="w-7 h-7" />
      </div>
      <Button content="کپی کردن لینک صفحه" customStyle="border border-primary" textColor="primary" color="bg-bg-main" icon={attachment}/>
     </div>
      </div>
)
}

export default Description