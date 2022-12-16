import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '@/pages/home';
import Admin from '@/pages/admin';

import './app.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
