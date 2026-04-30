'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockColleges } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export function RankPredictor() {
  const [rank, setRank] = useState('');

  const predictions = useMemo(() => {
    if (!rank || isNaN(Number(rank))) return null;

    const userRank = Number(rank);

    // Predict admission chances based on rank and college acceptance rate
    const predictions = mockColleges.map(college => {
      // Simple prediction logic: better chance if rank < (total eligible candidates * acceptance rate)
      const estimatedCutoff = Math.round((100 / college.acceptanceRate) * college.rank);
      const chancePercentage = Math.max(0, Math.min(100, 100 - ((userRank - college.rank * 10) / (college.rank * 50)) * 100));
      
      let category: 'high' | 'moderate' | 'low';
      if (userRank <= college.rank * 15) {
        category = 'high';
      } else if (userRank <= college.rank * 30) {
        category = 'moderate';
      } else {
        category = 'low';
      }

      return {
        ...college,
        chancePercentage: Math.max(0, Math.min(100, chancePercentage)),
        category,
        estimatedCutoff,
      };
    });

    // Sort by chance percentage (descending)
    return predictions.sort((a, b) => b.chancePercentage - a.chancePercentage);
  }, [rank]);

  const highChance = predictions?.filter(p => p.category === 'high') ?? [];
  const moderateChance = predictions?.filter(p => p.category === 'moderate') ?? [];
  const lowChance = predictions?.filter(p => p.category === 'low') ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Section */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-3">
              Enter Your Entrance Exam Rank
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="text-lg h-12"
              />
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground px-8">
                Predict
              </Button>
            </div>
            <p className="text-xs text-foreground/60 mt-2">
              Enter your JEE Main rank to see personalized college predictions
            </p>
          </div>
        </div>
      </Card>

      {/* Results */}
      {predictions && rank && (
        <div className="space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border-green-500/30 bg-green-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">High Chance</p>
                  <p className="text-3xl font-bold text-green-600">{highChance.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </Card>
            <Card className="p-4 border-yellow-500/30 bg-yellow-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Moderate Chance</p>
                  <p className="text-3xl font-bold text-yellow-600">{moderateChance.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </Card>
            <Card className="p-4 border-red-500/30 bg-red-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Low Chance</p>
                  <p className="text-3xl font-bold text-red-600">{lowChance.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </Card>
          </div>

          {/* High Chance Colleges */}
          {highChance.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                Excellent Chances ({highChance.length})
              </h3>
              <div className="space-y-3">
                {highChance.slice(0, 5).map(college => (
                  <PredictionCard key={college.id} college={college} rank={Number(rank)} />
                ))}
              </div>
            </div>
          )}

          {/* Moderate Chance Colleges */}
          {moderateChance.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
                Good Chances ({moderateChance.length})
              </h3>
              <div className="space-y-3">
                {moderateChance.slice(0, 5).map(college => (
                  <PredictionCard key={college.id} college={college} rank={Number(rank)} />
                ))}
              </div>
            </div>
          )}

          {/* Low Chance Colleges */}
          {lowChance.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-600" />
                Lower Chances ({lowChance.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lowChance.slice(0, 4).map(college => (
                  <Link key={college.id} href={`/college/${college.id}`}>
                    <Card className="p-4 hover:shadow-lg transition-all cursor-pointer h-full">
                      <p className="font-semibold text-sm mb-1">{college.name}</p>
                      <p className="text-xs text-foreground/60 mb-2">Rank #{college.rank}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">Success: {Math.round(college.chancePercentage)}%</span>
                        <span className="text-xs text-red-600 font-medium">Low</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <Card className="p-6 bg-blue-500/10 border-blue-500/30">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tips to Improve Your Chances
            </h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Focus on colleges in the &quot;Excellent Chances&quot; category as your safe options</li>
              <li>• Use &quot;Good Chances&quot; colleges as your target options</li>
              <li>• Consider colleges with excellent placement records and strong alumni networks</li>
              <li>• Research thoroughly about campus facilities and course specializations</li>
              <li>• Note that cut-off ranks change every year based on difficulty and number of applicants</li>
            </ul>
          </Card>
        </div>
      )}

      {!rank && (
        <Card className="p-12 text-center">
          <p className="text-lg text-foreground/60">Enter your rank to get personalized predictions</p>
        </Card>
      )}
    </div>
  );
}

function PredictionCard({ college, rank }: { college: any; rank: number }) {
  return (
    <Link href={`/college/${college.id}`}>
      <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-primary">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <p className="font-bold text-base mb-1">{college.name}</p>
            <p className="text-xs text-foreground/60 mb-2">Rank #{college.rank} • Placement: {college.placementPercentage}%</p>
            
            <div className="flex gap-4 text-xs">
              <span>Avg Package: ₹{(college.averagePackage / 100000).toFixed(1)}L</span>
              <span>Fees: ₹{(college.fees / 100000).toFixed(1)}L</span>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div>
              <p className="text-xs text-foreground/60 font-medium">Success Rate</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {Math.round(college.chancePercentage)}%
              </p>
            </div>
            <div className="w-20 bg-muted rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                style={{ width: `${college.chancePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
