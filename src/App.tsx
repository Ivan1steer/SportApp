import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import TrainersPage from './pages/TrainersPage/TrainersPage';
import OrganizationDetailsPage from './pages/OrganizationDetailsPage/OrganizationDetailsPage';
import TrainerDetailsPage from './pages/TrainerDetailsPage/TrainerDetailsPage';
import EventsPage from './pages/EventsPage/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage/EventDetailsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import styles from './App.module.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          
          <main className={styles.mainContent}>
            <Routes>
              {/* Публичные маршруты */}
              <Route path="/" element={<HomePage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/organizations/:id" element={<OrganizationDetailsPage />} />
              <Route path="/trainers/:id" element={<TrainerDetailsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              
              {/* Защищенный маршрут для админ-панели */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;