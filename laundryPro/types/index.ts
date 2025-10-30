// Core User Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  phone: string;
  role: 'customer' | 'admin' | 'staff';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  addresses: Address[];
  loyaltyPoints?: number;
}

export interface Staff extends User {
  role: 'staff';
  employeeId: string;
  permissions: StaffPermission[];
  assignedOrders: string[]; // order IDs
  isAvailable: boolean;
}

export interface Admin extends User {
  role: 'admin';
  adminLevel: 'super' | 'manager' | 'support';
  permissions: AdminPermission[];
}

// Address Management
export interface Address {
  id: string;
  label: string; // 'Home', 'Office', etc.
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  instructions?: string;
}

// Service Catalog
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  image: string;
  isActive: boolean;
  estimatedTime: string; // e.g., "24-48 hours"
  minimumOrder: number;
  unit: string; // 'per item', 'per kg', 'per load'
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceCategory = 
  | 'wash-fold' 
  | 'dry-clean' 
  | 'ironing' 
  | 'special' 
  | 'stain-removal' 
  | 'premium';

// Order Management
export interface Order {
  id: string;
  orderNumber: string; // formatted like "LP-2024-001"
  userId: string;
  user?: Customer; // populated when fetched
  services: OrderService[];
  totalAmount: number;
  subtotal: number;
  tax: number;
  discount?: number;
  status: OrderStatus;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: Date;
  deliveryDate: Date;
  assignedStaff?: string;
  assignedStaffDetails?: Staff; // populated when fetched
  specialInstructions?: string;
  customerNotes?: string;
  adminNotes?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface OrderService {
  service: string | Service; // service ID or populated service object
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  instructions?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'picked_up' 
  | 'washing' 
  | 'ironing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'partially_refunded';

export type PaymentMethod = 
  | 'cash' 
  | 'card' 
  | 'digital_wallet' 
  | 'bank_transfer';

// Authentication & Session
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'staff';
  image?: string;
}

export interface Session {
  user: AuthUser;
  expires: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
}

export interface OrderFormData {
  services: {
    serviceId: string;
    quantity: number;
    instructions?: string;
  }[];
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: string;
  deliveryDate: string;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
}

export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  image: string;
  estimatedTime: string;
  minimumOrder: number;
  unit: string;
  features: string[];
  isActive: boolean;
}

// Dashboard & Analytics
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeCustomers: number;
  pendingOrders: number;
  completedOrdersThisMonth: number;
  revenueThisMonth: number;
  averageOrderValue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderStatusCount {
  status: OrderStatus;
  count: number;
  percentage: number;
}

// Admin Management
export type StaffPermission = 
  | 'view_orders' 
  | 'update_order_status' 
  | 'manage_assignments' 
  | 'view_customers';

export type AdminPermission = 
  | 'manage_users' 
  | 'manage_services' 
  | 'manage_orders' 
  | 'manage_staff' 
  | 'view_analytics' 
  | 'system_settings';

// Notification System
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: Date;
}

// Search & Filter Types
export interface OrderFilter {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  staffId?: string;
  customerId?: string;
  userId?: string; // added to support filtering by owning user
}

export interface UserFilter {
  role?: User['role'];
  isActive?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

// API Request Types
export interface CreateOrderRequest {
  services: OrderService[];
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: Date;
  deliveryDate: Date;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
}

export interface UpdateOrderStatusRequest {
  orderId: string;
  status: OrderStatus;
  notes?: string;
}

export interface AssignStaffRequest {
  orderId: string;
  staffId: string;
}

// Component Prop Types
export interface OrderCardProps {
  order: Order;
  onStatusUpdate?: (orderId: string, status: OrderStatus) => void;
  onViewDetails?: (orderId: string) => void;
  showActions?: boolean;
}

export interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
  showQuantity?: boolean;
  onQuantityChange?: (serviceId: string, quantity: number) => void;
}

export interface UserTableProps {
  users: Customer[];
  onEdit?: (user: Customer) => void;
  onToggleStatus?: (userId: string, isActive: boolean) => void;
  onViewOrders?: (userId: string) => void;
}

// Utility Types
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

// File Upload Types
export interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

// Settings & Configuration
export interface AppSettings {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: Address;
  operatingHours: {
    open: string;
    close: string;
    timezone: string;
  };
  taxRate: number;
  currency: string;
  minimumOrderValue: number;
  deliveryFee: number;
}

// Export all types for easy importing
export * from './auth';
export * from './orders';
