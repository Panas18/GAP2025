import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ui/theme/theme-provider";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-360" : "rotate-0"} `}
    >
      {isDark ? (
        <Sun className="h-6 w-6  text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6  text-blue-500" />
      )}
    </div>
  );
};
