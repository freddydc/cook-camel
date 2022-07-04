import { Route, Routes } from 'react-router-dom'
import { Layout } from '../Layout'
import { Home } from '../../pages'
import { UseState } from '../../pages/use-state'
import { ClassState } from '../../pages/class-state'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="state" element={<UseState name="Use State" />} />
        <Route path="class" element={<ClassState name="Class State" />} />
      </Route>
    </Routes>
  )
}
