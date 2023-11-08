'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, Menu, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { DialogNewTodo } from './dialog-new-todo';
import { ToggleTheme } from './toggle-theme';
import { Logo } from './logo';
import { UserNav } from './user-nav';
import { DialogSearch } from './dialog-search';

export function Header() {
  const { data: session } = useSession();

  const pathname = usePathname();
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b w-full h-16 sticky top-0 z-50 lg:h-20">
      <div className="h-full relative">
        <div className="mx-8 gap-5 lg:mx-20 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center h-full w-28">
            <Logo />
          </Link>

          <div className="w-full max-w-lg">
            <DialogSearch />
          </div>

          <div className="flex items-center gap-1">
            {session ? (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="block md:hidden">
                      <Menu />
                    </button>
                  </SheetTrigger>

                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>
                        <Link href="/">
                          <Logo />
                        </Link>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="pb-10 my-6">
                      <div className="flex flex-col pl-6 space-y-3 mb-6">
                        <Link
                          href="/dashboard"
                          className="px-3 py-2 hover:text-zinc-400 transition-all"
                        >
                          Dashboard
                        </Link>
                      </div>

                      <div className="border-t pt-4 border-border">
                        <div className="flex flex-col pl-6 space-y-3 mt-6">
                          <DialogNewTodo>
                            <Button size="sm">
                              To-do
                              <Plus size={16} />
                            </Button>
                          </DialogNewTodo>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <div className="items-center gap-2 flex">
                  <UserNav />
                  {pathname === '/' ? (
                    <Button asChild className="hidden md:flex">
                      <Link href="/dashboard">
                        Dashboard
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  ) : (
                    <DialogNewTodo>
                      <Button className="hidden md:flex">
                        To-do
                        <Plus size={16} />
                      </Button>
                    </DialogNewTodo>
                  )}
                </div>
              </>
            ) : (
              <Button className="group" asChild>
                <Link href="/signin">
                  Sign In
                  <ArrowRight size={16} />
                </Link>
              </Button>
            )}
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
