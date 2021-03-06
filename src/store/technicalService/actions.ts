import { QueryTechnicalServiceDto, TechnicalServiceDto } from "dto";
import api from "utils/api";
import {
  CREATE_TECHNICAL_SERVICE,
  DELETE_TECHNICAL_SERVICE,
  FETCH_TECHNICAL_SERVICES,
  GET_TECHNICAL_LAST_TRACKING_ID,
  GET_TECHNICAL_SERVICE,
  GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY,
  GET_TECHNICAL_SERVICE_SUMMARY,
  SET_TECHNICAL_SERVICE_LOADING,
  TechnicalServiceActionTypes,
  TechnicalServiceThunkActionTypes,
  UPDATE_TECHNICAL_SERVICE,
} from "./types";

const resourceName = "technical-services";

export const fetchTechnicalServices = (
  queryParams?: QueryTechnicalServiceDto
): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(resourceName, {
      params: { ...queryParams },
    });
    dispatch({
      type: FETCH_TECHNICAL_SERVICES,
      payload: { services: data.result, accountSummary: data.summary },
    });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const createTechnicalService = (
  technicalServiceDto: TechnicalServiceDto
): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ cloading: true }));
    const { data } = await api.post(resourceName, technicalServiceDto);
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
    const { data } = await api.put(`${resourceName}/${id}`, technicalServiceDto);
    dispatch({ type: UPDATE_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ uloading: false }));
  } catch (error) {}
};

export const getTechnicalService = (id: string): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}/${id}`);
    dispatch({ type: GET_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const deleteTechnicalService = (id: string): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ dloading: true }));
    const { data } = await api.delete(`${resourceName}/${id}`);
    dispatch({ type: DELETE_TECHNICAL_SERVICE, payload: { service: data } });
    dispatch(setLoading({ dloading: false }));
  } catch (error) {}
};

export const getTechnicalServicesSummary = (): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}/summary`);
    dispatch({ type: GET_TECHNICAL_SERVICE_SUMMARY, payload: { summary: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const getTechnicalServicesLastTrackingId = (): TechnicalServiceThunkActionTypes => async (
  dispatch
) => {
  try {
    const { data } = await api.get(`${resourceName}/last-tracking-id`);
    dispatch({ type: GET_TECHNICAL_LAST_TRACKING_ID, payload: { id: data } });
  } catch (error) {}
};

export const getTechnicalServiceAccountSummary = (
  queryParams?: QueryTechnicalServiceDto
): TechnicalServiceThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ aSloading: true }));

    const { data } = await api.get(`${resourceName}/account-summary`, { params: { ...queryParams } });
    dispatch({ type: GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY, payload: { accountSummary: data } });
    dispatch(setLoading({ aSloading: false }));
  } catch (error) {}
};

const setLoading = (data: {
  loading?: boolean;
  cloading?: boolean;
  dloading?: boolean;
  uloading?: boolean;
  aSloading?: boolean;
}): TechnicalServiceActionTypes => ({
  type: SET_TECHNICAL_SERVICE_LOADING,
  payload: data,
});
