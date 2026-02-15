import { NavLink } from 'react-router';
function About() {
  return (
    <>
      <h3>An Simple Todo App</h3>
      <p>A simple Todo application to manage your task seemlessly!</p>
      <p>Comes with resuable components!</p>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>
    </>
  );
}
export default About;
