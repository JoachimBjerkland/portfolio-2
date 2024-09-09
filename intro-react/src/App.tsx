function App() {
  console.log('Console log i App');

  const name = "Alfred";
  const age = 20;

  return (
    <main>
      <h1>Velkommen til Streaky, {name}. Du er {age + 1} år.</h1>
    </main>
  );
}

export default App;