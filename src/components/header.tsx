import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="bg-zinc-900 w-full h-16 relative lg:h-20">
        <div className="h-full relative">
          <div className="mx-8 lg:mx-20 h-full flex items-center justify-between">
            <Link href='/' className="flex items-center h-full w-28">
              <Image src='/logo.svg' alt='Logo' width={114} height={43} />
            </Link>
          <Button size='lg' className="group" asChild>
            <Link href='/signin'>
              Sign In
              <ArrowRight size={20} className="text-sky-400" />
            </Link>
          </Button>
          </div>
        </div>
      </header>
  );
}