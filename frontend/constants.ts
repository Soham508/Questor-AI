import { Search, Shield, Zap, Target, FileText, Lock, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Search,
    title: "Intelligent Research",
    description: "AI-powered deep research across multiple sources to uncover comprehensive insights",
  },
  {
    icon: Shield,
    title: "Fact Verification",
    description: "Real-time fact-checking with source citations and credibility analysis",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get researched insights in seconds, not hours",
  },
  {
    icon: Target,
    title: "Accurate & Reliable",
    description: "Advanced algorithms ensure accuracy and reduce misinformation",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Comprehensive analysis with evidence-backed conclusions",
  },
  {
    icon: Lock,
    title: "Source Transparency",
    description: "Every claim traced back to verified sources",
  },
];