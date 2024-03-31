import axios from 'axios';
import { TaskResponse } from '../interfaces/taskInterface';
import { Submissionvalues } from '../partials/data-table-toolbar';

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

  public async postTask(values: Submissionvalues): Promise<TaskResponse> {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!token) throw new Error('No access token found');
      const response = await axios.post<TaskResponse>(`${this.BASE_URL}/tasks`, values, {
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

  public async editTask(values: Submissionvalues, taskId: number): Promise<TaskResponse> {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!token) throw new Error('No access token found');
      const response = await axios.put<TaskResponse>(`${this.BASE_URL}/tasks/${taskId}`, values, {
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

  public async deleteTask(taskId: number): Promise<TaskResponse> {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");
      if (!token) throw new Error('No access token found');
      const response = await axios.delete<TaskResponse>(`${this.BASE_URL}/tasks/${taskId}`, {
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
