import { api } from '@/config/api';
import { Todo } from '@/types/todo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { TodoItem } from '@/types/todo-item';

type TodoProfileProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: TodoProfileProps): Promise<Metadata> {
  const id = params.id;

  const todo = await getTodo(id);

  return {
    title: `Todo - ${todo?.title}`,
  };
}

async function getTodo(todoId: string): Promise<Todo | undefined> {
  const response = await api(`/todos/${todoId}`);

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return data.todo;
}

async function getTodoItems(todoId: string): Promise<TodoItem[]> {
  const response = await api(`/todos/${todoId}/items`);

  const data = await response.json();
  return data.todo_items;
}

export default async function TodoProfile({ params }: TodoProfileProps) {
  const todo = await getTodo(params.id);

  if (!todo) {
    notFound();
  }

  const todoItems = await getTodoItems(todo.id);

  return (
    <div className="flex-1">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 justify-center items-center mt-6">
        <DataTable columns={columns} data={todoItems} />
      </div>
    </div>
  );
}
