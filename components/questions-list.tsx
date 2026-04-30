'use client';

import { useState, useMemo } from 'react';
import { mockQuestions, Question } from '@/lib/mock-questions';
import Link from 'next/link';
import { MessageSquare, Eye, ThumbsUp, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CATEGORY_LABELS: Record<string, string> = {
  admissions: 'Admissions',
  placement: 'Placement',
  fees: 'Fees',
  'campus-life': 'Campus Life',
  courses: 'Courses',
  general: 'General',
};

const CATEGORY_COLORS: Record<string, string> = {
  admissions: 'bg-blue-100 text-blue-700',
  placement: 'bg-green-100 text-green-700',
  fees: 'bg-purple-100 text-purple-700',
  'campus-life': 'bg-orange-100 text-orange-700',
  courses: 'bg-pink-100 text-pink-700',
  general: 'bg-gray-100 text-gray-700',
};

export function QuestionsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'views'>('newest');

  const filteredQuestions = useMemo(() => {
    let results = mockQuestions.filter(q => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'newest') {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'popular') {
      results.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'views') {
      results.sort((a, b) => b.views - a.views);
    }

    return results;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Search
            </label>
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-border">
            <AlertCircle className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">No questions found</p>
            <p className="text-sm text-foreground/60">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionCard({ question }: { question: Question }) {
  const categoryColor = CATEGORY_COLORS[question.category];
  const categoryLabel = CATEGORY_LABELS[question.category];
  const hasAcceptedAnswer = question.answers.some(a => a.isAccepted);

  return (
    <Link href={`/questions/${question.id}`}>
      <div className="bg-white rounded-lg p-6 border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Stats */}
          <div className="flex flex-col gap-3 min-w-fit">
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground/60">Answers</p>
              <p className="text-2xl font-bold text-primary">{question.answers.length}</p>
            </div>
            {hasAcceptedAnswer && (
              <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                Solved
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                {question.title}
              </h3>
            </div>

            <p className="text-foreground/60 text-sm mb-3 line-clamp-2">
              {question.content}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                {categoryLabel}
              </span>

              {question.collegeName && (
                <span className="text-xs text-foreground/60 bg-primary/10 px-2 py-1 rounded">
                  {question.collegeName}
                </span>
              )}

              <span className="text-xs text-foreground/60">by {question.userName}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 text-xs text-foreground/60">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{question.upvotes} votes</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{question.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{question.answers.length} answers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
