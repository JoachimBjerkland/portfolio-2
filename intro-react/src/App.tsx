import { useState } from "react";
import Projects from "./Projects";
import { ExperienceType, ProjectType } from "./types";

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
      {experiences.length === 0 ? (
        <p>Ingen erfaringer tilgjengelige.</p>
      ) : (
        experiences.map((experience, index) => (
          <Experience key={index}>
            <p>{experience.name}</p>
          </Experience>
        ))
      )}
    </div>
  );
}

// Contact-komponent med knapp som viser e-post i en alert og skjema for innsendelse
function Contact({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null);

  const handleClick = () => {
    alert(`Studentens e-post: ${email}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Vennligst fyll inn både navn og melding.");
      return;
    }

    setSubmittedData({ name, message });

    setName("");
    setMessage("");
  };

  return (
    <div>
      <p>Kontakt studenten på: {email}</p>
      <button onClick={handleClick}>Vis e-post</button>
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

// Ny CreateProject-komponent for å legge til prosjekter
function CreateProject({ onAddProject }: { onAddProject: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Vennligst skriv inn en prosjekttittel.");
      return;
    }

    onAddProject(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="project-title">Prosjekttittel:</label>
        <input
          type="text"
          id="project-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <button type="submit">Legg til prosjekt</button>
    </form>
  );
}

// App-komponent
function App() {
  const [projects, setProjects] = useState<ProjectType[]>([
    { title: "Prosjekt 1: Webdesign for Firma A", category: "Webdesign" },
    { title: "Prosjekt 2: Mobilapp for Firma B", category: "Mobilapp" },
    { title: "Prosjekt 3: API for Firma C", category: "API" },
    { title: "Prosjekt 4: E-commerce nettsted for Firma D", category: "E-commerce" },
  ]);

  const student = {
    name: "Halgeir Geirson",
    degree: "Bachelor IT",
    points: 180,
    email: "student@hiof.no",
    experiences: [
      { name: "Figma UI for customer X" },
      { name: "Website for customer Y" },
    ],
  };

  const handleAddProject = (title: string) => {
    setProjects((prevProjects) => [...prevProjects, { title }]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, i) => i !== index)
    );
  };

  return (
    <main>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      <Projects projects={projects} onRemoveProject={handleRemoveProject} />
      <CreateProject onAddProject={handleAddProject} />
      <Contact email={student.email} />
    </main>
  );
}

export default App;
