import { useState } from "react";

// Definere Project-typen
type Project = {
  title: string;
};

// Header-komponent
function Header({ student, degree, points }: { student: string; degree: string; points: number }) {
  return (
    <div>
      <h1>{student}</h1>
      <p>
        {degree} {points} studiepoeng
      </p>
    </div>
  );
}

// Experience-komponent
function Experience({ description }: { description: string }) {
  return <p>{description}</p>;
}

// Experiences-komponent
function Experiences({ experienceOne, experienceTwo }: { experienceOne: string; experienceTwo: string }) {
  return (
    <div>
      <Experience description={experienceOne} />
      <Experience description={experienceTwo} />
    </div>
  );
}

// Contact-komponent
function Contact({ email }: { email: string }) {
  return <p>{email}</p>;
}

// Project-komponent
function Project({ project }: { project: Project }) {
  return <p>{project.title}</p>;
}

// Projects-komponent
function Projects() {
  const projects: Project[] = [
    { title: "Prosjekt 1: Webdesign for Firma A" },
    { title: "Prosjekt 2: Mobilapp for Firma B" },
    { title: "Prosjekt 3: API for Firma C" },
    { title: "Prosjekt 4: E-commerce nettsted for Firma D" },
  ];

  return (
    <>
      {projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </>
  );
}

// App-komponent
function App() {
  const student = 'Halgeir Geirson';
  const degree = 'Bachelor IT';
  const points = 180;
  const experienceOne = 'Figma UI for customer X';
  const experienceTwo = 'Website for customer Y';
  const email = 'student@hiof.no';

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experienceOne={experienceOne} experienceTwo={experienceTwo} />
      <Projects />
      <Contact email={email} />
    </div>
  );
}

export default App;
