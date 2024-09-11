import { useState } from "react";

// Definerer strukturen for erfaringer og prosjekter
type ExperienceType = { name: string };
type ProjectType = { title: string };

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
      {experiences.map((experience, index) => (
        <Experience key={index}>
          <p>{experience.name}</p>
        </Experience>
      ))}
    </div>
  );
}

// Contact-komponent
function Contact({ student }: { student: { email: string } }) {
  return <p>{student.email}</p>;
}

// Fleksibel Project-komponent som tar inn children
function Project({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Projects-komponent som bruker map for å rendre prosjekter
function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <>
      {projects.map((project, index) => (
        <Project key={index}>
          <h3>{project.title}</h3>
          <p>Dette er beskrivelsen for {project.title}.</p>
        </Project>
      ))}
    </>
  );
}

// App-komponent
function App() {
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

  const projects = [
    { title: "Prosjekt 1: Webdesign for Firma A" },
    { title: "Prosjekt 2: Mobilapp for Firma B" },
    { title: "Prosjekt 3: API for Firma C" },
    { title: "Prosjekt 4: E-commerce nettsted for Firma D" },
  ];

  return (
    <main>
      <Header student={student} />
      <Experiences experiences={student.experiences} />
      <Projects projects={projects} />
      <Contact student={student} />
    </main>
  );
}

export default App;
