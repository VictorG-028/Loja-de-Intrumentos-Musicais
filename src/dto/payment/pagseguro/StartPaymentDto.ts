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

export default interface StartPaymentDto {
  idempotentId: string;
  userId: string;
  productIds: string[];
  productQuantity: number[];
  unitPrices: number[];
  totalCost: number;
}

export function validateStartPaymentDto(dto: any): dto is StartPaymentDto {
  return (
    typeof dto === 'object' &&
    dto !== null &&
    typeof dto.idempotentId === 'string' &&
    dto.idempotentId.trim() !== '' &&
    typeof dto.userId === 'string' &&
    dto.userId.trim() !== '' &&
    Array.isArray(dto.productIds) &&
    dto.productIds.every((id: any) => typeof id === 'string' && id.trim() !== '') && // Verifica se productIds é um array de strings não vazias
    typeof dto.totalCost === 'number' &&
    !isNaN(dto.totalCost) &&
    dto.totalCost >= 0
  );
}
