import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link to="/">Cook</Link>
        <Link to="/state">State</Link>
        <Link to="/class">Class</Link>
        <Link to="/reducer">Reducer</Link>
      </div>
    </header>
  )
}
