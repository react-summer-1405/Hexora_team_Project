const NavigationBar = () => {
  const navItems = [
    { name: "خانه", link: "/" },
    { name: "دوره ها", link: "/courses" },
    { name: "بلاگ ها", link: "/blogs" },
    { name: "درباره ما", link: "/aboutUs" },
  ];

  return (
    <div className="hidden sm:flex flex-row items-center justify-center  rounded-full text-xs lg:text-base font-medium bg-bg-dark text-text-white">
      <div className="mx-6 my-3 flex flex-row items-center justify-center gap-6 ">
        {navItems.map((item, index) => (
          <div
            key={index}
            className=" cursor-pointer w-max  hover:text-primary-hover transition-all duration-300"
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="bg-primary py-2 px-4 w-max rounded-full cursor-pointer m-1">
        ثبت نام یا ورود
      </div>
    </div>
  );
};

export default NavigationBar;
