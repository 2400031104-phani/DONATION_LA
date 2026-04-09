/* API Client for backend communication */

const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('_authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeader(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeader(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const resData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: resData?.message || resData?.error || 'API Error',
      };
    }

    return {
      success: true,
      data: resData.data || resData,
      message: resData.message,
    };
  }
}

export const apiClient = new ApiClient();
