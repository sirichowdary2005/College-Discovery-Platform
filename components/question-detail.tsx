'use client';

import { Question } from '@/lib/mock-questions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/lib/user-context';
import Link from 'next/link';
import { ThumbsUp, Eye, MessageSquare, Calendar, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const CATEGORY_LABELS: Record<string, string> = {
  admissions: 'Admissions',
  placement: 'Placement',
  fees: 'Fees',
  'campus-life': 'Campus Life',
  courses: 'Courses',
  general: 'General',
};

export function QuestionDetail({ question }: { question: Question }) {
  const { user } = useUser();
  const [answerContent, setAnswerContent] = useState('');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSubmitAnswer = () => {
    if (!user) {
      alert('Please login to answer questions');
      return;
    }
    if (!answerContent.trim()) {
      alert('Please enter your answer');
      return;
    }
    // Mock submit
    alert('Answer submitted successfully!');
    setAnswerContent('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="bg-white rounded-lg p-8 border border-border mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
              {CATEGORY_LABELS[question.category]}
            </span>
            <h1 className="text-4xl font-bold text-foreground mb-4">{question.title}</h1>
          </div>
        </div>

        <p className="text-foreground/70 text-lg mb-6">{question.content}</p>

        {question.collegeName && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-foreground/70 mb-1">Related College:</p>
            <Link href={`/college/${question.collegeId}`} className="text-primary font-semibold hover:underline">
              {question.collegeName}
            </Link>
          </div>
        )}

        {/* Question Stats */}
        <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-foreground/60">
            <ThumbsUp className="h-4 w-4" />
            <span>{question.upvotes} upvotes</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/60">
            <Eye className="h-4 w-4" />
            <span>{question.views} views</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/60">
            <Calendar className="h-4 w-4" />
            <span>Asked {formatDate(question.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/60">
            <User className="h-4 w-4" />
            <span>by {question.userName}</span>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          {question.answers.length} Answers
        </h2>

        <div className="space-y-4">
          {question.answers.map(answer => (
            <div key={answer.id} className="bg-white rounded-lg p-6 border border-border">
              {answer.isAccepted && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Accepted Answer</span>
                </div>
              )}

              <p className="text-foreground mb-4">{answer.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{answer.userName}</span>
                    <span>•</span>
                    <span>{formatDate(answer.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded hover:bg-primary/10 text-primary transition-colors text-sm font-medium">
                    <ThumbsUp className="h-4 w-4" />
                    {answer.upvotes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="bg-white rounded-lg p-8 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Answer</h2>

        {!user && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200 mb-6">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-2">Please login to answer</p>
              <Link href="/login" className="text-sm text-blue-700 hover:underline font-medium">
                Sign in to your account →
              </Link>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
              Your Answer
            </label>
            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              disabled={!user}
              placeholder={user ? 'Share your knowledge and experience...' : 'Login to answer questions'}
              rows={6}
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-foreground placeholder-foreground/40 disabled:opacity-50"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmitAnswer}
              disabled={!user}
              className="bg-primary hover:bg-secondary text-white"
            >
              Post Your Answer
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
