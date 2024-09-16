import React, { useEffect, useState } from 'react';
import './App.css';

// Define types for experience and projects
type ExperienceType = { name: string };
type ProjectType = { id: number; title: string; description: string; createdAt: string; category: string };

// Header component
function Header({ student }: { student: { name: string; degree: string; points: number } }) {
  return (
    <div className="App-header">
      <h1>{student.name}</h1>
      <p>{student.degree} {student.points} studiepoeng</p>
    </div>
  );
}

// Flexible Experience component
function Experience({ children }: { children: React.ReactNode }) {
  return <div className="Experience">{children}</div>;
}

// Experiences component
function Experiences({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <div>
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <Experience key={index}>
            <p>{experience.name}</p>
          </Experience>
        ))
      ) : (
        <p>Ingen erfaringer</p>
      )}
    </div>
  );
}

// Contact component with form
function Contact({ student }: { student: { email: string } }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      alert('Vennligst fyll inn både navn og melding.');
      return;
    }
    setSubmittedData({ name, message });
    setName('');
    setMessage('');
  };

  return (
    <div>
      <p>Kontakt studenten på: {student.email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Navn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Melding:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send melding</button>
      </form>
      {submittedData && (
        <div>
          <h3>Innsendt data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Project component
function Project({ children }: { children: React.ReactNode }) {
  return <div className="Project-card">{children}</div>;
}

// Projects component
function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <div className="Projects-container">
      {projects.map((project) => (
        <Project key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Opprettet:</strong> {project.createdAt}</p>
          <p><strong>Kategori:</strong> {project.category}</p>
        </Project>
      ))}
    </div>
  );
}

// Main App component
function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const student = {
    name: 'Halgeir Geirson',
    degree: 'Bachelor IT',
    points: 180,
    email: 'student@hiof.no',
    experiences: [{ name: 'Figma UI for customer X' }, { name: 'Website for customer Y' }]
  };

  return (
    <main className="App-content">
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      {loading ? <p>Laster prosjekter...</p> : error ? <p>Feil: {error}</p> : <Projects projects={projects} />}
      <Contact student={student} />
    </main>
  );
}

export default App;
