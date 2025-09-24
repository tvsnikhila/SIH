import { Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className, inSidebar }: { className?: string, inSidebar?: boolean }) {
  const linkTarget = inSidebar ? "/dashboard" : "/";
  return (
    <Link href={linkTarget} className={cn('flex items-center gap-2 text-foreground', className)}>
      <Sprout className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline">Krishi Sakha</span>
    </Link>
  );
}
