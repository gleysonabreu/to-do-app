import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

type TodoItemProps = {
  id: string;
  title: string;
  description?: string;
};

export function TodoItem({ title, description, id }: TodoItemProps) {
  return (
    <Link href={`/dashboard/todos/${id}`} className="w-72 min-h-[10rem] group">
      <Card className="h-full w-full flex flex-col">
        <CardHeader>
          <CardTitle className="group-hover:text-sky-500 line-clamp-2 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
