import { Link } from "react-router-dom";

// لینک‌های غیر بلاگ فقط نمایشی هستند و کلیک روی آن‌ها اتفاقی نمی‌اندازد

const menuItems = [
  { title: "خدمات ما" },
  { title: "ارتباط با ما" },
  { title: "درباره ما" },
  { title: "اساتید" },
  { title: "بلاگ ها" },
  { title: "دوره ها" },
  { title: "خانه" },
];

const MiddlePart = () => (
  <nav className=" flex flex-row  gap-15 flex-wrap items-center justify-center   text-text-dark font-semibold lg:w-fit lg:text-lg">
    {menuItems.map(({ title, to }) => (
      <Link key={title} to={to}>
        {title}
      </Link>
    ))}
  </nav>
);

export default MiddlePart;
