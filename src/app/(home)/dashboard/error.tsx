'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-400">
          Something wrong happened, try again!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => reset()}>Try again</Button>
          <Button size="sm" variant="link" asChild className="text-zinc-700">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
