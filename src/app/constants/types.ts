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
  languages: any[];
  experience: any[];
  education: any[];
  courses: any[];
  projects: any[];
}
