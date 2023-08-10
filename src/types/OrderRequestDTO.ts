export interface OrderRequestDTO {
  productOrderRequestList: ProductOrderRequestDTO[];
}

export interface ProductOrderRequestDTO {
  productId: number;
  quantity: number;
}
