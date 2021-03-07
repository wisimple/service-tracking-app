import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, Table, Popconfirm } from "antd";
import { FaultTypeDto } from "dto";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

import { createFaultType, deleteFaultType, selectFaultType, updateFaultType } from "store/faultType/actions";

const { Search } = Input;

const FaultTypeCrud = () => {
  const { faultTypes, loading, cLoading, dLoading, uLoading, selectedItem } = useSelector(
    (state: RootState) => state.faultTypeState
  );
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [updatedName, setupdatedName] = useState("");

  const handleCreateSubmit = async (name: string) => {
    await dispatch(createFaultType({ name }));
    setname("");
  };

  const handleUpdateSubmit = async () => {
    if (selectedItem) {
      await dispatch(updateFaultType(selectedItem?._id, { name: updatedName }));
    }
  };

  useEffect(() => {
    setupdatedName(selectedItem?.name || "");
  }, [selectedItem]);

  return (
    <>
      <Search
        placeholder="input text"
        enterButton="KAYDET"
        loading={cLoading}
        value={name}
        onChange={({ target }) => setname(target.value)}
        onSearch={handleCreateSubmit}
      />
      <List
        style={{ marginTop: 8 }}
        loading={loading}
        itemLayout="horizontal"
        dataSource={faultTypes}
        renderItem={(item) => (
          <List.Item>
            {!dLoading && selectedItem?._id === item._id ? (
              <Form onFinish={handleUpdateSubmit} style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Input
                    value={updatedName}
                    onChange={({ target }) => setupdatedName(target.value)}
                    required
                    name="name"
                    autoFocus
                  />
                  <Button htmlType="submit" loading={uLoading}>
                    Düzenle
                  </Button>
                </div>
              </Form>
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.name}</span>
                <div>
                  <Button
                    size="small"
                    icon={<FormOutlined />}
                    onClick={() => {
                      dispatch(selectFaultType(item._id));
                    }}
                    style={{ marginRight: 8 }}
                    loading={selectedItem?._id === item._id && uLoading}
                  >
                    Düzenle
                  </Button>
                  <Popconfirm
                    title="Bu işlem geri alınamaz, silmek istediğinizden emin misiniz?"
                    onConfirm={() => {
                      dispatch(deleteFaultType(item._id));
                      dispatch(selectFaultType(item._id));
                    }}
                    okText="Sil"
                    cancelText="Vazgeç"
                  >
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                      loading={selectedItem?._id === item._id && dLoading}
                    >
                      Sil
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default FaultTypeCrud;
