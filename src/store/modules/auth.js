
//Constant
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_MENU_STYLE = "UPDATE_MENU_STYLE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_RESTAURANT = "UPDATE_RESTAURANT";

// initial state
const initialState = {
  isAuthenticated: null,
  jwtToken: null,
  user: {},
  // staff: {},
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      return initialState;

    case LOGIN_USER:

      return {
        isAuthenticated: true,
        jwtToken: payload.token,
        user: payload.user,
        // staff: action.payload.staff,
      };

    case UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUser = (payload) => async (dispatch) => {
  console.log(payload)
  await dispatch({
    type: LOGIN_USER,
    payload,
  });
  // window.location.reload();
};
export const onUpdateMenuStyle = (payload) => async (dispatch) => {
  await dispatch({
    type: UPDATE_MENU_STYLE,
    payload,
  });
};
export const updateProfileAction = (payload) => async (dispatch) => {
  await dispatch({
    type: UPDATE_PROFILE,
    payload,
  });
};
