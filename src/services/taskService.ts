import axios from 'axios';
import { TaskResponse } from '../interfaces/taskInterface';

class TaskService {
  private BASE_URL = process.env.REACT_APP_SANCTUM_BACKEND + "/api" || "";

  public async fetchTasks(): Promise<TaskResponse> {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!token) throw new Error('No access token found');
      const response = await axios.get<TaskResponse>(`${this.BASE_URL}/tasks`, {
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

const taskService = new TaskService();

export default taskService;
