export interface IBasket {
  products: IBasketProduct[];
  basketAmount: number;
  paidAmount: number;
}

export interface IBasketProduct {
  _id: string;
  name: string;
  productId: string;
  count: number;
  price: number;
  totalPrice: number;
}
