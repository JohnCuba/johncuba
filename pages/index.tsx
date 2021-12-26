import type { NextPage } from 'next'
import { useTheme } from 'next-themes'

import Sidebar from '@components/sidebar'

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <main>
      <Sidebar />
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </main>
  )
}

export default Home
