import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme");
      const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      return currentTheme || browserTheme;
    }
    return "light";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-accent">💬 评论</h3>
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
} 