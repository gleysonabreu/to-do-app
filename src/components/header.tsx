'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-zinc-900 w-full h-16 relative lg:h-20">
      <div className="h-full relative">
        <div className="mx-8 lg:mx-20 h-full flex items-center justify-between">
          <Link href='/' className="flex items-center h-full w-28">
            <Image src='/logo.svg' alt='Logo' width={114} height={43} />
          </Link>
          {session ? (
            <div className="items-center gap-4 hidden md:flex">
              <Avatar>
                <AvatarImage src={session.user.image as string} />
                <AvatarFallback className="uppercase">{session.user.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Button size='sm' asChild>
                <Link href='/dashboard'>
                  Dashboard
                  <ArrowRight size={20} className="text-sky-400" />
                </Link>
              </Button>
              <Button onClick={() => signOut()} size='sm' variant='link' className="p-0">
                Sign out
              </Button>
            </div>
          ) : (
            <Button size='lg' className="group" asChild>
              <Link href='/signin'>
                Sign In
                <ArrowRight size={20} className="text-sky-400" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
