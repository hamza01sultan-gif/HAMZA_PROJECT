export interface AboutData {
  name: string;
  grade: string;
  school: string;
  bio: string;
  profileImage: string;
}

export interface EducationData {
  title: string;
  description: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon: 'swimming' | 'football';
}

export interface VolunteerItem {
  id: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

export interface JourneyItem {
  id: string;
  semester: string;
  summary: string;
}

export interface PortfolioData {
  about: AboutData;
  education: EducationData;
  achievements: AchievementItem[];
  skills: SkillItem[];
  volunteer: VolunteerItem[];
  gallery: GalleryItem[];
  journey: JourneyItem[];
}
