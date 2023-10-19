import Link from 'next/link';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Button asChild variant="link" className="py-0 px-0">
            <Link href="https://github.com/gleysonabreu" target="_blank">
              @gleysonabreu
            </Link>
          </Button>
        </p>
      </div>
    </footer>
  );
}
