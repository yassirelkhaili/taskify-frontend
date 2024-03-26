import axios from 'axios';
import { Task } from '../interfaces/taskInterface';

class TaskService {
  private BASE_URL = process.env.REACT_APP_SANCTUM_BACKEND + "/api" || "";

  public async fetchTasks(): Promise<Task[]> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');
      const response = await axios.get<Task[]>(`${this.BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  }
}

export default new TaskService();
