import { useEffect, Suspense, lazy, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './services/globalStyles'
import { languages } from './data/NavbarData'
import ProtectedRoutes from './services/ProtectRoutes'
import { AuthContextProvider } from './services/AuthContext'
const HomePage = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/About'))
const EventsPage = lazy(() => import('./pages/Events'))
const ContactPage = lazy(() => import('./pages/Contact'))
const StartUpsPage = lazy(() => import('./pages/StartUps'))
const MembersPage = lazy(() => import('./pages/Members'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))
const LoginPage = lazy(() => import('./pages/Login'))
const AdminPage = lazy(() => import('./pages/AdminPanel'))
const EventsAdminPage = lazy(() => import('./pages/AdminPanel/EventsAdmin'))
const MembersAdminPage = lazy(() => import('./pages/AdminPanel/MembersAdmin'))
const SubscribersAdminPage = lazy(() => import('./pages/AdminPanel/SubscribersAdmin'))
const ProfileAdminPage = lazy(() => import('./pages/AdminPanel/ProfileAdmin'))
const CompanyAdminPage = lazy(() => import('./pages/AdminPanel/CompanyAdmin'))

// import HomePage from './pages/Home'
// import AboutPage from './pages/About'
// import EventsPage from './pages/Events'
// import ContactPage from './pages/Contact'
// import StartUpsPage from './pages/StartUps'
// import MembersPage from './pages/Members'
// import NotFoundPage from './pages/NotFound'
// import LoginPage from './pages/Login'
// import AdminPage from './pages/AdminPanel'
// import EventsAdminPage from './pages/AdminPanel/EventsAdmin'
// import MembersAdminPage from './pages/AdminPanel/MembersAdmin'
// import SubscribersAdminPage from './pages/AdminPanel/SubscribersAdmin'
// import ProfileAdminPage from './pages/AdminPanel/ProfileAdmin'
// import CompanyAdminPage from './pages/AdminPanel/CompanyAdmin'


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
      <Suspense fallback={
        <>
          <div style={{ textAlign: 'center', marginTop: '5%' }}><img src={process.env.PUBLIC_URL + '/assets/images/logo-Big.png'} width='128px' height='128px' alt='logo' /></div>
          <div style={{ textAlign: 'center' }}>Loading...</div>
          <div style={{ textAlign: 'center' }}><img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='64px' height='64px' alt='loading' /></div>
        </>
      }>
        <AuthContextProvider>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/about" exact element={<AboutPage />} />
            <Route path="/events" exact element={<EventsPage />} />
            <Route path="/contact" exact element={<ContactPage />} />
            <Route path="/startups" exact element={<StartUpsPage />} />
            <Route path="/members" exact element={<MembersPage />} />
            <Route path="/admin/login" exact element={<LoginPage />} />
            <Route path="adminPanel" element={<ProtectedRoutes />} >
              <Route index element={<AdminPage />} />
              <Route path="events" element={<EventsAdminPage />} />
              <Route path="members" element={<MembersAdminPage />} />
              <Route path="subscribers" element={<SubscribersAdminPage />} />
              <Route path="profile" element={<ProfileAdminPage />} />
              <Route path="settings" element={<CompanyAdminPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContextProvider>
      </Suspense>
    </Router>

  );
}

export default App;
