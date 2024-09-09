// Definerer typen for prosjektet
type ProjectType = {
    title: string;
    description?: string; // Valgfritt felt for mer info om prosjektet
  };
  
  // Project-komponenten som viser tittel og eventuell beskrivelse
  function Project({ project }: { project: ProjectType }) {
    return (
      <>
        <h2>{project.title}</h2>
        {project.description && <p>{project.description}</p>}
      </>
    );
  }
  
  // Projects-komponenten som viser en liste av prosjekter
  export default function Projects() {
    const projects: ProjectType[] = [
      { title: "Prosjekt 1", description: "Dette er beskrivelsen av prosjekt 1" },
      { title: "Prosjekt 2", description: "Dette er beskrivelsen av prosjekt 2" },
      { title: "Prosjekt 3" },
      { title: "Prosjekt 4", description: "Dette er beskrivelsen av prosjekt 4" },
    ];
  
    return (
      <>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </>
    );
  }
  