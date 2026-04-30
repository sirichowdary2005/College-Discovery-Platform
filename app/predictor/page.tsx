import { Navbar } from '@/components/navbar';
import { RankPredictor } from '@/components/rank-predictor';

export const metadata = {
  title: 'Rank Predictor - CollegeFinder',
  description: 'Discover which colleges you can get admission to based on your entrance exam rank.',
};

export default function PredictorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            College Rank Predictor
          </h1>
          <p className="text-xl text-foreground/70">
            Enter your entrance exam rank to discover which colleges you have the best chances of getting admitted to.
          </p>
        </div>
        <RankPredictor />
      </div>
    </main>
  );
}
