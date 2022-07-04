import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link to="/">Cook</Link>
        <Link to="">State</Link>
        <Link to="">Class</Link>
        <Link to="">Reducer</Link>
      </div>
    </header>
  )
}
