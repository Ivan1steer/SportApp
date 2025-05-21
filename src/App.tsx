import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import TrainersPage from './pages/TrainersPage/TrainersPage';
import OrganizationDetailsPage from './pages/OrganizationDetailsPage/OrganizationDetailsPage';
import TrainerDetailsPage from './pages/TrainerDetailsPage/TrainerDetailsPage';
import EventsPage from './pages/EventsPage/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage/EventDetailsPage';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/organizations/:id" element={<OrganizationDetailsPage />} />
          <Route path="/trainers/:id" element={<TrainerDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </AuthProvider>
  );
}
export default App;
