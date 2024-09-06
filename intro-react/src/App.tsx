import React from 'react';
import Header from './Header';       // Anta at Header-komponenten er definert
import Experience from './Experience'; // Anta at Experience-komponenten er definert
import Contact from './Contact';     // Anta at Contact-komponenten er definert

// Experiences-komponenten definert utenfor App
function Experiences({ experienceOne, experienceTwo }: { experienceOne: string, experienceTwo: string }) {
  return (
    <div>
      <Experience description={experienceOne} />
      <Experience description={experienceTwo} />
    </div>
  );
}

// Hoved App-komponent
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
      <Contact email={email} />
    </div>
  );
}

export default App;
