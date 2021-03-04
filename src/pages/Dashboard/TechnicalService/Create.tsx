import React from "react";
import TechnicalServiceForm from "components/TechnicalServiceForm";
import { Card } from "antd";
const create = () => {
  return (
    <Card title="Teknik Servis İşlemi Oluştur">
      <TechnicalServiceForm />
    </Card>
  );
};

export default create;
