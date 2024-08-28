import { createContext, useContext, useState } from "react";

const Dark = createContext();

export const useTheme = () => {
  const themeP = useContext(Dark);
  return themeP;
};

const themeProvider = (props) => {
  const [value, setValue] = useState("dark");
  const theme = () => {
    value === "light" ? "dark" : "light";
  };
  return (
    <Dark.Provider value={{ value, theme }}>{props.children}</Dark.Provider>
  );
};
