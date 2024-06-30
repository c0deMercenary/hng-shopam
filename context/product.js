import { createContext, useContext, useReducer } from "react";

// interface AppState {
//     products: any[];
// }

export const AppContext = createContext();

const initialState = {
    products: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
          if(state.products.find(product => product.id === action.payload.id)) {
            return { ...state, products: state.products.map(product => {
              if(product.id === action.payload.id) {
                return { ...product, quantity: product.quantity + 1 }
              }
              return product
            }) }
          }else {
            return { ...state, products: [...state.products, action.payload] }
          }
        case 'DELETE_PRODUCT':
            return { ...state, products: state.products.filter(product => product.id !== action.payload) }
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
