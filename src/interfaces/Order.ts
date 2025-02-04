// enum OrderStatus {
//   new = "new",
//   pending = "pending",
//   done = "done",
// }

// export function isOrderStatus(status: string): status is OrderStatus {
//   return Object.values(OrderStatus).includes(status as OrderStatus);
// }

// export function convertToOrderStatus(status: string): OrderStatus | null {
//   if (isOrderStatus(status)) {
//     return status as OrderStatus
//   }
//   return null;
// }

// export default interface Order {
//   id?: string;
//   idempotentId: string;
//   userId: string
//   productIds: string[];
//   totalCost: number;
//   status: OrderStatus;
// }
