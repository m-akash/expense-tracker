const BASE_URL = "http://localhost:5500";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiService {
  private getAuthHeaders() {
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  async login(data: LoginData) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse = await this.handleResponse(response);

    // Handle your backend's response structure
    if (result.data?.token) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
    }

    return result.data; // Return just the data part
  }

  async register(data: RegisterData) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: ApiResponse = await this.handleResponse(response);
    return result.data;
  }

  async logout() {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/sign-out`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      await this.handleResponse(response);
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local cleanup even if server request fails
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  async getExpenses(): Promise<Expense[]> {
    const response = await fetch(`${BASE_URL}/api/v1/expenses`, {
      headers: this.getAuthHeaders(),
    });

    const result: ApiResponse<Expense[]> = await this.handleResponse(response);
    return result.data || [];
  }

  async createExpense(expense: Omit<Expense, "_id">): Promise<Expense> {
    const response = await fetch(`${BASE_URL}/api/v1/expenses`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(expense),
    });

    const result: ApiResponse<Expense> = await this.handleResponse(response);
    return result.data!;
  }

  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    const response = await fetch(`${BASE_URL}/api/v1/expenses/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(expense),
    });

    const result: ApiResponse<Expense> = await this.handleResponse(response);
    return result.data!;
  }

  async deleteExpense(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/v1/expenses/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    await this.handleResponse(response);
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  }

  // Helper method to get current user
  getCurrentUser(): any {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }
}

export const apiService = new ApiService();
export type { Expense, LoginData, RegisterData, ApiResponse };
