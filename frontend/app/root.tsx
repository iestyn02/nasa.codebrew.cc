import {
  BrowserRouter,
  createBrowserRouter,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  RouterProvider,
  Scripts,
  ScrollRestoration,
  type Router
} from 'react-router';

// import { RouterProvider, type Router as RemixRouter} from 'react-router-dom';

import type { Route } from './+types/root';

import { AppProvider } from './state/context';

import routes from './routes';

import './app.css';
import './2.css';
import './icons.css';

/** @components */
import AppComponent from './components/app';
import HeaderComponent from './components/header';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect',
    href: 'https://fonts.googleapis.com' 
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: 'favicon.ico'
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <BrowserRouter basename="/a5de8ad3" /> */}
        {/* <RouterProvider router={router} /> */}
        <AppProvider>
          <AppComponent>
            { children }
          </AppComponent>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />
  // return <BrowserRouter basename="/a5de8ad3" />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // return (
  //   <main className="pt-16 p-4 container mx-auto">
  //       <h1>{message}</h1>
  //       <p>{details}</p>
  //       {stack && (
  //         <pre className="w-full p-4 overflow-x-auto">
  //           <code>{stack}</code>
  //         </pre>
  //       )}
  //   </main>
  // )
  return (
    <main className="relative h-screen text-white overflow-y-auto">
      <div className="relative z-10 px-6 py-8"> {/* bg-opacity-50 */}
        <HeaderComponent />
        <main className="text-center mt-32">
          <h1 className="text-white text-4xl md:text-6xl font-thin mb-8">
            { message }
          </h1>
          <div className="max-w-md mx-auto mt-4">
            <p className="max-w-2xl mx-auto text-lg font-thin">
              {details}
            </p>
          </div>
        </main>
      </div>
    </main>
  );
}

