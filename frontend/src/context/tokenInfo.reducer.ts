import { Role } from "../graphql/types/role";

export interface ITokenInfo {
  name: string;
  token: string;
  userRoles: Role[];
}

export interface ActionType {
  type: keyof TOKEN_ACTIONS;
  payload: ITokenInfo;
}

export enum TOKEN_ACTIONS {
  ADD = "add_tokenInfo",
  REMOVE = "remove_tokenInfo",
}

export type ReducerResult = {
  [key in TOKEN_ACTIONS]: ITokenInfo;
};

export const initialState: ITokenInfo = {
  name: "",
  token: "",
  userRoles: [],
};

export const userInfoReducer = (state: ITokenInfo, action: ActionType) => {
  const { type, payload } = action;

  const actionObject: ReducerResult = {
    [TOKEN_ACTIONS.ADD]: {
      ...state,
      name: payload.name,
      token: payload.token,
      userRoles: [...state.userRoles, ...payload.userRoles],
    },
    [TOKEN_ACTIONS.REMOVE]: { ...state, name: payload.name, token: payload.token, userRoles: payload.userRoles },
  };
  return actionObject[type as TOKEN_ACTIONS];
};
