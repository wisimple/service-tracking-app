import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Table, Button, Popover, Tag, Descriptions, Radio, InputNumber, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTechnicalServices,
  getTechnicalServiceAccountSummary,
  updateTechnicalService,
} from "store/technicalService/actions";

import { ITechicalService } from "interfaces";
import { getCustomerAvatarSrc, getDeviceImageUrl, getTechnicalServiceStatusType } from "helpers";

import Avatar from "antd/lib/avatar/avatar";
import Money from "components/Money";

import { technicServiceStatusTypes } from "constants/index";
import { QueryTechnicalServiceDto, TechnicalServiceDto } from "dto";

const { Column } = Table;

const AmountUpdateForm = ({
  service: { totalCost, paidAmount, _id },
  onSuccess = () => {},
}: {
  service: ITechicalService;
  onSuccess?: () => void;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const uloading = useSelector((state: RootState) => state.servicesState.uloading);

  useEffect(() => {
    form.setFieldsValue({ totalCost, paidAmount });
  }, [totalCost, paidAmount, form]);

  const handleSubmit = async (values: TechnicalServiceDto) => {
    await dispatch(updateTechnicalService(_id, values));
    onSuccess();
  };

  return (
    <Form form={form} onFinish={handleSubmit} wrapperCol={{ span: 12 }} labelCol={{ span: 12 }} size="small">
      <Form.Item label="Toplam Tutar" name="totalCost">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Ödenen Tutar" name="paidAmount">
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 12 }}>
        <Button htmlType="submit" loading={uloading}>
          KAYDET
        </Button>
      </Form.Item>
    </Form>
  );
};

interface Props {
  query?: QueryTechnicalServiceDto;
  showCustomerName?: boolean;
}

const TechnicalService = ({ query = {}, showCustomerName }: Props) => {
  const { services, accountSummary, loading, uloading, aSloading } = useSelector(
    (state: RootState) => state.servicesState
  );

  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechnicalServices(query));
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {accountSummary && (
        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="Toplam Tutar">
            {aSloading ? "Yükleniyor" : <Money size="large" amount={accountSummary?.totalCost || 0} />}
          </Descriptions.Item>
          <Descriptions.Item label="Alınan Tutar">
            {aSloading ? (
              "Yükleniyor"
            ) : (
              <Money size="large" amount={accountSummary?.paidAmount} color="green" />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Kalan Tutar">
            {aSloading ? (
              "Yükleniyor"
            ) : (
              <Money
                size="large"
                amount={(accountSummary?.totalCost || 0) - (accountSummary?.paidAmount || 0)}
                color="red"
              />
            )}
          </Descriptions.Item>
        </Descriptions>
      )}
      <Table
        id="table"
        dataSource={services}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        style={{ overflowY: "scroll" }}
      >
        <Column title="Takip No" dataIndex="trackingId" />
        {showCustomerName && (
          <Column
            className="hide-on-print"
            title="Müşteri"
            render={({ customerId }: ITechicalService) => (
              <Popover
                title={customerId.name}
                content={
                  <div>
                    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                      {customerId.contact?.phone && (
                        <li>
                          <strong>İletişim:</strong>{" "}
                          <a href={`tel:${customerId.contact.phone}`}>{customerId.contact.phone}</a>
                        </li>
                      )}
                      {customerId.desc && (
                        <li>
                          <strong>Açıklama / Not:</strong> {customerId.desc}
                        </li>
                      )}
                    </ul>
                    <Link to={`/dashboard/customers/${customerId._id}`}>
                      <Button type="primary" size="small">
                        Detaylar
                      </Button>
                    </Link>
                  </div>
                }
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="Avatar"
                    src={getCustomerAvatarSrc(customerId)}
                    style={{ marginRight: 8, flexShrink: 0 }}
                  />
                  {customerId.name}
                </div>
              </Popover>
            )}
          />
        )}
        <Column
          title="Cihaz"
          render={({ device }: ITechicalService) => {
            if (device?.customName) {
              return device.customName;
            } else {
              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {device?.productId?.imgFile && (
                    <img
                      alt="Device"
                      src={getDeviceImageUrl(device.productId.imgFile)}
                      height={35}
                      width="auto"
                      style={{ marginRight: 8 }}
                    />
                  )}
                  {device?.productId?.brandId?.name} {device?.productId?.name}
                </div>
              );
            }
          }}
        />
        <Column
          title="Durum"
          dataIndex="status"
          render={(status: number, service: ITechicalService) => {
            const { text, color } = getTechnicalServiceStatusType(status);
            return (
              <div>
                <Popover
                  title={
                    <>
                      <span>Durumu Güncelle</span>
                      {uloading && <LoadingOutlined spin style={{ marginLeft: 10 }} />}
                    </>
                  }
                  content={
                    <>
                      <Radio.Group
                        buttonStyle="solid"
                        size="small"
                        value={status}
                        disabled={uloading}
                        onChange={({ target }) =>
                          dispatch(updateTechnicalService(service._id, { status: target.value as number }))
                        }
                      >
                        {technicServiceStatusTypes.map((item) => (
                          <Radio.Button key={item.value} value={item.value} style={{ marginBottom: "6px" }}>
                            {item.text}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </>
                  }
                >
                  <Tag color={color}>{text}</Tag>
                </Popover>
                {service?.statusUAt && <small>{new Date(service.statusUAt).toLocaleDateString()}</small>}
              </div>
            );
          }}
        />
        <Column
          title="Arıza"
          render={({ faultTypeId }: ITechicalService) => (
            <div>
              {faultTypeId?.map((fT) => (
                <Tag key={fT._id}>{fT.name}</Tag>
              ))}
            </div>
          )}
        />
        <Column
          title="Ücret"
          render={({ paidAmount, totalCost, _id }, service: ITechicalService) => {
            const debt = (totalCost || 0) - (paidAmount || 0);

            return (
              <Popover
                title="Ücreti Düzenle"
                content={
                  <AmountUpdateForm
                    onSuccess={() => dispatch(getTechnicalServiceAccountSummary(query))}
                    service={service}
                  />
                }
              >
                <div>
                  <Money amount={totalCost} color={debt === 0 ? "green" : ""} />
                </div>
                {debt !== 0 && (
                  <div style={{ fontSize: "12px" }}>
                    <Money amount={debt} size="small" color="red" /> (Kalan)
                  </div>
                )}
              </Popover>
            );
          }}
        />
        <Column
          title="Giriş Tarihi"
          dataIndex="cAt"
          render={(date: string) => {
            return new Date(date).toLocaleDateString();
          }}
        />
        <Column
          className="hide-on-print"
          render={(item: ITechicalService) => {
            return (
              <Button type="dashed">
                <Link to={`${url}/${item._id}`}>İşlem Yap</Link>
              </Button>
            );
          }}
        />
      </Table>
    </>
  );
};

export default TechnicalService;
