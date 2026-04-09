/* Donation service utilities - Connected to MySQL backend */

import { 
  DonationRecord, 
  FoodDonation, 
  MoneyDonation, 
  ClothingDonation,
  Notification 
} from '../types';
import { apiClient } from './api-client';

const VALID_AGES = [10, 19, 20, 30, 45];

/* ─── Helper utilities ─── */

const _setThanksFlag = (masterRecord: DonationRecord): void => {
  try {
    sessionStorage.setItem(
      'dms_thanks',
      JSON.stringify({
        committed: true,
        donationId: masterRecord.id,
        type: masterRecord.type,
        committedAt: new Date().toISOString(),
      })
    );
  } catch {
    /* graceful degradation */
  }
};

const _dispatchSuccess = (record: DonationRecord): void => {
  window.dispatchEvent(
    new CustomEvent('donationSuccess', { detail: record })
  );
};

/* ─── Food Donations ─── */

export const saveFoodDonation = async (
  userId: string,
  riceQty: number,
  vegQty: number
): Promise<FoodDonation | null> => {
  try {
    const response = await apiClient.post<FoodDonation>('/donations/food', {
      userId,
      riceQty,
      vegQty,
      type: 'food',
      status: 'pending',
    });

    if (response.success && response.data) {
      _setThanksFlag(response.data);
      _dispatchSuccess(response.data);
      return response.data;
    }
    console.error('Failed to save food donation:', response.error);
    return null;
  } catch (error) {
    console.error('Error saving food donation:', error);
    return null;
  }
};

export const getFoodDonationsByUser = async (userId: string): Promise<FoodDonation[]> => {
  try {
    const response = await apiClient.get<FoodDonation[]>(`/donations/food/user/${userId}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching food donations:', error);
    return [];
  }
};

/* ─── Money Donations ─── */

export const saveMoneyDonation = async (
  userId: string,
  amount: number,
  transactionId: string
): Promise<MoneyDonation | null> => {
  try {
    const response = await apiClient.post<MoneyDonation>('/donations/money', {
      userId,
      amount,
      transactionId,
      type: 'money',
      status: 'pending',
      paymentStatus: 'completed',
    });

    if (response.success && response.data) {
      _setThanksFlag(response.data);
      _dispatchSuccess(response.data);
      return response.data;
    }
    console.error('Failed to save money donation:', response.error);
    return null;
  } catch (error) {
    console.error('Error saving money donation:', error);
    return null;
  }
};

export const getMoneyDonationsByUser = async (userId: string): Promise<MoneyDonation[]> => {
  try {
    const response = await apiClient.get<MoneyDonation[]>(`/donations/money/user/${userId}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching money donations:', error);
    return [];
  }
};

/* ─── Clothing Donations ─── */

export const saveClothingDonation = async (
  userId: string,
  targetAge: number,
  quantity: number,
  condition: string
): Promise<ClothingDonation | null> => {
  try {
    if (!VALID_AGES.includes(targetAge)) {
      throw new Error(`Invalid target age: ${targetAge}`);
    }

    const response = await apiClient.post<ClothingDonation>('/donations/clothing', {
      userId,
      targetAge,
      quantity,
      condition,
      type: 'clothing',
      status: 'pending',
    });

    if (response.success && response.data) {
      _setThanksFlag(response.data);
      _dispatchSuccess(response.data);
      return response.data;
    }
    console.error('Failed to save clothing donation:', response.error);
    return null;
  } catch (error) {
    console.error('Error saving clothing donation:', error);
    return null;
  }
};

export const getClothingDonationsByUser = async (userId: string): Promise<ClothingDonation[]> => {
  try {
    const response = await apiClient.get<ClothingDonation[]>(`/donations/clothing/user/${userId}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching clothing donations:', error);
    return [];
  }
};

/* ─── Generic Donation Records ─── */

export const getRecordById = async (id: string): Promise<DonationRecord | undefined> => {
  try {
    const response = await apiClient.get<DonationRecord>(`/donations/${id}`);
    return response.success ? response.data : undefined;
  } catch (error) {
    console.error('Error fetching donation record:', error);
    return undefined;
  }
};

export const getRecordsByUser = async (userId: string): Promise<DonationRecord[]> => {
  try {
    const response = await apiClient.get<DonationRecord[]>(`/donations/user/${userId}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching user donations:', error);
    return [];
  }
};

export const getRecordsByType = async (type: string): Promise<DonationRecord[]> => {
  try {
    const response = await apiClient.get<DonationRecord[]>(`/donations/type/${type}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching donations by type:', error);
    return [];
  }
};

/* ─── Notifications ─── */

export const createNotification = async (
  userId: string,
  type: 'approved' | 'rejected' | 'alert',
  message: string
): Promise<Notification | null> => {
  try {
    const response = await apiClient.post<Notification>('/notifications', {
      userId,
      type,
      message,
    });

    return response.success && response.data ? response.data : null;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

export const getNotificationsByUser = async (userId: string): Promise<Notification[]> => {
  try {
    const response = await apiClient.get<Notification[]>(`/notifications/user/${userId}`);
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = (notifId: string): void => {
  const notifs = _loadTable(NOTIF_KEY);
  const notif = notifs.find((n: any) => n.id === notifId);
  if (notif) {
    notif.read = true;
    _saveTable(NOTIF_KEY, notifs);
  }
};
