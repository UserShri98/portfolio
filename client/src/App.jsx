import { Suspense } from 'react'
import ScrollManager from './components/Layout/ScrollManager'
import Scene3D from './components/Layout/Scene3D'
import Intro from './components/Sections/Intro'
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Contact from './components/Sections/Contact'

import Navbar from './components/Layout/Navbar'
import CustomCursor from './components/UI/CustomCursor'

function App() {
  return (
    <ScrollManager>
      <CustomCursor />
      <Navbar />
      <Scene3D />
      <div className="fixed inset-0 z-0 bg-black/40 pointer-events-none"></div>
      <main className="relative z-10">
        <Intro />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </ScrollManager>
  )
}

export default App;
