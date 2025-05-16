const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
