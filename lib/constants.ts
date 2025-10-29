export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PICKED_UP: 'picked_up',
  WASHING: 'washing',
  IRONING: 'ironing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const SERVICE_CATEGORIES = {
  WASH_FOLD: 'wash-fold',
  DRY_CLEAN: 'dry-clean',
  IRONING: 'ironing',
  SPECIAL: 'special',
  STAIN_REMOVAL: 'stain-removal',
  PREMIUM: 'premium',
} as const;

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  STAFF: 'staff',
} as const;

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
} as const;

export const TAX_RATE = 0.08; // 8% tax
export const DELIVERY_FEE = 5.99;
export const MINIMUM_ORDER_VALUE = 15.00;