import { styleLoader } from "@style-loader";

export const loadStyles = () => {
  const stylesList = [
    "/modules/header/styles.css",
    "/modules/header/components/logo/styles.css",
    "/modules/header/components/nav/styles.css",
    "/modules/header/components/user-bar/styles.css",
  ];

  stylesList.forEach((style) => {
    styleLoader.load(style);
  });
};
