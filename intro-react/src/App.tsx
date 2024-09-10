function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Figma UI for customer X'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  export default function Experiences({ experienceOne, experienceTwo }) {
    return (
      <div>
        <Experience description={experienceOne} />
        <Experience description={experienceTwo} />
      </div>
    )
  }

export default App