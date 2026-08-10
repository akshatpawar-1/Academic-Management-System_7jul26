# Academic Management System

A full-stack Academic Management System built using React, Express.js, Node.js, MySQL, and Session-Based Authentication.

This project is being developed as part of my JavaScript/MERN Full Stack learning journey with the goal of building industry-standard portfolio projects.

---

# Screenshots

Screenshots will be added after Version 1.0.

---

# Features

* Session-Based Authentication
* Role-Based Authorization
* Password Hashing using bcrypt
* Student Email Verification
* Verification Email using Nodemailer & Gmail SMTP
* One-Time Email Verification Tokens
* Centralized Form Validation
* Student Management
* Semester-wise Marks Management
* Enhanced Semester-wise Student Dashboard
* Grade & Percentage Calculation
* Student Profile Management
* Student Photo Upload & Display
* Academic Reports
* PDF Report Card Generation
* React PDF.js Report Preview
* PDF Zoom Controls
* PDF Download
* Search & Filters
* Reusable Footer & Developer Contact Links
* Responsive User Interface

---

# Tech Stack

## Frontend

* React
* HTML
* CSS
* JavaScript
* React PDF (PDF.js)
* jsPDF
* React Router DOM
* Axios
* React Toastify
* React Icons

## Backend

* Node.js
* Express.js
* Express Session
* bcrypt
* Nodemailer
* Multer
* Crypto

## Database

* MySQL

---

# Authentication

This project uses **Express Session Authentication** instead of JWT.

### Student Email Verification

When an administrator creates a student account:

1. The student's password is securely hashed using bcrypt.
2. A secure verification token is generated using Node.js Crypto.
3. The student is created with `email_verified = false`.
4. A verification email is sent using Nodemailer and Gmail SMTP.
5. The student must click the verification link.
6. The email is marked as verified.
7. The verification token is removed after successful verification.
8. The student can then log in.

Verification links are **one-time use**.

Students cannot log in until their email has been verified.

---

# Modules

## Student Module

* Add Student
* Edit Student
* Delete Student
* View Students
* Upload Student Photo
* Student Profile
* Search Students
* Student Email Verification

## Marks Module

* Add Marks
* Update Marks
* Delete Marks
* Semester-wise Marks
* Grade Calculation
* Percentage Calculation
* Search Marks

## Dashboard Module

* Admin Dashboard
* Student Dashboard
* Semester-wise Academic Summary
* Recent Student & Marks Overview
* Grade Display
* Percentage Display
* Subject-wise Marks

## Reports Module

* Admin Report Generation
* Student Report Generation
* React PDF.js Report Preview
* PDF Zoom Controls
* PDF Report Download

## Admin Module

* Admin CRUD
* Search Admins

---

# Authorization Hierarchy

* **Super Admin** → Full System Access
* **Admin** → Student & Marks Management
* **Student** → Personal Profile, Academic Dashboard & Reports

---

# Design Principles

This project is being developed with a focus on:

* Clean Code
* Modular Architecture
* Reusable Components
* Separation of Concerns
* Maintainable Folder Structure
* Secure Authentication
* Proper Role-Based Access Control

---

# Learning Objectives

* Build a production-style React application.
* Learn Express.js with MySQL.
* Understand Session-Based Authentication.
* Implement role-based authorization.
* Implement email verification using Nodemailer.
* Understand SMTP-based email delivery.
* Practice secure password hashing.
* Practice clean project architecture.
* Develop reusable React components.
* Build an industry-ready portfolio project.

---

# Author

**Akshat Pawar**
Computer Engineering Graduate
Mumbai, Maharashtra, India

---

# Status

**Currently Under Development**

## Completed

* Session-Based Authentication
* Role-Based Authorization
* Protected & Guest Routes
* Admin CRUD
* Student CRUD
* Student Email Verification
* Nodemailer Email Verification
* Gmail SMTP Configuration
* One-Time Verification Tokens
* Student Login Verification Check
* Marks CRUD
* Semester-wise Marks Management
* Student Login
* Student Password Hashing
* Student Profile Page
* Student Photo Upload & Display
* Student Profile Photo Management
* Enhanced Semester-wise Student Dashboard
* Admin Dashboard
* Grade Calculator Utility
* Percentage Calculator Utility
* Centralized Form Validation
* Reports Module
* Admin Reports Page
* Student Reports Page
* PDF Report Card Generation
* React PDF.js Report Preview
* PDF Zoom Controls
* PDF Report Download
* Search & Filters (Students, Marks & Admins)
* Reusable Footer & Developer Contact Links

## Upcoming

* Dashboard Analytics
* UI/UX Improvements
