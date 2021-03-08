import {
  FETCH_TECHNICAL_SERVICES,
  CREATE_TECHNICAL_SERVICE,
  TechnicalServiceActionTypes,
  TechnicalServiceState,
  UPDATE_TECHNICAL_SERVICE,
  DELETE_TECHNICAL_SERVICE,
  GET_TECHNICAL_SERVICE,
  SET_TECHNICAL_SERVICE_LOADING,
  GET_TECHNICAL_SERVICE_SUMMARY,
} from "./types";

const initialState: TechnicalServiceState = {
  services: [],
};

export default function technicalServiceReducer(
  state = initialState,
  action: TechnicalServiceActionTypes
): TechnicalServiceState {
  switch (action.type) {
    case FETCH_TECHNICAL_SERVICES:
      return { ...state, services: action.payload.services };

    // case CREATE_TECHNICAL_SERVICE:
    //   return { ...state, services: [action.payload.service, ...state.services] };

    case GET_TECHNICAL_SERVICE: {
      const { service } = action.payload;
      return { ...state, service };
    }
    case UPDATE_TECHNICAL_SERVICE: {
      const { service } = action.payload;
      return {
        ...state,
        services: state.services.map((s) => (s._id === service._id ? service : s)),
      };
    }

    case DELETE_TECHNICAL_SERVICE: {
      const { service } = action.payload;
      return {
        ...state,
        services: state.services.filter((s) => s._id !== service._id),
      };
    }

    case SET_TECHNICAL_SERVICE_LOADING: {
      return { ...state, ...action.payload };
    }

    case GET_TECHNICAL_SERVICE_SUMMARY: {
      const { summary } = action.payload;
      return { ...state, summary };
    }

    default:
      return state;
  }
}
