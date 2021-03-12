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
  GET_TECHNICAL_LAST_TRACKING_ID,
  GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY,
} from "./types";

const initialState: TechnicalServiceState = {
  services: [],
  lastTrackingId: 0,
};

export default function technicalServiceReducer(
  state = initialState,
  action: TechnicalServiceActionTypes
): TechnicalServiceState {
  switch (action.type) {
    case FETCH_TECHNICAL_SERVICES: {
      const { services, accountSummary } = action.payload;
      return { ...state, services, accountSummary };
    }

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

    case GET_TECHNICAL_LAST_TRACKING_ID:
      return { ...state, lastTrackingId: action.payload.id };

    case GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY:
      return { ...state, accountSummary: action.payload.accountSummary };

    default:
      return state;
  }
}
