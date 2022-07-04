import styles from './Layout.module.css'

import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  )
}
