// Storage utility — localStorage wrapper (swap with Supabase later)

// ── Cache-buster: if stored data version doesn't match, clear stale school data ──
const SCHOOL_DATA_VERSION = 'advent-v1';
if (localStorage.getItem('school_data_version') !== SCHOOL_DATA_VERSION) {
  ['admin_about', 'admin_contact', 'admin_news'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('school_data_version', SCHOOL_DATA_VERSION);
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  grade: string;
  subject: string;
  fileData: string;
  fileName: string;
  uploadDate: string;
}

export type UploadedFile = {
  key: string;
  label: string;
  fileName: string;
  mimeType: string;
  dataUrl: string;
};

export type SubjectMark = {
  subject: string;
  mark: number;
};

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender?: string;
  grade: string;
  year: string;
  studentNumber: string;
  guardianName: string;
  guardianRelationship?: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  locality: string;
  previousSchool: string;
  lastGradeCompleted?: string;
  medicalInfo?: string;
  applicationType: 'General' | 'Boarding';
  uploads: UploadedFile[];
  subjectMarks: SubjectMark[];
  averageMark: number;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  submittedDate: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  monThu: string;
  friday: string;
  weekend: string;
}

export interface AboutInfo {
  historyParagraphs: string[];
  principalName: string;
  principalTitle: string;
  principalMessage: string[];
}

function getItems<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

function getObject<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setObject<T>(key: string, obj: T): void {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function padNumber(num: number, length: number) {
  return num.toString().padStart(length, '0');
}

export function generateStudentNumber(year: string): string {
  const key = `admin_student_counter_${year}`;
  const current = Number(localStorage.getItem(key) || '0');
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `${year}-${padNumber(next, 6)}`;
}

export function calculateAverageMark(subjectMarks: SubjectMark[]): number {
  if (!subjectMarks || subjectMarks.length === 0) return 0;
  const total = subjectMarks.reduce((sum, s) => sum + (Number.isFinite(s.mark) ? s.mark : 0), 0);
  return Math.round((total / subjectMarks.length) * 10) / 10;
}

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Admissions 2026 Still Open',
    date: 'Now open',
    content:
      'Admissions for Grade 8–12 and matric rewrite are still open for 2026. Contact the school for assistance.',
    image: '',
  },
];
export const getNews = () => (getItems<NewsItem>('admin_news').length ? getItems<NewsItem>('admin_news') : defaultNews);
export const setNews = (items: NewsItem[]) => setItems('admin_news', items);

export const getDocuments = () => getItems<DocumentItem>('admin_documents');
export const setDocuments = (items: DocumentItem[]) => setItems('admin_documents', items);

export const getApplications = () => getItems<Application>('admin_applications');
export const setApplications = (items: Application[]) => setItems('admin_applications', items);

const defaultContact: ContactInfo = {
  address: '505 Maluti, Matatiele, 4740 (Eastern Cape)',
  phone: '072 300 0020 / 060 700 8052',
  email: 'adventhighschool90@gmail.com',
  monThu: '07:30 - 15:30',
  friday: '07:30 - 13:30',
  weekend: 'Closed',
};
export const getContact = () => getObject<ContactInfo>('admin_contact', defaultContact);
export const setContact = (info: ContactInfo) => setObject('admin_contact', info);

const defaultAbout: AboutInfo = {
  historyParagraphs: [
    'Advent Comprehensive High School is an independent co-educational high school located in Maluti, Matatiele, Eastern Cape.',
    'We offer Grade 8 to Grade 12 and matric rewrite, and we are committed to disciplined learning, respect, and growth.',
    'For admissions and school enquiries, families are encouraged to contact the school directly.',
  ],
  principalName: 'Principal',
  principalTitle: 'Advent Comprehensive High School',
  principalMessage: [
    'Welcome to Advent Comprehensive High School. We aim to build strong character, knowledge, and confidence in every learner.',
    'We invite parents and guardians to partner with us in supporting learners on their journey to success.',
  ],
};
export const getAbout = () => getObject<AboutInfo>('admin_about', defaultAbout);
export const setAbout = (info: AboutInfo) => setObject('admin_about', info);

export const isAuthenticated = () => localStorage.getItem('admin_auth') === 'true';
export const login = (password: string): boolean => {
  if (password === 'admin2026') {
    localStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
};
export const logout = () => localStorage.removeItem('admin_auth');
