import { CircleOff } from 'lucide-react';

export function NoTodos() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex items-center flex-col gap-2 max-w-md w-full p-10 border border-dashed rounded-lg border-border">
        <CircleOff size={30} />
        <h1 className="font-bold text-lg">No to-dos</h1>
        <span className="text-muted-foreground text-sm">
          Get started by creating a new to-do.
        </span>
      </div>
    </div>
  );
}
