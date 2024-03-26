import axios from 'axios';
import { Task } from '../interfaces/taskInterface';
import type { LoginReponse, LoginRequest, RegisterRequest } from '../interfaces/authInterface';

class AuthService {
  private BASE_URL = process.env.REACT_APP_SANCTUM_BACKEND + "/api" || "";

  public async login(values: LoginRequest): Promise<LoginReponse> {
    try {
      const response = await axios.post<LoginReponse>(`${this.BASE_URL}/login`, values);
      return response.data;
    } catch (error) {
      console.error('Failed to login user:', error);
      throw error;
    }
  }

  public async register(values: RegisterRequest): Promise<void> {
    try {
      await axios.post<void>(`${this.BASE_URL}/register`, values);
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  }

  public async logout(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${this.BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }

  public async checkUserLogin(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${this.BASE_URL}/user`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;