import { useDispatch, useSelector } from "react-redux";
import moonIcon from "../../../assets/icons/moon-02.svg";
import sunIcon from "../../../assets/icons/sun.svg";
import bellIcon from "../../../assets/icons/notification-02.svg";
import Button from "../../common/Button";
import { selectThemeMode, toggleTheme } from "../../features/theme/themeSlice";


const Toolbar = ({ unseenCount = 0, onBellClick }) => {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  return (
    <div className="w-max lg:w-55 hidden sm:flex flex-row justify-end gap-2">
      <Button
        circle
        icon={bellIcon}
        customStyle="p-3 border border-border"
        color="bg-bg-field"
        onClick={onBellClick}
        content={
          unseenCount > 0 ? (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[11px] leading-none text-white">
              {unseenCount > 9 ? "9+" : unseenCount}
            </div>
          ) : null
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