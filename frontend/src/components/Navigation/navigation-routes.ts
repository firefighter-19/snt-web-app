import { RoleType } from "../../graphql/types/role";

const IS_USER_ADMIN = window.localStorage.getItem(`Role: ${RoleType.ADMIN}`);

const defaultRoutes = [
  {
    to: "/",
    title: "Домой",
  },
  {
    to: "/bills",
    title: "Взносы",
  },
  {
    to: "/plans",
    title: "Сметы",
  },
  {
    to: "/info",
    title: "Документы",
  },
  {
    to: "/areas",
    title: "Участки",
  },
  {
    to: "/gates",
    title: "Ворота",
  },
  {
    to: "/contacts",
    title: "Контакты",
  },
];

export const checkedRoutes = IS_USER_ADMIN
  ? [
      ...defaultRoutes,
      {
        to: "/settings",
        title: "Настройки",
      },
    ]
  : defaultRoutes;
