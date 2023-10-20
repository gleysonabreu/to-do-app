import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="h-full">
      <article className="pt-10">
        <section className="relative overflow-hidden">
          <div className="h-full mx-8 lg:mx-20">
            <div className="flex flex-col gap-3 lg:gap-6 max-w-xl items-center mx-auto mb-14">
              <h1 className="text-5xl lg:text-6xl leading-[56px] lg:leading-[68px] tracking-[-1px] lg:tracking-[-2px] text-center font-semibold">
                Organize all of your groups tasks with multiple checklists.
              </h1>
              <span className="text-center text-zinc-400 md:text-md lg:text-lg">
                Ultimate platform for task and checklist management. Simplifying
                your life and improving your productivity, Task offers an
                effective approach to keeping track of your daily tasks.
              </span>
              <Button size="lg" className="group" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
