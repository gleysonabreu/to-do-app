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
  title: string;
  description?: string;
  progress: number;
};

export function TodoItem({ title, description, progress }: TodoItemProps) {
  return (
    <Link href="/dashboard/any-id" className="w-72 h-60 group">
      <Card className="h-full w-full flex flex-col">
        <CardHeader>
          <CardTitle className="group-hover:text-sky-500 line-clamp-2 transition-colors">
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
