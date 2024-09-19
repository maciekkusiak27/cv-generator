export interface Language {
  language: string;
  level: string;
}

export interface Experience {
  companyName: string;
  position: string;
  fromDate: string;
  toDate?: string;
  currently: boolean;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Course {
  course: string;
  description: string;
}

export interface Project {
  project: string;
  description: string;
  link: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  website?: string;
  image?: File | null;
}

export interface FormData {
  contactInfo: ContactInfo;
  education: Education[];
  courses: Course[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  position: string;
}