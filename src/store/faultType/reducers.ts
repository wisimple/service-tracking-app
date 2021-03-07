import {
  DELETE_FAULTTYPE,
  FaultTypeActionTypes,
  FaultTypeState,
  FETCH_FAULTTYPES,
  UPDATE_FAULTTYPE,
  CREATE_FAULTTYPE,
  SET_FAULTTYPE_LOADING,
  SELECT_FAULT_TYPE,
} from "./types";

const initialState: FaultTypeState = {
  faultTypes: [],
};

export default function faultTypeReducer(state = initialState, action: FaultTypeActionTypes): FaultTypeState {
  switch (action.type) {
    case FETCH_FAULTTYPES:
      return { ...state, faultTypes: action.payload.faultTypes };
    case CREATE_FAULTTYPE: {
      const { faultType } = action.payload;
      return { ...state, faultTypes: [faultType, ...state.faultTypes] };
    }
    case UPDATE_FAULTTYPE: {
      const { faultType } = action.payload;
      return {
        ...state,
        faultTypes: state.faultTypes.map((fT) => (fT._id === faultType._id ? faultType : fT)),
        selectedItem: undefined,
      };
    }
    case DELETE_FAULTTYPE: {
      const { faultType } = action.payload;
      return { ...state, faultTypes: state.faultTypes.filter((fT) => fT._id !== faultType._id) };
    }

    case SELECT_FAULT_TYPE: {
      return { ...state, selectedItem: state.faultTypes.find((fT) => fT._id === action.payload.id) };
    }

    case SET_FAULTTYPE_LOADING:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
