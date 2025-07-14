// Define state shape
export interface State {
    landing: boolean;
    menu: boolean;
    user: string | null;
  }
  
  // Initial state
  export const initialState: State = {
    landing: false,
    menu: false,
    user: null,
  };
  
  // Define action types
  type Action =
    | { type: 'SET_LANDING'; payload: boolean }
    | { type: 'SET_MENU'; payload: boolean }
    | { type: 'SET_USER'; payload: string };
  
  export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_LANDING':
            return { ...state, landing: action.payload };
        case 'SET_MENU':
            return { ...state, menu: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
  }
  