import { createContext, useReducer, type ReactNode, type Dispatch } from 'react';

import { reducer, initialState, type State } from './reducer';

type Action =
    { type: 'SET_LANDING', payload: boolean } |
    { type: 'SET_MENU', payload: boolean } |
    { type: 'SET_USER'; payload: string };

interface AppContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
