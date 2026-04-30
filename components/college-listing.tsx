'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockColleges, College } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star, MapPin, DollarSign, TrendingUp } from 'lucide-react';

export function CollegeListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [minFees, setMinFees] = useState(0);
  const [maxFees, setMaxFees] = useState(600000);
  const [minRating, setMinRating] = useState(0);

  // Get unique states
  const states = useMemo(() => {
    return Array.from(new Set(mockColleges.map(c => c.state))).sort();
  }, []);

  // Filter colleges
  const filteredColleges = useMemo(() => {
    return mockColleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = !selectedState || college.state === selectedState;
      const matchesFees = college.fees >= minFees && college.fees <= maxFees;
      const matchesRating = college.rating >= minRating;

      return matchesSearch && matchesState && matchesFees && matchesRating;
    });
  }, [searchQuery, selectedState, minFees, maxFees, minRating]);

  // Sort by rank
  const sortedColleges = useMemo(() => {
    return [...filteredColleges].sort((a, b) => a.rank - b.rank);
  }, [filteredColleges]);

  return (
    <div className="space-y-8">
      {/* Advanced Filters */}
      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-6">Search & Filter Colleges</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              College Name
            </label>
            <Input
              placeholder="Search college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Location
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              <option value={0}>All Ratings</option>
              <option value={3.8}>3.8 & Above</option>
              <option value={4.0}>4.0 & Above</option>
              <option value={4.2}>4.2 & Above</option>
              <option value={4.5}>4.5 & Above</option>
            </select>
          </div>
        </div>

        {/* Advanced Fee Range Filter */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-foreground/70 uppercase">
                Annual Fees Range
              </label>
              <span className="text-sm font-bold text-primary">
                ₹{minFees.toLocaleString()} - ₹{maxFees.toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground/60 mb-2 block">Minimum (₹)</label>
                <input
                  type="range"
                  min="0"
                  max="600000"
                  step="10000"
                  value={minFees}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= maxFees) setMinFees(value);
                  }}
                  className="w-full cursor-pointer accent-primary"
                />
                <div className="text-xs text-foreground/50 mt-1">₹0 - ₹600,000</div>
              </div>
              
              <div>
                <label className="text-xs text-foreground/60 mb-2 block">Maximum (₹)</label>
                <input
                  type="range"
                  min="0"
                  max="600000"
                  step="10000"
                  value={maxFees}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= minFees) setMaxFees(value);
                  }}
                  className="w-full cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Quick Fee Presets */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => { setMinFees(0); setMaxFees(300000); }}
                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors"
              >
                Budget (0-3L)
              </button>
              <button
                onClick={() => { setMinFees(300000); setMaxFees(450000); }}
                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors"
              >
                Mid-Range (3L-4.5L)
              </button>
              <button
                onClick={() => { setMinFees(450000); setMaxFees(600000); }}
                className="px-3 py-2 bg-primary/10 text-primary text-xs font-medium rounded hover:bg-primary/20 transition-colors"
              >
                Premium (4.5L-6L)
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-primary hover:bg-secondary text-white"
              onClick={() => {}}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/5"
              onClick={() => {
                setSearchQuery('');
                setSelectedState('');
                setMinFees(0);
                setMaxFees(600000);
                setMinRating(0);
              }}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-foreground/70">
        Showing {sortedColleges.length} of {mockColleges.length} colleges
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedColleges.map(college => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {sortedColleges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-foreground/60">No colleges found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

function CollegeCard({ college }: { college: College }) {
  return (
    <Link href={`/college/${college.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full hover:-translate-y-1">
        <div className="relative h-40 bg-primary/20 overflow-hidden group">
          <Image
            src={college.image}
            alt={college.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized={college.image.startsWith('http')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
            <p className="text-xs font-semibold text-white/80 uppercase">Rank #{college.rank}</p>
            <h3 className="text-lg font-bold text-white text-balance">{college.name}</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <MapPin className="h-4 w-4 text-accent" />
            {college.location}, {college.state}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-foreground/60">Annual Fees</p>
              <p className="flex items-center gap-1 font-semibold">
                <DollarSign className="h-3 w-3 text-accent" />
                ₹{(college.fees / 100000).toFixed(1)}L
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/60">Rating</p>
              <p className="flex items-center gap-1 font-semibold">
                <Star className="h-3 w-3 text-accent fill-accent" />
                {college.rating}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/60">Placement %</p>
              <p className="flex items-center gap-1 font-semibold">
                <TrendingUp className="h-3 w-3 text-accent" />
                {college.placementPercentage}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground/60">Avg Package</p>
              <p className="font-semibold">₹{(college.averagePackage / 100000).toFixed(1)}L</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {college.coursesOffered.slice(0, 2).map(course => (
              <span key={course} className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">
                {course}
              </span>
            ))}
            {college.coursesOffered.length > 2 && (
              <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">
                +{college.coursesOffered.length - 2}
              </span>
            )}
          </div>

          <Button className="w-full bg-primary hover:bg-secondary text-white">
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  );
}
