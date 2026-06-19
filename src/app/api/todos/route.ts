import { NextRequest, NextResponse } from 'next/server';
import { TodoService } from '@/backend_lib/services/todoService';

export async function GET() {
  try {
    const todos = await TodoService.getAllTodos();
    return NextResponse.json({ success: true, data: todos });
  } catch (error: any) {
    console.error('[API] Error in GET /api/todos:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Title is required and must be a string' },
        { status: 400 }
      );
    }

    const newTodo = await TodoService.createTodo({
      title: body.title,
      description: body.description,
    });

    return NextResponse.json({ success: true, data: newTodo }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error in POST /api/todos:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create todo' },
      { status: 500 }
    );
  }
}
