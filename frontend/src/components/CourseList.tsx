// src/components/CourseList.tsx
import React from "react";
import { Course } from "../App";

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <section style={styles.courseList}>
      {courses.map((course) => (
        <div key={course.id} style={styles.courseCard}>
          <h2 style={styles.courseTitle}>{course.title}</h2>
          <p style={styles.progress}>
            Progress: {course.progress} / {course.total}
          </p>
          {course.chapters && (
            <ul style={styles.chapterList}>
              {course.chapters.map((ch, idx) => (
                <li key={idx}>{ch}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

const styles = {
  courseList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  courseCard: {
    backgroundColor: "#1e1e1e",
    padding: "16px",
    borderRadius: "8px",
    flex: "1 1 300px",
    maxWidth: "400px",
    boxSizing: "border-box" as const,
  },
  courseTitle: {
    margin: "0 0 8px 0",
    fontSize: "1.5rem",
  },
  progress: {
    margin: "0 0 8px 0",
    fontSize: "1rem",
    color: "#ccc",
  },
  chapterList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};

export default CourseList;
