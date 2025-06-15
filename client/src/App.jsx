// system imports
import { Outlet } from 'react-router-dom';

// images, icons, svgs, media imports

// component imports
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
