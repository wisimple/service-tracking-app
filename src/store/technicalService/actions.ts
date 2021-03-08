import { TechnicalServiceDto } from "dto";
import api from "utils/api";
import {
  CREATE_TECHNICAL_SERVICE,
  FETCH_TECHNICAL_SERVICES,
  GET_TECHNICAL_SERVICE,
  GET_TECHNICAL_SERVICE_SUMMARY,
  SET_TECHNICAL_SERVICE_LOADING,
  TechnicalServiceActionTypes,
  TechnicalServiceThunkActionTypes,
  UPDATE_TECHNICAL_SERVICE,
} from "./types";

export const fetchTechnicalServices = (): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get("technical-services");
    dispatch({ type: FETCH_TECHNICAL_SERVICES, payload: { services: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const createTechnicalService = (
  technicalServiceDto: TechnicalServiceDto
): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ cloading: true }));
    const { data } = await api.post("technical-services", technicalServiceDto);
    dispatch({ type: CREATE_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ cloading: false }));
  } catch (error) {}
};

export const updateTechnicalService = (
  id: string,
  technicalServiceDto: TechnicalServiceDto
): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ uloading: true }));
    const { data } = await api.put(`technical-services/${id}`, technicalServiceDto);
    dispatch({ type: UPDATE_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ uloading: false }));
  } catch (error) {}
};

export const getTechnicalService = (id: string): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`technical-services/${id}`);
    dispatch({ type: GET_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const getTechnicalServicesSummary = (): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`technical-services/summary`);
    dispatch({ type: GET_TECHNICAL_SERVICE_SUMMARY, payload: { summary: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

const setLoading = (data: {
  loading?: boolean;
  cloading?: boolean;
  dloading?: boolean;
  uloading?: boolean;
}): TechnicalServiceActionTypes => ({
  type: SET_TECHNICAL_SERVICE_LOADING,
  payload: data,
});
