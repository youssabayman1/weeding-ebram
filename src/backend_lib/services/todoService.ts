import { ObjectId } from 'mongodb';
import { getDb } from '@/backend_lib/infrastructure/mongodb';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/backend_lib/types';

const COLLECTION_NAME = 'todos';

export class TodoService {
  private static async getCollection() {
    const db = await getDb();
    return db.collection<Todo>(COLLECTION_NAME);
  }

  static async getAllTodos(): Promise<Todo[]> {
    const collection = await this.getCollection();
    return collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  static async createTodo(input: CreateTodoInput): Promise<Todo> {
    if (!input.title || input.title.trim() === '') {
      throw new Error('Title is required');
    }

    const collection = await this.getCollection();
    const newTodo: Omit<Todo, '_id'> = {
      title: input.title.trim(),
      description: input.description?.trim() || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newTodo as Todo);
    return {
      ...newTodo,
      _id: result.insertedId,
    } as Todo;
  }

  static async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo | null> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const collection = await this.getCollection();
    const updates: Partial<Omit<Todo, '_id' | 'createdAt'>> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) {
      if (input.title.trim() === '') {
        throw new Error('Title cannot be empty');
      }
      updates.title = input.title.trim();
    }

    if (input.description !== undefined) {
      updates.description = input.description.trim();
    }

    if (input.completed !== undefined) {
      updates.completed = !!input.completed;
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );

    return result ? (result as Todo) : null;
  }

  static async deleteTodo(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}
