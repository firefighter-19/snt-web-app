/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, Reducer, useReducer, createContext, FC } from "react";
import { initialState, ITokenInfo, TOKEN_ACTIONS, userInfoReducer } from "./tokenInfo.reducer";

interface ITokenContext {
  state: ITokenInfo;
  addTokenInfo(tokenInfo: ITokenInfo): void;
  removeTokenInfo(tokenInfo: ITokenInfo): void;
}

export const SntContext = createContext<ITokenContext>({
  state: initialState,
  addTokenInfo: () => null,
  removeTokenInfo: () => null,
});

interface IProvider {
  children: ReactNode;
}
export const ContextProvider: FC<IProvider> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, dispatch] = useReducer<Reducer<any, any>>(userInfoReducer, initialState);

  const store = {
    state,
    addTokenInfo: (payload: ITokenInfo) => {
      dispatch({ type: TOKEN_ACTIONS.ADD, payload });
    },
    removeTokenInfo: (payload: ITokenInfo) => {
      dispatch({ type: TOKEN_ACTIONS.REMOVE, payload });
    },
  };

  return <SntContext.Provider value={store}>{children}</SntContext.Provider>;
};
