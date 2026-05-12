# 📚 Library Management System

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![Maven](https://img.shields.io/badge/Maven-Build-red)
![REST API](https://img.shields.io/badge/API-REST-yellow)

A REST-based Library Management System built using Spring Boot that automates book issuing and return operations with proper validations and clean layered architecture.

---

# 📌 Problem Statement

Managing library books manually can create issues such as:
- Duplicate book issuing
- Difficulty tracking returns
- Poor member management
- Lack of availability tracking

This project solves these problems by providing a simple and efficient backend system for library operations.

---

# ❓ The 4 Why’s

## Why does this problem exist?

Many small libraries still use manual records or outdated systems that make tracking books and members difficult.

---

## Why is it important to solve?

A proper library management system improves:
- Book tracking
- Member handling
- Record maintenance
- Operational efficiency

---

## Why are existing solutions insufficient?

Existing systems are often:
- Expensive
- Too complex
- Hard to customize
- Difficult for beginners to understand

---

## Why is this solution better?

This project provides:
- Clean REST APIs
- Lightweight backend architecture
- Easy scalability
- Proper validations
- Simple implementation

---

# 💡 Project Approach

The project follows a clean layered Spring Boot architecture.

## High-Level Workflow

```text
Client / Postman
       ↓
Controller Layer
       ↓
Service Layer
       ↓
Repository Layer
       ↓
MySQL Database

library-management-system
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── library
│   │   │           └── management
│   │   │
│   │   │               ├── controller
│   │   │               ├── service
│   │   │               ├── repository
│   │   │               ├── entity
│   │   │               ├── dto
│   │   │               ├── exception
│   │   │               ├── config
│   │   │               └── util
│   │
│   │   └── resources
│   │
│   └── test
│
├── pom.xml
├── README.md
└── .gitignore

📦 Modules
📘 Book Management Module
Features
Add Book
View All Books
View Available Books
Search by Title
Search by Author
Components
Book Entity
BookRepository
BookService
BookController
APIs
Method	Endpoint	Description
POST	/books	Add new book
GET	/books	Get all books
GET	/books/available	Get available books
GET	/books/search/title	Search by title
GET	/books/search/author	Search by author
Database Table
BOOKS
- book_id
- title
- author
- availability
👤 Member Management Module
Features
Register Member
View Member Details
View Books Issued To Member
Components
Member Entity
MemberRepository
MemberService
MemberController
APIs
Method	Endpoint	Description
POST	/members	Register member
GET	/members/{id}	Get member details
GET	/members/{id}/books	Get issued books
Database Table
MEMBERS
- member_id
- name
- email
🔄 Book Issue Module
Features
Issue Book
Create Issue Record
Validate Book Availability
Validate Maximum 3 Books Rule
Components
IssueRecord Entity
IssueRepository
IssueService
IssueController
APIs
Method	Endpoint	Description
POST	/issues/issue	Issue book
Database Table
ISSUE_RECORDS
- issue_id
- book_id
- member_id
- issue_date
- return_date
Business Rules
Book must be available
Maximum limit = 3 books
Book becomes unavailable after issue
📥 Book Return Module
Features
Return Book
Update Return Date
Restore Availability
APIs
Method	Endpoint	Description
PUT	/issues/return/{issueId}	Return issued book
Business Rules
Only issued books can be returned
Cannot return already returned book
Returned books become available again
✨ Features & Functionalities

✔ Add New Books
✔ View All Books
✔ Search Books
✔ Register Members
✔ Issue Books
✔ Return Books
✔ Availability Tracking
✔ Business Rule Validations
✔ Global Exception Handling
✔ RESTful API Design

🛠️ Tech Stack
Backend
Java 17
Spring Boot
Spring Data JPA
Maven
Database
MySQL
API Testing
Postman
Utilities
Lombok
⚙️ Setup Instructions
Prerequisites
Java 17+
Maven
MySQL
VS Code / IntelliJ / Eclipse
🚀 Steps to Run Project
1. Clone Repository
git clone <repository-url>
2. Navigate to Project
cd library-management-system
3. Configure Database

Update application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
4. Build Project
mvn clean install
5. Run Application
mvn spring-boot:run
🔌 API Summary
Book APIs
Method	Endpoint
POST	/books
GET	/books
GET	/books/available
GET	/books/search/title
GET	/books/search/author
Member APIs
Method	Endpoint
POST	/members
GET	/members/{id}
GET	/members/{id}/books
Issue APIs
Method	Endpoint
POST	/issues/issue
PUT	/issues/return/{issueId}

👨‍💻 Team Division
MEMBER 1 → BOOK MANAGEMENT MODULE
Responsibilities
Add Book
View All Books
Search Books
Available Books
Files
BookController.java
BookService.java
BookRepository.java
Book.java
MEMBER 2 → MEMBER MANAGEMENT MODULE
Responsibilities
Register Member
View Member Details
View Issued Books
Files
MemberController.java
MemberService.java
MemberRepository.java
Member.java
MEMBER 3 → BOOK ISSUE MODULE
Responsibilities
Issue Book
Create Issue Records
Availability Validation
Max Book Limit Validation
Files
IssueController.java
IssueService.java
IssueRepository.java
IssueRecord.java
MEMBER 4 → BOOK RETURN MODULE
Responsibilities
Return Logic
Exception Handling
Availability Restore
Files
GlobalExceptionHandler.java
Exception Classes
Return Logic inside IssueService.java
🔥 Professional Architecture
Layered Architecture
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
✅ Business Rules
One book can only be issued to one member at a time
Maximum 3 books per member
Only available books can be issued
Returned books become available again
Duplicate returns are not allowed
📸 Screenshots / Demo

Add Postman screenshots and project demo images here.

🔮 Future Scope
JWT Authentication
Role-Based Access Control
Fine Calculation System
Reservation System
Swagger Documentation
Docker Deployment
Redis Caching
Analytics Dashboard
🚀 Final Outcome

This project demonstrates:

Clean backend architecture
Real-world REST API development
Business workflow implementation
Team collaboration
Professional Spring Boot practices