import { FaultTypeDto } from "dto";
import api from "utils/api";
import {
  CREATE_FAULTTYPE,
  FaultTypeActionTypes,
  FaultTypeThunkActionTypes,
  DELETE_FAULTTYPE,
  FETCH_FAULTTYPES,
  SET_FAULTTYPE_LOADING,
  UPDATE_FAULTTYPE,
} from "./types";

export const fetchFaultTypes = (): FaultTypeThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get("fault-types");
    dispatch(setLoading({ loading: false }));
    dispatch({ type: FETCH_FAULTTYPES, payload: { faultTypes: data } });
  } catch (error) {}
};

export const createFaultType = (faultTypeDto: FaultTypeDto): FaultTypeThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ cLoading: true }));
    const { data } = await api.post("fault-types", faultTypeDto);

    dispatch({
      type: CREATE_FAULTTYPE,
      payload: { faultType: data },
    });

    dispatch(setLoading({ cLoading: false }));
  } catch (error) {}
};

export const updateFaultType = (id: string, faultTypeDto: FaultTypeDto): FaultTypeThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ cLoading: true }));
    const { data } = await api.put(`fault-types/${id}`, faultTypeDto);
    dispatch({
      type: UPDATE_FAULTTYPE,
      payload: { faultType: data },
    });
    dispatch(setLoading({ cLoading: false }));
  } catch (error) {}
};

export const deleteFaultType = (id: string): FaultTypeThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ dLoading: true }));
    const { data } = await api.delete(`fault-types/${id}`);
    dispatch({
      type: DELETE_FAULTTYPE,
      payload: { faultType: data },
    });
    dispatch(setLoading({ dLoading: false }));
  } catch (error) {}
};

const setLoading = (data: {
  cLoading?: boolean;
  loading?: boolean;
  dLoading?: boolean;
}): FaultTypeActionTypes => {
  return {
    type: SET_FAULTTYPE_LOADING,
    payload: data,
  };
};
