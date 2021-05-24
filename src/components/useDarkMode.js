import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./Themes";
export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  const [mountedComponent, setMountedComponent] = useState(false);
  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    mode === "light"
      ? window.localStorage.setItem(
          "themebackground",
          JSON.stringify(darkTheme)
        )
      : window.localStorage.setItem(
          "themebackground",
          JSON.stringify(lightTheme)
        );
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setMountedComponent(true);
  }, []);
  return [theme, themeToggler, mountedComponent];
};
