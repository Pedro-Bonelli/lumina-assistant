import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertActivitySchema, insertSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Classes routes
  app.get("/api/classes/teacher/:teacherId", async (req, res) => {
    try {
      const classes = await storage.getClassesByTeacher(req.params.teacherId);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getAllClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Activities routes
  app.get("/api/activities/teacher/:teacherId", async (req, res) => {
    try {
      const activities = await storage.getActivitiesByTeacher(req.params.teacherId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const result = insertActivitySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid activity data", errors: result.error.errors });
      }

      const activity = await storage.createActivity(result.data);
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.updateActivity(req.params.id, req.body);
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Submissions routes
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/submissions/activity/:activityId", async (req, res) => {
    try {
      const submissions = await storage.getSubmissionsByActivity(req.params.activityId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/submissions/student/:studentId", async (req, res) => {
    try {
      const submissions = await storage.getSubmissionsByStudent(req.params.studentId);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/submissions", async (req, res) => {
    try {
      const result = insertSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid submission data", errors: result.error.errors });
      }

      const submission = await storage.createSubmission(result.data);
      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/submissions/:id", async (req, res) => {
    try {
      const submission = await storage.updateSubmission(req.params.id, req.body);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Enrollments routes
  app.get("/api/enrollments/student/:studentId", async (req, res) => {
    try {
      const enrollments = await storage.getEnrollmentsByStudent(req.params.studentId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
