import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://github.com/gleysonabreu"
            target="_blank"
          >
            @gleysonabreu
          </Link>
        </p>
      </div>
    </footer>
  );
}
