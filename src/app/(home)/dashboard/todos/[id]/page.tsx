import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Todo } from '../../page';
import type { Metadata } from 'next';
import { RemoveTodo } from '@/components/remove-to-do';
import { DialogNewTodoItem } from '@/components/dialog-new-todo-item';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export type TodoItem = {
  id: string;
  name: string;
  description?: string;
  check: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const todo = await getTodo(id);

  return {
    title: `Todo tasks - ${todo.title}`,
  };
}

async function getTodoItems(todoId: string) {
  const session = await getServerSession(authOptions);
  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}/items`,
    {
      headers,
      next: {
        tags: ['items'],
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const items = (await res.json()).todo_items as TodoItem[];

  return items;
}

async function getTodo(id: string) {
  const session = await getServerSession(authOptions);
  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const resTodo = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
    {
      headers,
    },
  );

  if (!resTodo.ok) {
    notFound();
  }

  const todo = (await resTodo.json()).todo as Todo;

  return todo;
}

export default async function Todo({ params: { id } }: Props) {
  const todo = await getTodo(id);
  const todoItems = await getTodoItems(id);

  return (
    <main className="h-full p-6 w-full">
      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between max-w-5xl mx-auto">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <ArrowLeft size={25} />
            </Link>
            <h2 className="text-2xl font-bold leading-7 capitalize text-zinc-800 dark:text-zinc-100 sm:truncate sm:text-3xl sm:tracking-tight">
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
