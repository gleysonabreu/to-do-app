'use client';
import { envClient } from '@/config/env/env-client';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CopyURL({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  const url = `${envClient.NEXT_PUBLIC_URL}/profile/${username}`;

  function handleCopyURL() {
    navigator.clipboard.writeText(url);
    setCopied(true);
  }

  useEffect(() => {
    const timeCopied = setTimeout(() => setCopied(false), 5000);

    return () => clearTimeout(timeCopied);
  }, [copied]);

  return (
    <div className="flex items-start md:items-center md:flex-row justify-between gap-2 flex-col">
      <p>{url}</p>
      <Button
        variant="outline"
        onClick={handleCopyURL}
        className="gap-2"
        type="button"
      >
        {copied ? (
          <>
            <Check size={16} /> Copied
          </>
        ) : (
          <>
            <Copy size={16} /> Copy
          </>
        )}
      </Button>
    </div>
  );
}
