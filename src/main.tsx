import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import { LanguageWrapper, useLanguageContext } from './translations/wrapper'
import { enUS, esES } from '@clerk/localizations'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageWrapper>
      <ClerkWrapper>
        <RouterProvider router={router} />
      </ClerkWrapper>
    </LanguageWrapper>
  </StrictMode>
)

function ClerkWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguageContext()

  let locale = enUS
  if (lang === 'es') {
    locale = esES
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      localization={locale}
    >
      {children}
    </ClerkProvider>
  )
}
