export const user = {
  _id: "1",
  name: "Ali Veli",
  company: { name: "Dost GSM", address: "", city: "Nigde", town: "Merkez" },
  email: "aliveli@gmail.com",
  password: "123123",
};

export const customers = [
  {
    _id: "s",
    userId: user,
    name: "Musteri 1",
    type: "person",
    phone: "05554443322",
    idendityNumber: "32311234523",
    cAt: "2021-02-02T00:23:38.217+00:00",
    uAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "a",
    userId: user,
    name: "Musteri 2",
    phone: "05554443322",
    idendityNumber: "32311234523",
    type: "person",
    cAt: "2021-02-02T00:23:38.217+00:00",
    uAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "b",
    userId: user,
    name: "Musteri 3",
    phone: "05554443322",
    idendityNumber: "32311234523",
    type: "company",
    cAt: "2021-02-02T00:23:38.217+00:00",
    uAt: "2021-02-02T00:23:38.217+00:00",
  },
];

export const productCategories = [
  { _id: "1", userId: "1", name: "Telefon" },
  { _id: "2", name: "Bilgisyar" },
];

export const productBrands = [
  { _id: "1", categoryId: productCategories[0], name: "Apple" },
  { _id: "2", categoryId: productCategories[0], name: "Samsung" },
  { _id: "3", categoryId: productCategories[0], name: "Sony" },
];

export const productModels = [
  { _id: "1", brandId: productBrands[0], name: "6S" },
  { _id: "2", brandId: productBrands[0], name: "5" },
  { _id: "3", brandId: productBrands[2], name: "Xperia Z2" },
];

export const faultTypes = [
  { _id: "1", userId: user, name: "Ekran Degisimi" },
  { _id: "2", userId: user, name: "Anakart Tamiri" },
];

export const service = {
  _id: "sdfdsf",
  userId: user,
  customer: { _id: customers[0], demand: "ekran calismiyor" },
  product: {
    categoryId: productCategories[0],
    brand: productBrands[0],
    model: productModels[0],
    serialNumber: "39392829293",
    password: "123123",
    photos: [
      "https://www.w3schools.com/howto/img_avatar2.png",
      "https://www.w3schools.com/w3images/avatar6.png",
    ],
  },
  faultTypeId: faultTypes[0],
  description: "Verdik sonra alicaz",
  warrantyDays: 30,
  status: 0,
  cost: 1200,
  sparePartCost: 100,
  paid: 600,
  cAt: "2021-02-02T00:23:38.217+00:00",
  uAt: "2021-02-02T00:23:38.217+00:00",
  deliveredAt: "2021-02-02T00:23:38.217+00:00",
};
