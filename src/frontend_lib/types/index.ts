export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ApiHealthResponse {
  success: boolean;
  timestamp: string;
  database: {
    connected: boolean;
    error?: string;
  };
}
