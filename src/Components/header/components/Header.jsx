import NavigationBar from "./NavigationBar";
import Title from "./Title";
import Toolbar from "./Toolbar";

const Header = () => {
  return (
    <div className=" flex flex-row justify-between items-center gap-4 px-2">
      <Title />
      <NavigationBar />
      <Toolbar/>
    </div>
  );
};

export default Header;
