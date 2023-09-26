'use client';

import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { fetchWithAuth } from '@/lib/fetcher';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

type Item = {
  id: string;
  isChecked: boolean;
  name: string;
  description?: string;
};

export function Item({ isChecked, name, description, id }: Item) {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(isChecked);
  const { toast } = useToast();

  async function handleCheck() {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(
        `/items/${id}/${checked ? 'undone' : 'done'}`,
        {
          method: 'PATCH',
        },
      );

      if (res.status === 204) {
        toast({
          title: `${name} ${checked ? 'unchecked' : 'checked'}`,
          variant: 'success',
        });

        setIsLoading(false);
        return;
      }

      console.log(res);
      toast({
        title: 'Something went wrong',
        description: 'Try again later.',
        variant: 'error',
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Connection failed.',
        description:
          'Unable to connect to Tasks. Please check your connection.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      data-checked={checked}
      className="w-full flex gap-3 justify-between items-center p-4  border rounded-lg bg-zinc-900 border-zinc-800 data-[checked=true]:bg-zinc-950 data-[checked=true]border-zinc-900"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          id={id}
          checked={checked}
          disabled={isLoading}
          onClick={handleCheck}
          onCheckedChange={(checked) =>
            setChecked(checked === 'indeterminate' ? true : checked)
          }
        />
        <div className="flex gap-3 flex-col">
          <label
            data-checked={checked}
            htmlFor={id}
            className="data-[checked=true]:line-through data-[checked=true]:text-zinc-400 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {name}
          </label>
          {description && (
            <span
              data-checked={checked}
              className="text-zinc-400 text-sm data-[checked=true]:line-through"
            >
              {description}
            </span>
          )}
        </div>
      </div>

      {isLoading && <Loader2 className="animate-spin text-zinc-400" />}
    </div>
  );
}
