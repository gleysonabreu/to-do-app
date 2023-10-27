import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RemoveTodo } from '@/components/remove-to-do';
import { DialogNewTodoItem } from '@/components/dialog-new-todo-item';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TodoItem } from '@/types/todo-item';
import { Todo } from '@/types/todo';
import { api } from '@/config/api';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const todo = await getTodo(id);

  return {
    title: `Todo tasks - ${todo.title}`,
  };
}

async function getTodoItems(todoId: string): Promise<TodoItem[]> {
  const res = await api(`/todos/${todoId}/items`, {
    next: {
      tags: ['items'],
    },
  });

  if (!res.ok) {
    notFound();
  }

  const items = (await res.json()).todo_items;
  return items;
}

async function getTodo(id: string): Promise<Todo> {
  const resTodo = await api(`/todos/${id}`);

  if (!resTodo.ok) {
    notFound();
  }

  const todo = (await resTodo.json()).todo;
  return todo;
}

export default async function Todo({ params: { id } }: Props) {
  const todo = await getTodo(id);
  const todoItems = await getTodoItems(id);

  return (
    <main className="flex-1 p-6 w-full">
      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between max-w-5xl mx-auto">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <ArrowLeft size={25} />
            </Link>
            <h2 className="text-2xl font-bold leading-7 capitalize sm:truncate sm:text-3xl sm:tracking-tight">
              {todo.title}
            </h2>
          </div>

          <span className="dark:text-zinc-500 text-zinc-400">
            {todo.description}
          </span>
        </div>
        <div className="mt-5 flex gap-2 lg:ml-4 lg:mt-0 flex-col md:flex-row">
          <RemoveTodo id={id} />
          <DialogNewTodoItem />
        </div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-4 justify-center items-center mt-6">
        <DataTable columns={columns} data={todoItems} />
      </div>
    </main>
  );
}
