import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
            <p className="text-lg text-foreground/70 max-w-md">
              The college you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
          </div>

          <div className="flex gap-4">
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link href="/">Browse All Colleges</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/compare">Compare Colleges</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
