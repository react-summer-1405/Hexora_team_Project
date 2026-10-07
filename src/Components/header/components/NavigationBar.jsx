
const NavigationBar = () => {
      const navItems = [
    { name: "خانه", link: "/" },
    { name: "دوره ها", link: "/courses" },
    { name: "بلاگ ها", link: "/blogs" },
    { name: "درباره ما", link: "/aboutUs" },
  ];
  

  return (
      <div className="flex flex-row items-center justify-center   rounded-full text-md font-medium  bg-bg-dark text-text-white">
        <div className="mx-6 my-3 flex flex-row items-center justify-center gap-6 ">
          {navItems.map((item, index) => (
            <div key={index} className=" cursor-pointer  hover:text-primary-hover transition-all duration-300">
              {item.name}
            </div>
          ))}
        </div>
        {/* Dirty code :'I will fix it' */}
        <div className="bg-primary py-2 px-4 rounded-full cursor-pointer m-1">
          ثبت نام یا ورود
        </div>
      </div>  )
}

export default NavigationBar