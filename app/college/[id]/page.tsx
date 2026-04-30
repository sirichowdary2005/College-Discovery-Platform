import { Navbar } from '@/components/navbar';
import { mockColleges } from '@/lib/mock-colleges';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, DollarSign, Users, TrendingUp, Briefcase, Award, Calendar, Building2, BookOpen, Zap, Globe, Heart, Code } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return mockColleges.map(college => ({
    id: String(college.id),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const college = mockColleges.find(c => c.id === resolvedParams.id);
  return {
    title: `${college?.name} - CollegeFinder`,
    description: `Explore detailed information about ${college?.name}, including placement rates, fees, and courses.`,
  };
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const college = mockColleges.find(c => c.id === resolvedParams.id);

  if (!college) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
          <Image
            src={college.image}
            alt={college.name}
            fill
            className="object-cover"
            unoptimized={college.image.startsWith('http')}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-white/90 uppercase mb-3 bg-primary/60 w-fit px-3 py-1 rounded-full">Rank #{college.rank}</p>
              <h1 className="text-5xl md:text-6xl font-bold text-white text-balance drop-shadow-lg">{college.name}</h1>
            </div>
            <Link href="/" className="text-white/90 hover:text-white transition-colors w-fit">← Back to Colleges</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card className="p-6 border-2 border-primary/20">
              <h2 className="text-2xl font-bold mb-6">Quick Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Location</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4 text-accent" />
                    {college.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Annual Fees</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <DollarSign className="h-4 w-4 text-accent" />
                    ₹{(college.fees / 100000).toFixed(1)}L
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Rating</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    {college.rating}/5
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Placement %</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    {college.placementPercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Avg Package</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Briefcase className="h-4 w-4 text-accent" />
                    ₹{(college.averagePackage / 100000).toFixed(1)}L
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Reviews</p>
                  <p className="flex items-center gap-2 font-semibold">
                    <Award className="h-4 w-4 text-accent" />
                    {college.reviews.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">{college.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/60">Founded</p>
                    <p className="font-semibold">{college.founded}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground/60">Students</p>
                    <p className="font-semibold">{college.studentCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Courses Offered */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
              <div className="flex flex-wrap gap-3">
                {college.coursesOffered.map(course => (
                  <span key={course} className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground font-medium rounded-lg border border-primary/30">
                    {course}
                  </span>
                ))}
              </div>
            </Card>

            {/* Placement Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Placement Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Placement Rate</span>
                    <span className="text-lg font-bold text-accent">{college.placementPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${college.placementPercentage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Average Package</span>
                    <span className="text-lg font-bold text-accent">₹{(college.averagePackage / 100000).toFixed(1)}L</span>
                  </div>
                  <p className="text-sm text-foreground/60">Per annum</p>
                </div>
              </div>
            </Card>

            {/* Campus Facilities */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Campus Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Building2, label: "Modern Library" },
                  { icon: Code, label: "IT Labs" },
                  { icon: Zap, label: "Smart Classrooms" },
                  { icon: Globe, label: "WiFi Campus" },
                  { icon: Heart, label: "Cafeteria" },
                  { icon: BookOpen, label: "Sports Complex" }
                ].map((facility, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                    <facility.icon className="h-6 w-6 text-accent" />
                    <p className="text-sm font-medium text-center">{facility.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Student Testimonials */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Student Testimonials</h2>
              <div className="space-y-4">
                {[
                  { name: "Rahul Sharma", course: "CSE, 2023", text: "Amazing experience! The faculty is world-class and placements are excellent. Landed a job at Google!" },
                  { name: "Priya Verma", course: "ECE, 2023", text: "The campus life is vibrant. Great infrastructure, supportive faculty, and amazing peer group. Highly recommend!" },
                  { name: "Arjun Nair", course: "Mechanical, 2022", text: "Best decision of my life. Great learning environment with industry exposure. Got placed in a startup!" }
                ].map((testimonial, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted border-l-4 border-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-foreground/60">{testimonial.course}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 italic">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alumni Achievements */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Notable Alumni</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Dr. Ravi Kumar", achievement: "VP Engineering at Microsoft" },
                  { name: "Meera Patel", achievement: "Founder, AI Solutions Ltd" },
                  { name: "Vikram Singh", achievement: "Senior Analyst at Goldman Sachs" },
                  { name: "Anjali Desai", achievement: "Product Manager at Apple" }
                ].map((alumni, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30">
                    <p className="font-semibold text-foreground">{alumni.name}</p>
                    <p className="text-sm text-foreground/70">{alumni.achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Recruiters */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro", "Accenture", "Deloitte"].map((company, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted border border-primary/20 text-center">
                    <p className="font-semibold text-sm">{company}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Acceptance Rate */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-2">Acceptance Rate</p>
                <p className="text-4xl font-bold text-accent mb-2">{college.acceptanceRate}%</p>
                <p className="text-sm text-foreground/70">Competitive Selection</p>
              </div>
            </Card>

            {/* Comparison */}
            <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground h-12">
              <Link href={`/compare?college=${college.id}`}>
                Compare with Other Colleges
              </Link>
            </Button>

            {/* Predictor */}
            <Button asChild variant="outline" className="w-full h-12">
              <Link href="/predictor">
                Check Admission Chances
              </Link>
            </Button>

            {/* Contact */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Get More Info</h3>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>Want to know more about admissions, scholarships, or campus life?</p>
                <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  Contact College
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
