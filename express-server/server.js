const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();
app.use(cors());
// API для организаций
app.get('/api/organizations', (req, res) => {
  const { search, tags, sports, minRating } = req.query;
  
  let filtered = [...mockOrganizations];
  
  if (search) {
    filtered = filtered.filter(org => 
      org.name.toLowerCase().includes(search.toString().toLowerCase()))
  }
  
  if (tags) {
    const tagsArray = tags.toString().split(',');
    filtered = filtered.filter(org => 
      tagsArray.every(tag => org.tags.includes(tag)))
  }
  
  if (sports) {
    const sportsArray = sports.toString().split(',');
    filtered = filtered.filter(org => 
      sportsArray.every(sport => org.sportTypes.includes(sport))
    )
  }
  
  if (minRating) {
    filtered = filtered.filter(org => org.rating >= Number(minRating))
  }
  
  res.json(filtered);
});

// API для тренеров
app.get('/api/trainers', (req, res) => {
  const { search, sports, minRating } = req.query;
  
  let filtered = [...mockTrainers];
  
  if (search) {
    filtered = filtered.filter(trainer => 
      trainer.name.toLowerCase().includes(search.toString().toLowerCase())
    )
  }
  
  if (sports) {
    const sportsArray = sports.toString().split(',');
    filtered = filtered.filter(trainer => 
      sportsArray.every(sport => trainer.sportTypes.includes(sport))
    )
  }
  
  if (minRating) {
    filtered = filtered.filter(trainer => trainer.rating >= Number(minRating))
  }
  
  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});