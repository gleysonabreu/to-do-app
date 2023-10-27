import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="h-full z-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );
};

export default Loading;
