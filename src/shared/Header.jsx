import logo from '../assets/logo.png';
import { NavLink } from 'react-router';
import styles from './Header.module.css';
function Header({ heading }) {
  return (
    <header className={styles.headerContainer}>
      <nav>
        <NavLink to="/">
          <img src={logo}></img>
        </NavLink>
      </nav>
      <h1>{heading}</h1>
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => {
            return isActive ? styles.active : styles.inactive;
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            return isActive ? styles.active : styles.inactive;
          }}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
export default Header;
