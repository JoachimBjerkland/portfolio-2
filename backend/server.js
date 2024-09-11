const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Aktiver CORS for alle ruter
app.use(express.json());

// Dummy prosjektdata
const projects = [
  { id: 1, title: 'Project Alpha', description: 'A groundbreaking project.', createdAt: '2024-01-01', category: 'Web Development' },
  { id: 2, title: 'Project Beta', description: 'An innovative project.', createdAt: '2024-02-01', category: 'Mobile Development' },
  { id: 3, title: 'Project Gamma', description: 'A revolutionary project.', createdAt: '2024-03-01', category: 'Data Science' },
  { id: 4, title: 'Project Delta', description: 'A cutting-edge project.', createdAt: '2024-04-01', category: 'Artificial Intelligence' },
  { id: 5, title: 'Project Epsilon', description: 'A transformative project.', createdAt: '2024-05-01', category: 'Cybersecurity' }
];

// Rute for prosjekter
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
