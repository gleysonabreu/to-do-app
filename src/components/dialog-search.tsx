import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { Search } from './search';

export function DialogSearch() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full inline-flex justify-between px-5 bg-transparent"
        >
          <span className="hidden lg:inline-flex">Search profiles...</span>
          <span className="lg:hidden inline-flex">Search...</span>
          <SearchIcon size={20} className="hidden md:block" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none">
        <Search />
      </DialogContent>
    </Dialog>
  );
}
