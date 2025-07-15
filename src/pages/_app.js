import '@/styles/globals.css';
import { PhotographerProvider } from '@/context/PhotographerContext';

export default function App({ Component, pageProps }) {
  return (
    <PhotographerProvider>
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 px-6 shadow-md">
        <div className="text-2xl font-bold tracking-wide">📸 Pixisphere</div>
      </header>

      <main className="min-h-screen p-4 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <Component {...pageProps} />
      </main>

      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4 mt-10">
        © 2025 Pixisphere. All rights reserved.
      </footer>
    </PhotographerProvider>
  );
}
