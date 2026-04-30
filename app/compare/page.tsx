import { Navbar } from '@/components/navbar';
import { ComparisonTool } from '@/components/comparison-tool';

export const metadata = {
  title: 'Compare Colleges - CollegeFinder',
  description: 'Compare colleges side-by-side to see placement rates, fees, ratings, and more.',
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Compare Colleges
          </h1>
          <p className="text-xl text-foreground/70">
            Choose up to 3 colleges to compare their fees, placements, and other metrics side-by-side.
          </p>
        </div>
        <ComparisonTool />
      </div>
    </main>
  );
}
