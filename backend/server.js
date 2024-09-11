const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Aktiver CORS for alle ruter
app.use(express.json());

// Dummy prosjektdata
const projects = [
  { id: 1, title: 'backend', description: 'Backend project.', createdAt: '2024-01-01', category: 'frontend' },
  { id: 2, title: 'frontend', description: 'Frontend project.', createdAt: '2024-02-01', category: 'frontend' },
  { id: 3, title: 'hono', description: 'hono project.', createdAt: '2024-03-01', category: 'Hono server' },
  { id: 4, title: 'intro-react', description: 'intro-react project.', createdAt: '2024-04-01', category: 'React' },
];

// Rute for prosjekter
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
