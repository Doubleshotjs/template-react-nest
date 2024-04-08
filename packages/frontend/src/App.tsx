import './App.css'
import { useEffect } from 'react'
import logo from './assets/logo.png'
import reactLogo from './assets/react.svg'
import nestjsLogo from './assets/nestjs.svg'
import Paint from './components/Paint'

function App() {
  if (window.isElectron) {
    const { useZoomFactor } = window.electron
    const { update: updateZoomFactor } = useZoomFactor()

    useEffect(() => {
      setTimeout(() => {
        updateZoomFactor()
      }, 200);
    }, [])

    window.addEventListener('resize', () => {
      updateZoomFactor()
    })
  }

  return (
    <>
      <div className="logo-block">
        <img height="100" src={logo} alt="Doubleshot Logo" />
        <div className="frame-logos">
          <div className="frame-info">
            <img src={reactLogo} alt="react" />
            <span className="react-name">React</span>
          </div>
          <span className="with">X</span>
          <div className="frame-info">
            <img src={nestjsLogo} alt="nest.js" />
            <span className="nestjs-name">Nest.js</span>
          </div>
        </div>
      </div>
      <Paint />
    </>
  )
}

export default App
