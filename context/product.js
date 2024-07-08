import { createContext, useContext, useReducer } from "react";

// interface AppState {
//     products: any[];
// }

export const AppContext = createContext();

const initialState = {
    products: [],
    cart: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_PRODUCTS':
            return { ...state, products: action.payload }
        case 'ADD_PRODUCT':
          if(state.cart.find(product => product.id === action.payload.id)) {
            return { ...state, cart: state.cart.map(product => {
              if(product.id === action.payload.id) {
                return { ...cart, quantity: cart.quantity + 1 }
              }
              return cart
            }) }
          }else {
            return { ...state, cart: [...state.cart, action.payload] }
          }
        case 'DELETE_PRODUCT':
            return { ...state, products: state.cart.filter(product => product.id !== action.payload) }
        case 'DELETE_ALL_PRODUCTS':
            return { ...state, cart: [] }
        default:
            return state
    }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
