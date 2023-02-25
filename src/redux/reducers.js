import {
  SET_WALLET,
  SET_ADDRESS,
  SET_REWARD,
  SET_TOTAL_LOCK,
  SET_TOTAL_DEPOSITED,
    SET_STAKING_LIST,
} from "./actions";

const initialState = {
  wallet: undefined,
  address: "",
  userReward: 0,
  totalLock: 0,
  totalDeposited: 0,
  stakingList: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case SET_REWARD:
      return {
        ...state,
        userReward: action.payload,
      };
    case SET_TOTAL_LOCK:
      return {
        ...state,
        totalLock: action.payload,
      };
    case SET_TOTAL_DEPOSITED:
      return {
        ...state,
        totalDeposited: action.payload,
      };
    case SET_STAKING_LIST:
      return {
        ...state,
        stakingList: [...action.payload],
      };

    default:
      return state;
  }
}
export default reducer;
