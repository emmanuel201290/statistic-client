import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        logged: true,
      };

    case types.logout: {
      return {
        logged: false,
      };
    }

    case types.openModel: {
      return {
        ...action.payload,
        openModel: true,
      };
    }
    case types.closeModel: {
      return {
        ...action.payload,
        openModel: false,
      };
    }

    default:
      break;
  }
};
