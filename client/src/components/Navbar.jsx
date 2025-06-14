import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to='/'>hm | Event Organizer</Link>

      {/* center links */}
      <div>
        {/* links for everybody */}
        <Link to='/'>Home</Link>

        {/* links for users */}

        {/* links for the organizers */}

        {/* links for the admins */}
      </div>

      {/* right auth links */}
      <div>
        {/* logged out state */}

        {/* logged in state */}
      </div>
    </div>
  );
};

export default Navbar;
