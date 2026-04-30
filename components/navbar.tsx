'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary group-hover:bg-secondary transition-colors">
            <span className="text-base font-bold text-white">CF</span>
          </div>
          <span className="font-bold text-lg text-primary hidden sm:inline">CollegeFinder</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Browse
          </Link>
          <Link href="/compare" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Compare
          </Link>
          <Link href="/predictor" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Predictor
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
            <Link href="/compare">Compare</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-secondary text-white">
            <Link href="/predictor">Predictor</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
