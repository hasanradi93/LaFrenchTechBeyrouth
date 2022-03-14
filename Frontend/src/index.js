import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/js/bootstrap.js'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
// import 'flag-icons/css/flag-icon.min.css'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })


const loadingMarkup = (
  <div className="py-4 text-center">
    <div>
      <img src={process.env.PUBLIC_URL + '/assets/images/logo-Big.png'} alt='La French Tech logo' width='128px' height='128px' />
    </div>
    <div style={{ marginTop: '250px' }}>
      <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='64px' height='64px' />
    </div>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
)
