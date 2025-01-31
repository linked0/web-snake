// src/App.tsx
import React, { useEffect, useState } from "react";
import CourseList from "./components/CourseList";

export interface Course {
  id: number;
  title: string;
  chapters?: string[];
  progress: number;
  total: number;
}

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses");
        if (!res.ok) {
          throw new Error(`Server Error: ${res.status}`);
        }
        const data: Course[] = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Back-end Developer Career Path</h1>
      </header>
      {loading ? (
        <p style={styles.loading}>Loading courses...</p>
      ) : (
        <CourseList courses={courses} />
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
  },
  loading: {
    fontSize: "1.2rem",
  },
};

export default App;
