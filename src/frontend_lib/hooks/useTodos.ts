import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, ApiHealthResponse } from '@/frontend_lib/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Health status states
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [checkingHealth, setCheckingHealth] = useState<boolean>(false);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/todos');
      const result = await response.json();
      if (result.success) {
        setTodos(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch todos');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check database health
  const checkHealth = useCallback(async () => {
    setCheckingHealth(true);
    setDbError(null);
    try {
      const response = await fetch('/api/health');
      const result: ApiHealthResponse = await response.json();
      setDbConnected(result.database?.connected || false);
      if (result.database && !result.database.connected) {
        setDbError(result.database.error || 'Database connection offline');
      }
    } catch (err: any) {
      setDbConnected(false);
      setDbError(err.message || 'Failed to ping health endpoint');
    } finally {
      setCheckingHealth(false);
    }
  }, []);

  // Create a new todo
  const createTodo = async (input: CreateTodoInput) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      if (result.success && result.data) {
        setTodos((prev) => [result.data, ...prev]);
        return result.data as Todo;
      } else {
        throw new Error(result.error || 'Failed to create todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
      throw err;
    }
  };

  // Toggle todo completion or edit fields
  const updateTodo = async (id: string, input: UpdateTodoInput) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      if (result.success && result.data) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? { ...todo, ...result.data } : todo))
        );
        return result.data as Todo;
      } else {
        throw new Error(result.error || 'Failed to update todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update todo');
      throw err;
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        return true;
      } else {
        throw new Error(result.error || 'Failed to delete todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
      throw err;
    }
  };

  // Load initial data and run health check
  useEffect(() => {
    checkHealth();
    fetchTodos();
  }, [fetchTodos, checkHealth]);

  return {
    todos,
    loading,
    error,
    dbConnected,
    dbError,
    checkingHealth,
    fetchTodos,
    checkHealth,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
