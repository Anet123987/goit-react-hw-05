import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: 15,
          color: isActive ? 'blue' : 'black',
          textDecoration: 'none',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        Головна
      </NavLink>
      <NavLink
        to="/movies"
        style={({ isActive }) => ({
          color: isActive ? 'blue' : 'black',
          textDecoration: 'none',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        Пошук фільмів
      </NavLink>
    </nav>
  );
};

export default Navigation;
