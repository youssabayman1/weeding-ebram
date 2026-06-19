'use client';

import React, { useState } from 'react';
import { CreateTodoInput } from '@/frontend_lib/types';

interface TodoFormProps {
  onSubmit: (input: CreateTodoInput) => Promise<any>;
  disabled: boolean;
}

export default function TodoForm({ onSubmit, disabled }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }

    setValidationError(null);
    setSubmitting(true);
    try {
      await onSubmit({ title, description });
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setValidationError(err.message || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="glass-panel" onSubmit={handleSubmit}>
      <h2 className="panel-title">Add New Record</h2>
      
      {validationError && (
        <div className="info-box danger" style={{ marginBottom: '1.25rem', marginTop: 0 }}>
          {validationError}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="todo-title">Title</label>
        <input
          id="todo-title"
          type="text"
          className="form-input"
          placeholder="e.g. Set up development environment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled || submitting}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="todo-description">Description (Optional)</label>
        <textarea
          id="todo-description"
          className="form-textarea"
          placeholder="Describe the task details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled || submitting}
        />
      </div>

      <button
        type="submit"
        className="btn"
        disabled={disabled || submitting || !title.trim()}
      >
        {submitting ? 'Adding...' : 'Create Item'}
      </button>
    </form>
  );
}
