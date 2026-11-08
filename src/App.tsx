import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { About } from './components/About';
import { Root } from './components/Root';
import { Nqueens } from './components/nQueens';

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Nqueens />
        },
        {
          path: "about",
          element: <About />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={routers} />
  );
}

export default App;
