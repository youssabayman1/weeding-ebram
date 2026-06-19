'use client';

import React from 'react';
import { Todo } from '@/frontend_lib/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, completed: boolean) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

export default function TodoList({
  todos,
  loading,
  error,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '300px', justifyContent: 'center' }}>
        <div className="loading-spinner" />
        <p style={{ alignSelf: 'center', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Retrieving database documents...
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ minHeight: '300px' }}>
      <h2 className="panel-title">
        <span>Database Records</span>
        <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', color: 'var(--text-secondary)' }}>
          {todos.length} {todos.length === 1 ? 'item' : 'items'}
        </span>
      </h2>

      {error && (
        <div className="info-box danger" style={{ marginBottom: '1.5rem', marginTop: 0 }}>
          <strong>Error loading records: </strong> {error}
        </div>
      )}

      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3>No records found</h3>
          <p>The collection in MongoDB is currently empty. Use the creation form to add items.</p>
        </div>
      ) : (
        <div className="todo-list-container">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
