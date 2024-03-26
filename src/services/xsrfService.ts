import axios from 'axios';
import { Task } from '../interfaces/taskInterface';

class XsrfService {
  private BASE_URL = process.env.REACT_APP_SANCTUM_BACKEND + "/api" || "";

  public async fetchXsrfToken(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${this.BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }
}

export default new XsrfService();
