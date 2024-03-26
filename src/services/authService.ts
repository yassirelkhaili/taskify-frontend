import axios from 'axios';
import { Task } from '../interfaces/taskInterface';
import { LoginReponse } from '../interfaces/authInterface';

class AuthService {
  private BASE_URL = process.env.REACT_APP_SANCTUM_BACKEND + "/api" || "";

  public async login(): Promise<Task[]> {
    try {
      const response = await axios.get<LoginReponse>(`${this.BASE_URL}/login`);
      return response;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }

  public async register(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${this.BASE_URL}/register`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
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

export default new AuthService();