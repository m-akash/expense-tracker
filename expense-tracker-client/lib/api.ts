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
      // Handle different HTTP status codes
      if (response.status === 401) {
        // Token expired or invalid
        this.logout();
        throw new Error("Authentication required. Please log in again.");
      }
      if (response.status === 403) {
        throw new Error("You don't have permission to perform this action.");
      }
      if (response.status === 404) {
        throw new Error(data.message || "Resource not found.");
      }
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
    // Validate data before sending
    if (
      !expense.title?.trim() ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      throw new Error("All fields are required");
    }

    if (expense.amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    const response = await fetch(`${BASE_URL}/api/v1/expenses`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        title: expense.title.trim(),
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
      }),
    });

    const result: ApiResponse<Expense> = await this.handleResponse(response);
    return result.data!;
  }

  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    // Validate ID
    if (!id || id.trim() === "") {
      throw new Error("Expense ID is required");
    }

    // Validate required fields if they're being updated
    const updateData: any = {};

    if (expense.title !== undefined) {
      if (!expense.title.trim()) {
        throw new Error("Title cannot be empty");
      }
      updateData.title = expense.title.trim();
    }

    if (expense.amount !== undefined) {
      if (expense.amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      updateData.amount = expense.amount;
    }

    if (expense.category !== undefined) {
      if (!expense.category) {
        throw new Error("Category is required");
      }
      updateData.category = expense.category;
    }

    if (expense.date !== undefined) {
      updateData.date = expense.date;
    }

    console.log("Updating expense with ID:", id, "Data:", updateData); // Debug log

    const response = await fetch(`${BASE_URL}/api/v1/expenses/${id}`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    const result: ApiResponse<Expense> = await this.handleResponse(response);
    return result.data!;
  }

  async deleteExpense(id: string): Promise<void> {
    if (!id || id.trim() === "") {
      throw new Error("Expense ID is required");
    }

    const response = await fetch(`${BASE_URL}/api/v1/expenses/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    await this.handleResponse(response);
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Optional: Check if token is expired (if you have token expiry info)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      if (payload.exp && payload.exp < currentTime) {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error("Error parsing token:", error);
      this.logout();
      return false;
    }

    return true;
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
