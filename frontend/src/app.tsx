import React, { useEffect, useState } from 'react';
import './App.css';

// Definerer strukturen for erfaringer og prosjekter
type ExperienceType = { name: string };
type ProjectType = { id: number; title: string; description: string; createdAt: string; category: string };

// Header-komponent
function Header({ student }: { student: { name: string; degree: string; points: number } }) {
  return (
    <div>
      <h1>{student.name}</h1>
      <p>
        {student.degree} {student.points} studiepoeng
      </p>
    </div>
  );
}

// Fleksibel Experience-komponent som tar inn children
function Experience({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Experiences-komponent som bruker map for å rendre erfaringer
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

// Contact-komponent med skjema for å sende melding
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

// Fleksibel Project-komponent som tar inn children
function Project({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Projects-komponent som bruker map for å rendre prosjekter
function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Project key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Opprettet:</strong> {project.createdAt}</p>
            <p><strong>Kategori:</strong> {project.category}</p>
          </Project>
        ))
      ) : (
        <p>Ingen prosjekter</p>
      )}
    </>
  );
}

// App-komponent
function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hent prosjekter fra backend
    fetch('http://localhost:5000/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const student = {
    name: 'Halgeir Geirson',
    degree: 'Bachelor IT',
    points: 180,
    email: 'student@hiof.no',
    experiences: [
      { name: 'Figma UI for customer X' },
      { name: 'Website for customer Y' },
    ],
  };

  return (
    <main>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      {loading ? (
        <p>Laster prosjekter...</p>
      ) : error ? (
        <p>Feil ved lasting av prosjekter: {error}</p>
      ) : (
        <Projects projects={projects} />
      )}
      <Contact student={student} />
    </main>
  );
}

export default App;
