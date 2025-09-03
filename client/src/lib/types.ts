export interface StudyTip {
  id: string;
  title: string;
  description: string;
  subject: string;
  icon: string;
}

export interface DashboardStats {
  totalStudents: number;
  pendingCorrections: number;
  thisMonth: number;
  averageGrade: number;
}

export interface ClassWithStats {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  pendingCount: number;
  averageGrade?: number;
}

export interface ActivityWithDetails {
  id: string;
  title: string;
  className: string;
  studentCount: number;
  submittedDate: string;
  status: 'processing' | 'ready' | 'scheduled' | 'completed';
}

export interface InstitutionStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageGrade: number;
}

export interface SubjectGrade {
  subject: string;
  grade: number;
}

export interface ClassReportData {
  name: string;
  teacher: string;
  studentCount: number;
  average: number;
  activitiesCount: number;
  status: 'excellent' | 'good' | 'attention' | 'poor';
}
