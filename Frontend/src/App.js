import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './services/globalStyles'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import EventsPage from './pages/Events'
import ContactPage from './pages/Contact'
import { languages } from './data/NavbarData'
import StartUpsPage from './pages/StartUps'
import MembersPage from './pages/Members'
import LoginPage from './pages/Login'
import NotFoundPage from './pages/NotFound'
import AdminPage from './pages/AdminPanel'
import EventsAdminPage from './pages/AdminPanel/EventsAdmin'
import MembersAdminPage from './pages/AdminPanel/MembersAdmin'
import SubscribersAdminPage from './pages/AdminPanel/SubscribersAdmin'
import { AuthContextProvider } from './services/AuthContext'
function App() {
  const { t } = useTranslation()
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('Initial.appTitle')
  }, [currentLanguage, t])

  return (
    <Router>
      <GlobalStyle />
      <AuthContextProvider>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/events" exact element={<EventsPage />} />
          <Route path="/contact" exact element={<ContactPage />} />
          <Route path="/startups" exact element={<StartUpsPage />} />
          <Route path="/members" exact element={<MembersPage />} />
          <Route path="/admin/login" exact element={<LoginPage />} />
          <Route path="adminPanel" >
            <Route index element={<AdminPage />} />
            <Route path="events" element={<EventsAdminPage />} />
            <Route path="members" element={<MembersAdminPage />} />
            <Route path="subscribers" element={<SubscribersAdminPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
