import { NextRequest, NextResponse } from 'next/server';
import { TodoService } from '@/backend_lib/services/todoService';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedTodo = await TodoService.updateTodo(id, {
      title: body.title,
      description: body.description,
      completed: body.completed,
    });

    if (!updatedTodo) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedTodo });
  } catch (error: any) {
    console.error('[API] Error in PATCH /api/todos/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await TodoService.deleteTodo(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: { id, deleted: true } });
  } catch (error: any) {
    console.error('[API] Error in DELETE /api/todos/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
