import { NavLink, useNavigate } from "react-router-dom";


const NavigationBar = ({navItems}) => {
  const navigate =useNavigate()


  return (
    <div className="flex flex-row items-center justify-center  rounded-full text-xs lg:text-base font-medium bg-bg-dark text-text-white">
      <div className="hidden mx-6 my-3 sm:flex flex-row items-center justify-center gap-6 ">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className="relative cursor-pointer w-max hover:text-primary transition-all duration-300"
          >
            {({ isActive }) => (
              <>
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-bg-main" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
      <div className="bg-primary py-2 px-4 w-max rounded-full cursor-pointer m-1" onClick={()=>{navigate('/auth/login')}}>
        ثبت نام یا ورود
      </div>
    </div>
  );
};

export default NavigationBar;
