let init = {
  login: false,
  darkTheme: false,
};

export let reducer = (state = init, action) => {
  switch (action.type) {
    case 'APP_STATUS':
      return {
        ...state,
        login: action.payload.loginStatus,
        darkTheme: action.payload.darkTheme,
      };
    default:
      return state;
  }
};
