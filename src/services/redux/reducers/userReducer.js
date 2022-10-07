const initialState = {
  cart: [],
  storeCart: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Add_To_Cart':
      return {
        ...state,
        cart: action.payload,
      };
      case 'Add_To_Store':
      return {
        ...state,
        storeCart: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
