import React from 'react';
import { ProjectType } from './types';

interface ProjectsProps {
  projects: ProjectType[];
  onRemoveProject: (index: number) => void;
}

function Projects({ projects, onRemoveProject }: ProjectsProps) {
  // Lag en funksjon for å beregne totalsummer per kategori
  const getCategoryTotals = () => {
    const categoryTotals: { [key: string]: number } = {};

    projects.forEach((project) => {
      if (categoryTotals[project.category]) {
        categoryTotals[project.category] += 1;
      } else {
        categoryTotals[project.category] = 1;
      }
    });

    return categoryTotals;
  };

  const categoryTotals = getCategoryTotals();

  return (
    <div>
      {projects.length === 0 ? (
        <p>Ingen prosjekter tilgjengelige.</p>
      ) : (
        <>
          {projects.map((project, index) => (
            <div key={index}>
              <h3>{project.title}</h3>
              <p>Dette er beskrivelsen for {project.title}.</p>
              <button onClick={() => onRemoveProject(index)}>Fjern prosjekt</button>
            </div>
          ))}

          {/* Vis totalsummer per kategori */}
          <div>
            <h3>Kategoritotaler:</h3>
            <ul>
              {Object.entries(categoryTotals).map(([category, total]) => (
                <li key={category}>
                  {category}: {total} prosjekter
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;
