import { pgTable, serial, text, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").default(0).notNull(),
  status: text("status").default("in_progress").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at"),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  enrollmentId: integer("enrollment_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  timeSpent: integer("time_spent").default(0).notNull(),
  completedAt: timestamp("completed_at"),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  certificateNumber: text("certificate_number").notNull().unique(),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("completed").notNull(),
  paymentMethod: text("payment_method").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  courseId: integer("course_id").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ id: true, enrolledAt: true });
export const insertCertificateSchema = createInsertSchema(certificates).omit({ id: true, issuedAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
