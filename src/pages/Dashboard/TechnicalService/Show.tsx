import React, { useEffect } from "react";
import TechnicalServiceForm from "components/TechnicalServiceForm";
import { useDispatch, useSelector } from "react-redux";
import { getTechnicalService } from "store/technicalService/actions";
import { useParams } from "react-router";
import { RootState } from "store";

const Show = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const { service, loading } = useSelector((state: RootState) => state.servicesState);

  useEffect(() => {
    dispatch(getTechnicalService(params.id));
  }, []);

  return (
    <div>
      <TechnicalServiceForm data={service} />
    </div>
  );
};

export default Show;
