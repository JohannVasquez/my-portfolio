// Domain types for portfolio
export interface PersonalInfo {
  name: string;
  role: string;
  yearsOfExperience: number;
  technologies?: TechStack;
}

export interface TechStack {
  languages: Technology[];
  frameworks: Technology[];
  tools: Technology[];
  databases?: Technology[];
  other?: Technology[];
}

export interface Technology {
  name: string;
  icon: string; // Icon identifier from react-icons
  category?: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'github';
  url: string;
  ariaLabel: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
}
