import { Link } from "react-router-dom";

  const menuItems = [
    { name: "خانه", link: "/" },
    { name: "دوره ها", link: "/courses" },
    { name: "بلاگ ها", link: "/blogs" },
    { name: "ارتباط با ما", link: "/contactUs" },
  ];

const MiddlePart = () => (
  <nav className=" flex flex-row  gap-15 flex-wrap items-center justify-center   text-text-dark font-semibold lg:w-fit lg:text-lg">
    {menuItems.map(({ name, link }) => (
      <Link key={name} to={link}>
        {name}
      </Link>
    ))}
  </nav>
);

export default MiddlePart;
