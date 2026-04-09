/* Type definitions for DonateHub */

export interface User {
  userId: string;
  email: string;
  name: string;
  role: 'donor' | 'admin' | 'organization';
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  userId: string;
  type: 'food' | 'money' | 'clothing';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface FoodDonation extends DonationRecord {
  riceQty: number;
  vegQty: number;
}

export interface MoneyDonation extends DonationRecord {
  amount: number;
  transactionId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface ClothingDonation extends DonationRecord {
  targetAge: number;
  quantity: number;
  condition: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'approved' | 'rejected' | 'alert';
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: string;
  token: string;
}
