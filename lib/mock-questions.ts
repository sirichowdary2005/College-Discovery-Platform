export interface Answer {
  id: string;
  userId: string;
  userName: string;
  content: string;
  upvotes: number;
  createdAt: string;
  isAccepted: boolean;
}

export interface Question {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  collegeId?: string;
  collegeName?: string;
  category: 'admissions' | 'placement' | 'fees' | 'campus-life' | 'courses' | 'general';
  views: number;
  upvotes: number;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export const mockQuestions: Question[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Aditya Sharma',
    title: 'What are the placement statistics for CSE at BITS Pilani?',
    content: 'I am interested in joining BITS Pilani for CSE. Can someone share the recent placement statistics and average package details?',
    collegeId: '2',
    collegeName: 'Birla Institute of Technology and Science',
    category: 'placement',
    views: 342,
    upvotes: 12,
    answers: [
      {
        id: 'a1',
        userId: 'user2',
        userName: 'Priya Verma',
        content: 'BITS Pilani has excellent placements. Last year 96% students were placed with an average package of 12+ LPA for CSE. Top companies like Google, Microsoft, Amazon visit the campus.',
        upvotes: 28,
        createdAt: '2024-10-15T10:30:00Z',
        isAccepted: true,
      },
      {
        id: 'a2',
        userId: 'user3',
        userName: 'Rahul Singh',
        content: 'I am a BITS alumni. The placement record is indeed very good. However, you need to maintain good CGPA to get selected by top companies.',
        upvotes: 15,
        createdAt: '2024-10-16T14:20:00Z',
        isAccepted: false,
      },
    ],
    createdAt: '2024-10-15T08:45:00Z',
    updatedAt: '2024-10-16T14:20:00Z',
  },
  {
    id: '2',
    userId: 'user4',
    userName: 'Neha Patel',
    title: 'Is the 3.5 LPA fees structure worth it for engineering?',
    content: 'Considering a private engineering college with 3.5L annual fees. Is it worth the investment compared to government colleges?',
    category: 'fees',
    views: 521,
    upvotes: 34,
    answers: [
      {
        id: 'a3',
        userId: 'user5',
        userName: 'Vikram Kumar',
        content: 'Depends on the college reputation and placements. Private colleges with 90%+ placements are worth it. Check their placement records before deciding.',
        upvotes: 45,
        createdAt: '2024-10-14T11:15:00Z',
        isAccepted: true,
      },
    ],
    createdAt: '2024-10-14T09:00:00Z',
    updatedAt: '2024-10-14T11:15:00Z',
  },
  {
    id: '3',
    userId: 'user6',
    userName: 'Arjun Nair',
    title: 'Campus life and hostel facilities at Amrita Vishwa Vidyapeetham',
    content: 'Planning to join Amrita. How is the campus life? Are the hostel facilities good? Any suggestions before joining?',
    collegeId: '1',
    collegeName: 'Amrita Vishwa Vidyapeetham',
    category: 'campus-life',
    views: 289,
    upvotes: 18,
    answers: [
      {
        id: 'a4',
        userId: 'user7',
        userName: 'Meera Singh',
        content: 'Amrita has a beautiful campus in Coimbatore. Hostel facilities are good with WiFi and modern amenities. The campus life is vibrant with many clubs and activities.',
        upvotes: 32,
        createdAt: '2024-10-13T16:45:00Z',
        isAccepted: true,
      },
    ],
    createdAt: '2024-10-13T13:20:00Z',
    updatedAt: '2024-10-13T16:45:00Z',
  },
  {
    id: '4',
    userId: 'user8',
    userName: 'Sneha Roy',
    title: 'Admission cutoff for BTech CSE - which colleges to target?',
    content: 'My JEE rank is 45,000. Which colleges should I target for BTech CSE? Please suggest tier 1 and tier 2 options.',
    category: 'admissions',
    views: 612,
    upvotes: 42,
    answers: [
      {
        id: 'a5',
        userId: 'user9',
        userName: 'Rohan Desai',
        content: 'With rank 45,000, you can get admission in many top private colleges. Check colleges like BITS Pilani, Amrita, VIT depending on your preferences and fees.',
        upvotes: 38,
        createdAt: '2024-10-12T10:00:00Z',
        isAccepted: true,
      },
    ],
    createdAt: '2024-10-12T08:15:00Z',
    updatedAt: '2024-10-12T10:00:00Z',
  },
];
