// Domain types for portfolio
export interface PersonalInfo {
  name: string;
  role: string;
  yearsOfExperience: number;
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
