import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

type TodoItemProps = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  completed: number;
};

export function TodoItem({
  title,
  description,
  amount,
  completed,
  id,
}: TodoItemProps) {
  const progress = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  return (
    <Link href={`/dashboard/todos/${id}`} className="w-72 h-60 group">
      <Card className="h-full w-full flex flex-col">
        <CardHeader>
          <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-end">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-400 uppercase text-sm tracking-widest">
              progress
            </span>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
