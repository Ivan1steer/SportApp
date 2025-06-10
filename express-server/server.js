const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Загружаем данные из JSON файла
const organizationsDataPath = path.join(__dirname, 'data', 'organizations.json');
const mockOrganizations = JSON.parse(fs.readFileSync(organizationsDataPath, 'utf-8'));
const trainersDataPath = path.join(__dirname, 'data', 'trainers.json');
const mockTrainers = JSON.parse(fs.readFileSync(trainersDataPath, 'utf-8'));
const eventsDataPath = path.join(__dirname, 'data', 'events.json');
const mockEvents = JSON.parse(fs.readFileSync(eventsDataPath, 'utf-8'));
const usersDataPath = path.join(__dirname, 'data', 'users.json');
const mockUsers = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

// API для организаций с фильтрацией
app.get('/api/organizations', (req, res) => {
  const { search, tags, sports, minRating } = req.query;
  
  let filtered = [...mockOrganizations];
  
  // Фильтрация по поисковому запросу
  if (search) {
    filtered = filtered.filter(org => 
      org.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Фильтрация по тегам
  if (tags) {
    const tagsArray = tags.split(',');
    filtered = filtered.filter(org => 
      tagsArray.every(tag => org.tags.includes(tag))
    );
  }
  
  // Фильтрация по видам спорта
  if (sports) {
    const sportsArray = sports.split(',');
    filtered = filtered.filter(org => 
      sportsArray.every(sport => org.sportTypes.includes(sport))
    );
  }
  
  // Фильтрация по минимальному рейтингу
  if (minRating) {
    filtered = filtered.filter(org => org.rating >= Number(minRating));
  }
  
  res.json(filtered);
});

// API для получения всех уникальных тегов и видов спорта
app.get('/api/filters-data', (req, res) => {
  const tags = new Set();
  const sports = new Set();
  
  mockOrganizations.forEach(org => {
    org.tags.forEach(tag => tags.add(tag));
    org.sportTypes.forEach(sport => sports.add(sport));
  });

  res.json({
    allTags: Array.from(tags),
    allSportTypes: Array.from(sports)
  });
});

app.get('/api/trainers', (req, res) => {
  const { search, sports, minRating } = req.query;
  
  let filtered = [...mockTrainers];
  
  if (search) {
    filtered = filtered.filter(trainer => 
      trainer.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (sports) {
    const sportsArray = sports.split(',');
    filtered = filtered.filter(trainer => 
      sportsArray.every(sport => trainer.sportTypes.includes(sport))
    );
  }
  
  if (minRating) {
    filtered = filtered.filter(trainer => trainer.rating >= Number(minRating));
  }
  
  res.json(filtered);
});

app.get('/api/trainers/sports', (req, res) => {
  const sports = new Set();
  mockTrainers.forEach(trainer => {
    trainer.sportTypes.forEach(sport => sports.add(sport));
  });
  res.json(Array.from(sports));
});

app.get('/api/events', (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  const filtered = mockEvents.filter(event => event.date === date);
  res.json(filtered);
});

app.get('/api/events/dates', (req, res) => {
  const uniqueDates = [...new Set(mockEvents.map(event => event.date))];
  res.json(uniqueDates.sort());
});

app.post('/api/auth/login', (req, res) => {
  console.log(req.body);
  const { password, username} = req.body;
  
  const user = mockUsers.find(u => 
    u.username === username && u.password === password
  );
  
  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      ownedRequests: user.ownedRequests || []
    });
  } else {
    res.status(401).json({ error: 'Неверные учетные данные' });
  }
});

app.get('/api/requests', (req, res) => {
  const requestsDataPath = path.join(__dirname, 'data', 'requests.json');
  const mockRequests = JSON.parse(fs.readFileSync(requestsDataPath, 'utf-8'));
  res.json(mockRequests);
});

app.put('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const requestsDataPath = path.join(__dirname, 'data', 'requests.json');
    const mockRequests = JSON.parse(fs.readFileSync(requestsDataPath, 'utf-8'));
    
    const requestIndex = mockRequests.findIndex(r => r.id === parseInt(id));
    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    mockRequests[requestIndex].status = status;
    
    // Если заявка одобрена, добавляем новую организацию
    if (status === 'approved') {
      const orgsDataPath = path.join(__dirname, 'data', 'organizations.json');
      const mockOrganizations = JSON.parse(fs.readFileSync(orgsDataPath, 'utf-8'));
      
      const newOrg = {
        id: mockOrganizations.length + 1,
        ...mockRequests[requestIndex].data,
        rating: 0
      };
      
      mockOrganizations.push(newOrg);
      fs.writeFileSync(orgsDataPath, JSON.stringify(mockOrganizations, null, 2));
    }
    
    fs.writeFileSync(requestsDataPath, JSON.stringify(mockRequests, null, 2));
    res.json(mockRequests[requestIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});