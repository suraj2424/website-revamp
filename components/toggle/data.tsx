import { 
  BookOpen, 
  BrainCircuit, 
  LineChart, 
  Target, 
  Rocket, 
  Mic2, 
  Users2, 
  HeartHandshake 
} from 'lucide-react';

export type FeatureItem = {
  icon: React.ElementType; // Changed from string to Component type
  title: string;
  desc: string;
};

export const schoolFeatures: FeatureItem[] = [
  { icon: BookOpen, title: 'Academic Excellence', desc: 'Scientifically build your academic score' },
  { icon: BrainCircuit, title: 'Study Strategies', desc: 'Learn proven techniques for better retention' },
  { icon: LineChart, title: 'Progress Tracking', desc: 'Data-driven insights on your growth' },
  { icon: Target, title: 'Goal Setting', desc: 'Clear milestones for every semester' },
];

export const outsideFeatures: FeatureItem[] = [
  { icon: Rocket, title: 'Career Discovery', desc: 'Find your passion through workshops' },
  { icon: Mic2, title: 'Industry Exposure', desc: 'Podcast shoots with experts' },
  { icon: Users2, title: '1:1 Mentorship', desc: 'Guidance from top professionals' },
  { icon: HeartHandshake, title: 'Personal Growth', desc: 'Build resilience and empathy' },
];