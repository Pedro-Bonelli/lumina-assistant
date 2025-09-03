import { type User, type InsertUser, type Class, type InsertClass, type Activity, type InsertActivity, type Submission, type InsertSubmission, type Enrollment, type InsertEnrollment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Classes
  getClass(id: string): Promise<Class | undefined>;
  getClassesByTeacher(teacherId: string): Promise<Class[]>;
  getAllClasses(): Promise<Class[]>;
  createClass(classData: InsertClass): Promise<Class>;
  
  // Activities
  getActivity(id: string): Promise<Activity | undefined>;
  getActivitiesByClass(classId: string): Promise<Activity[]>;
  getActivitiesByTeacher(teacherId: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | undefined>;
  
  // Submissions
  getSubmission(id: string): Promise<Submission | undefined>;
  getSubmissionsByActivity(activityId: string): Promise<Submission[]>;
  getSubmissionsByStudent(studentId: string): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmission(id: string, updates: Partial<Submission>): Promise<Submission | undefined>;
  
  // Enrollments
  getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]>;
  getEnrollmentsByClass(classId: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private classes: Map<string, Class> = new Map();
  private activities: Map<string, Activity> = new Map();
  private submissions: Map<string, Submission> = new Map();
  private enrollments: Map<string, Enrollment> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create sample users
    const teacher1: User = {
      id: "teacher-1",
      email: "maria.silva@escola.com",
      password: "password123",
      name: "Maria Silva",
      type: "teacher",
      createdAt: new Date(),
    };

    const student1: User = {
      id: "student-1",
      email: "joao.santos@aluno.com",
      password: "password123",
      name: "João Santos",
      type: "student",
      createdAt: new Date(),
    };

    const manager1: User = {
      id: "manager-1",
      email: "admin@escola.com",
      password: "password123",
      name: "Diretor Administrativo",
      type: "manager",
      createdAt: new Date(),
    };

    this.users.set(teacher1.id, teacher1);
    this.users.set(student1.id, student1);
    this.users.set(manager1.id, manager1);

    // Create sample classes
    const class1: Class = {
      id: "class-1",
      name: "9º Ano A",
      subject: "Matemática",
      teacherId: teacher1.id,
      year: "2024",
      studentCount: 32,
      createdAt: new Date(),
    };

    const class2: Class = {
      id: "class-2",
      name: "8º Ano B",
      subject: "Matemática",
      teacherId: teacher1.id,
      year: "2024",
      studentCount: 28,
      createdAt: new Date(),
    };

    this.classes.set(class1.id, class1);
    this.classes.set(class2.id, class2);

    // Create sample activities
    const activity1: Activity = {
      id: "activity-1",
      title: "Prova de Equações do 2º Grau",
      classId: class1.id,
      teacherId: teacher1.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxGrade: "10.0",
      criteria: "Metodologia correta, cálculos precisos, apresentação clara",
      status: "correcting",
      createdAt: new Date(),
    };

    this.activities.set(activity1.id, activity1);

    // Create sample enrollment
    const enrollment1: Enrollment = {
      id: "enrollment-1",
      studentId: student1.id,
      classId: class1.id,
      enrolledAt: new Date(),
    };

    this.enrollments.set(enrollment1.id, enrollment1);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Classes
  async getClass(id: string): Promise<Class | undefined> {
    return this.classes.get(id);
  }

  async getClassesByTeacher(teacherId: string): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(cls => cls.teacherId === teacherId);
  }

  async getAllClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async createClass(insertClass: InsertClass): Promise<Class> {
    const id = randomUUID();
    const classData: Class = { ...insertClass, id, studentCount: 0, createdAt: new Date() };
    this.classes.set(id, classData);
    return classData;
  }

  // Activities
  async getActivity(id: string): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async getActivitiesByClass(classId: string): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(activity => activity.classId === classId);
  }

  async getActivitiesByTeacher(teacherId: string): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(activity => activity.teacherId === teacherId);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { ...insertActivity, id, createdAt: new Date() };
    this.activities.set(id, activity);
    return activity;
  }

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | undefined> {
    const activity = this.activities.get(id);
    if (!activity) return undefined;
    
    const updatedActivity = { ...activity, ...updates };
    this.activities.set(id, updatedActivity);
    return updatedActivity;
  }

  // Submissions
  async getSubmission(id: string): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }

  async getSubmissionsByActivity(activityId: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(submission => submission.activityId === activityId);
  }

  async getSubmissionsByStudent(studentId: string): Promise<Submission[]> {
    return Array.from(this.submissions.values()).filter(submission => submission.studentId === studentId);
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = randomUUID();
    const submission: Submission = { ...insertSubmission, id, submittedAt: new Date() };
    this.submissions.set(id, submission);
    return submission;
  }

  async updateSubmission(id: string, updates: Partial<Submission>): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission = { ...submission, ...updates };
    this.submissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  // Enrollments
  async getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(enrollment => enrollment.studentId === studentId);
  }

  async getEnrollmentsByClass(classId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(enrollment => enrollment.classId === classId);
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = { ...insertEnrollment, id, enrolledAt: new Date() };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }
}

export const storage = new MemStorage();
