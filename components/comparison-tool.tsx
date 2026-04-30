'use client';

import { useState, useMemo } from 'react';
import { mockColleges, College } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, DollarSign, TrendingUp, Briefcase, Users, Award, X, Search, Plus } from 'lucide-react';

export function ComparisonTool() {
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const states = useMemo(() => {
    return Array.from(new Set(mockColleges.map(c => c.state))).sort();
  }, []);

  const filteredColleges = useMemo(() => {
    return mockColleges.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedState || c.state === selectedState) &&
      !selectedColleges.includes(c.id)
    );
  }, [searchQuery, selectedState, selectedColleges]);

  const colleges = selectedColleges.map(id => mockColleges.find(c => c.id === id)).filter(Boolean) as College[];

  const addCollege = (collegeId: string) => {
    if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, collegeId]);
    }
  };

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(id => id !== collegeId));
  };

  return (
    <div className="space-y-8">
      {/* Add College Section */}
      <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Search & Add Colleges</h3>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {selectedColleges.length}/3 Selected
            </span>
          </div>
          <p className="text-sm text-foreground/60">Compare up to 3 colleges side-by-side to make informed decisions</p>
        </div>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
                College Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search college by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
                Location
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {(searchQuery || selectedState) && filteredColleges.length > 0 && selectedColleges.length < 3 && (
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-foreground/60 uppercase mb-3">
                Available Colleges ({filteredColleges.length})
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                {filteredColleges.map(college => (
                  <button
                    key={college.id}
                    onClick={() => addCollege(college.id)}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all text-left bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{college.name}</p>
                        <p className="text-xs text-foreground/60">Rank #{college.rank}</p>
                      </div>
                      <Plus className="h-4 w-4 text-primary flex-shrink-0" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-foreground/60">Fees</p>
                        <p className="font-medium text-foreground">₹{(college.fees / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-foreground/60">Rating</p>
                        <p className="font-medium text-foreground">{college.rating}/5</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery && filteredColleges.length === 0 && selectedColleges.length < 3 && (
            <div className="text-center py-8 border-t border-border">
              <p className="text-sm text-foreground/60">No colleges found matching your search</p>
            </div>
          )}

          {selectedColleges.length === 3 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-primary">Maximum 3 colleges selected</p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {colleges.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-4 text-left font-semibold text-sm">Metric</th>
                    {colleges.map(college => (
                      <th key={college.id} className="px-4 py-4 text-center min-w-[240px]">
                        <div className="space-y-2">
                          <p className="font-bold text-sm">{college.name}</p>
                          <p className="text-xs text-white/80">Rank #{college.rank}</p>
                          <button
                            onClick={() => removeCollege(college.id)}
                            className="text-white/70 hover:text-white transition-colors mx-auto block"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Annual Fees', key: 'fees', icon: DollarSign, format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
                    { label: 'Rating', key: 'rating', icon: Star, format: (v: number) => `${v}/5` },
                    { label: 'Placement %', key: 'placementPercentage', icon: TrendingUp, format: (v: number) => `${v}%` },
                    { label: 'Avg Package', key: 'averagePackage', icon: Award, format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
                    { label: 'Students', key: 'studentCount', icon: Users, format: (v: number) => `${(v / 1000).toFixed(1)}K` },
                    { label: 'Reviews', key: 'reviews', icon: Star, format: (v: number) => v.toLocaleString() },
                    { label: 'Acceptance Rate', key: 'acceptanceRate', icon: Briefcase, format: (v: number) => `${v}%` },
                    { label: 'Founded', key: 'founded', icon: Award, format: (v: number) => v.toString() },
                  ].map((metric, idx) => (
                    <tr key={metric.key} className={`border-b border-border ${idx % 2 === 0 ? 'bg-white' : 'bg-primary/5'} hover:bg-primary/10 transition-colors`}>
                      <td className="px-4 py-3 font-semibold text-foreground text-sm flex items-center gap-2">
                        <metric.icon className="h-4 w-4 text-primary" />
                        {metric.label}
                      </td>
                      {colleges.map(college => (
                        <td key={college.id} className="px-4 py-3 text-center text-sm font-bold text-primary">
                          {metric.format((college as any)[metric.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Courses */}
                  <tr className="border-b border-border bg-white hover:bg-primary/10 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground text-sm flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Top Courses
                    </td>
                    {colleges.map(college => (
                      <td key={college.id} className="px-4 py-3 text-center text-sm">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {college.coursesOffered.slice(0, 2).map(course => (
                            <span key={course} className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                              {course}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {colleges.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center border border-border">
          <p className="text-lg font-semibold text-foreground mb-4">Start Comparing</p>
          <p className="text-sm text-foreground/60">Search and add colleges above to see a detailed side-by-side comparison</p>
        </div>
      )}

      {/* Comparison Insights */}
      {colleges.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
          <h3 className="font-bold text-lg text-foreground mb-6">Key Insights & Comparison</h3>
          <div className="space-y-4 text-sm">
            {(() => {
              const bestPlacement = colleges.reduce((a, b) => 
                a.placementPercentage > b.placementPercentage ? a : b
              );
              const bestRating = colleges.reduce((a, b) => 
                a.rating > b.rating ? a : b
              );
              const lowestFees = colleges.reduce((a, b) => 
                a.fees < b.fees ? a : b
              );
              const bestPackage = colleges.reduce((a, b) => 
                a.averagePackage > b.averagePackage ? a : b
              );

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase mb-1">Best Placement</p>
                        <p className="font-semibold text-foreground">{bestPlacement.name}</p>
                        <p className="text-sm text-foreground/70">{bestPlacement.placementPercentage}% placement rate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase mb-1">Highest Rated</p>
                        <p className="font-semibold text-foreground">{bestRating.name}</p>
                        <p className="text-sm text-foreground/70">{bestRating.rating}/5 rating</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase mb-1">Most Affordable</p>
                        <p className="font-semibold text-foreground">{lowestFees.name}</p>
                        <p className="text-sm text-foreground/70">₹{(lowestFees.fees / 100000).toFixed(1)}L annual fees</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase mb-1">Best Package</p>
                        <p className="font-semibold text-foreground">{bestPackage.name}</p>
                        <p className="text-sm text-foreground/70">₹{(bestPackage.averagePackage / 100000).toFixed(1)}L avg package</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
