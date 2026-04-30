'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/user-context';
import { mockColleges } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { value: 'admissions', label: 'Admissions & Entrance Exams' },
  { value: 'placement', label: 'Placements & Career' },
  { value: 'fees', label: 'Fees & Scholarships' },
  { value: 'campus-life', label: 'Campus Life & Facilities' },
  { value: 'courses', label: 'Courses & Curriculum' },
  { value: 'general', label: 'General' },
];

export function AskQuestionForm() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    collegeId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Mock submit - in production, save to database
    setTimeout(() => {
      alert('Question posted successfully!');
      router.push('/questions');
      setIsLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg p-12 border border-border text-center">
        <AlertCircle className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Please log in</h2>
        <p className="text-foreground/60 mb-6">You need to be logged in to ask a question</p>
        <Button asChild className="bg-primary hover:bg-secondary text-white">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 border border-border">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
            Question Title *
          </label>
          <Input
            placeholder="What would you like to know?"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={isLoading}
            required
            maxLength={100}
            className="text-lg font-semibold"
          />
          <p className="text-xs text-foreground/50 mt-1">{formData.title.length}/100 characters</p>
        </div>

        {/* Content */}
        <div>
          <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
            Details *
          </label>
          <textarea
            placeholder="Provide more context and details about your question..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            disabled={isLoading}
            required
            rows={6}
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-foreground placeholder-foreground/40 disabled:opacity-50"
          />
          <p className="text-xs text-foreground/50 mt-1">Minimum 20 characters required</p>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            disabled={isLoading}
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-foreground disabled:opacity-50"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* College Selection (Optional) */}
        <div>
          <label className="text-xs font-semibold text-foreground/70 uppercase mb-2 block">
            Related College (Optional)
          </label>
          <select
            value={formData.collegeId}
            onChange={(e) => setFormData({ ...formData, collegeId: e.target.value })}
            disabled={isLoading}
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-foreground disabled:opacity-50"
          >
            <option value="">Select a college (optional)</option>
            {mockColleges.map(college => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">Tips for a good question:</p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific and detailed</li>
            <li>• Include relevant information (course, college, etc.)</li>
            <li>• Use a clear, descriptive title</li>
            <li>• Avoid duplicate questions</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-secondary text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              'Post Question'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => router.back()}
            className="flex-1 border-primary text-primary hover:bg-primary/5"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
