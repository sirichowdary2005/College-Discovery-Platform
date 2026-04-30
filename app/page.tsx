import { Navbar } from '@/components/navbar';
import { CollegeListing } from '@/components/college-listing';

export const metadata = {
  title: 'CollegeFinder - Discover Your Perfect College',
  description: 'Search, filter, and compare colleges with detailed information about fees, placement rates, and more.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Find Your Perfect College
          </h1>
          <p className="text-xl text-foreground/70 text-balance max-w-2xl mx-auto">
            Explore top colleges, compare placements, and discover which institution aligns with your goals and aspirations.
          </p>
        </div>
        <CollegeListing />
      </div>
    </main>
  );
}
