export const OrderStatus = [
  'AWAITING_PAYMENT',
  'AWAITING_SHIPMENT',
  'SHIPPED',
  'IN_TRANSIT',
  'COMPLETED',
  'CANCELED',
] as const;
export type OrderStatus = (typeof OrderStatus)[number];
