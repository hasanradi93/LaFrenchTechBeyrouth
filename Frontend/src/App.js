import { useEffect, Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './services/globalStyles'
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
const ProfileAdminPage = lazy(() => import('./pages/AdminPanel/ProfileAdminPage'))
const CompanyAdminPage = lazy(() => import('./pages/AdminPanel/CompanyAdminPage'))
const languages = lazy(() => import('./data/NavbarData'))
const AuthContextProvider = lazy(() => import('./services/AuthContext'))
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
          <div style={{ textAlign: 'center' }}>Loading...</div>
          <div style={{ textAlign: 'center' }}><img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='64px' height='64px' alt='loading' /></div>
        </>
      }>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/events" exact element={<EventsPage />} />
          <Route path="/contact" exact element={<ContactPage />} />
          <Route path="/startups" exact element={<StartUpsPage />} />
          <Route path="/members" exact element={<MembersPage />} />
          <Route path="/admin/login" exact element={<LoginPage />} />
          <Route path="adminPanel" >
            <AuthContextProvider>
              <Route index element={<AdminPage />} />
              <Route path="events" element={<EventsAdminPage />} />
              <Route path="members" element={<MembersAdminPage />} />
              <Route path="subscribers" element={<SubscribersAdminPage />} />
              <Route path="profile" element={<ProfileAdminPage />} />
              <Route path="settings" element={<CompanyAdminPage />} />
            </AuthContextProvider>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
