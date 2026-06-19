'use client';

import React, { useState } from 'react';
import { Todo } from '@/frontend_lib/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    if (updating) return;
    setUpdating(true);
    try {
      await onToggle(todo._id, !todo.completed);
    } catch (err) {
      console.error('Failed to toggle completion status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      setDeleting(true);
      try {
        await onDelete(todo._id);
      } catch (err) {
        console.error('Failed to delete todo:', err);
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button 
        type="button"
        className={`todo-item-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={handleToggle}
        disabled={updating || deleting}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      <div className="todo-item-content">
        <h3 className="todo-item-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-item-desc">{todo.description}</p>
        )}
        <div className="todo-item-meta">
          <span>Created: {formatDate(todo.createdAt)}</span>
          {todo.updatedAt !== todo.createdAt && (
            <span>• Updated: {formatDate(todo.updatedAt)}</span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="todo-item-delete"
        onClick={handleDelete}
        disabled={deleting}
        title="Delete this record"
        aria-label="Delete todo"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" />
          <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
