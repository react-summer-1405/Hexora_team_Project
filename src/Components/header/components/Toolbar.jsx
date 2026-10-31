import { useDispatch, useSelector } from "react-redux";
import moonIcon from "../../../assets/icons/moon-02.svg";
import sunIcon from "../../../assets/icons/sun.svg";
import bellIcon from "../../../assets/icons/notification-02.svg";
import Button from "../../common/Button";
import { selectThemeMode, toggleTheme } from "../../features/theme/themeSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  return (
    <div className="w-max lg:w-55 hidden sm:flex flex-row justify-end gap-2">
      <Button
        circle
        icon={bellIcon}
        customStyle="p-3 border border-border"
        color="bg-bg-field"
        content={
          <div className="absolute -bottom-0.5 -right-0.5  w-4 h-4 rounded-full bg-danger border-white text-white text-[12px] leading-[20px]">
            2
          </div>
        }
      />
      <Button
        circle
        icon={mode === "dark" ? sunIcon : moonIcon}
        customStyle="p-3"
        color="bg-text-dark"
        onClick={() => dispatch(toggleTheme())}
      />
    </div>
  );
};

export default Toolbar;
