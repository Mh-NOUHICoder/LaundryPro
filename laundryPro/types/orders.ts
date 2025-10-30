import type { Address, PaymentMethod, OrderStatus, SortOrder } from './index';

export interface OrderCreateData {
  services: Array<{
    serviceId: string;
    quantity: number;
    instructions?: string;
  }>;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: string;
  deliveryDate: string;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
}

export interface OrderUpdateData {
  status?: OrderStatus;
  assignedStaff?: string;
  adminNotes?: string;
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}