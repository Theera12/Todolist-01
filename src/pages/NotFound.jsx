import { NavLink } from 'react-router';
function NotFound() {
  return (
    <>
      <h2>OOPS!!! Page Not Found...</h2>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
    </>
  );
}
export default NotFound;
