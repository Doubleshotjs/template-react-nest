import './Paint.css'
import { useEffect, useRef, useState } from "react"
import { IconClear, IconSave, IconDoc, IconGithub } from './Icons'

const PAD_WIDTH = 1800
const PAD_HEIGHT = 1200
const THICKNESSES = [4, 12, 24, 48, 128]
const COLORS = ['#9b59b6', '#3498db', '#2ecc71', '#1abc9c', '#f1c40f', '#e67e22', '#E73C61']

function Paint() {
  const [selectedThickness, setSelectedThickness] = useState(24)
  const [selectedColor, setSelectedColor] = useState('#1abc9c')

  const drawPad = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = drawPad.current?.getContext('2d')
    if (!ctx) return

    const c = drawPad.current!

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.width, c.height)

    c.width = PAD_WIDTH
    c.height = PAD_HEIGHT
    let isPressed = false

    c.addEventListener('mousemove', (e) => {
      let x = e.offsetX * 2
      let y = e.offsetY * 2

      if (isPressed && ctx) {
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    })

    c.addEventListener('mousedown', (e) => {
      ctx.beginPath()
      ctx.moveTo(e.offsetX * 2, e.offsetY * 2)
      isPressed = true
    })

    c.addEventListener('mouseup', () => {
      isPressed = false
      ctx.closePath()
    })

    c.addEventListener('mouseleave', () => {
      isPressed = false
      ctx.closePath()
    })

    // Hi!
    ctx.lineWidth = 48
    ctx.strokeStyle = '#24b574'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(600, 350)
    ctx.lineTo(640, 800)

    ctx.moveTo(600, 600)
    ctx.lineTo(800, 580)

    ctx.moveTo(800, 350)
    ctx.lineTo(840, 800)

    ctx.moveTo(1010, 500)
    ctx.lineTo(1000, 800)

    ctx.moveTo(1010, 310)
    ctx.lineTo(1010, 340)

    ctx.moveTo(1210, 310)
    ctx.lineTo(1200, 640)

    ctx.moveTo(1225, 720)
    ctx.lineTo(1180, 820)

    ctx.moveTo(1170, 730)
    ctx.lineTo(1240, 820)

    ctx.closePath()

    ctx.stroke()

    // init thickness & color
    ctx.lineWidth = selectedThickness
    ctx.strokeStyle = selectedColor
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [drawPad])

  useEffect(() => {
    const ctx = drawPad.current?.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = selectedColor
    ctx.lineWidth = selectedThickness
  }, [selectedThickness, selectedColor])

  const clearCanvas = () => {
    const ctx = drawPad.current?.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, PAD_WIDTH, PAD_HEIGHT)
  }

  const saveImage = () => {
    if (!drawPad.current) return

    const img = drawPad.current.toDataURL('image/png')
    if (window.isElectron) {
      window.electron.saveImageToFile(img)
    } else {
      const a = document.createElement('a')
      a.href = img
      a.download = 'paint.png'
      a.click()
    }
  }

  return (
    <div className="paint">
      <nav className="thickness-bar">
        {THICKNESSES.map((thickness, i) => (
          <div
            key={thickness}
            className={`thickness ${thickness === selectedThickness ? 'active' : ''}`}
            onClick={() => setSelectedThickness(thickness)}
            style={{
              '--size-rate': `${i + 1}`,
            } as React.CSSProperties}
          />
        ))}
        <div className="button-in-thickness" onClick={clearCanvas}>
          <IconClear />
        </div>
      </nav>

      <canvas ref={drawPad} className="pad" />

      <nav className='color-bar'>
        {COLORS.map((color) => (
          <div
            key={color}
            className={`color ${color === selectedColor ? 'active' : ''}`}
            onClick={() => setSelectedColor(color)}
            style={{
              '--shadow-color': `${color + 99}`,
              '--point-color': color,
            } as React.CSSProperties}
          />
        ))}
      </nav>

      <div className="button-bar">
        <div className="button save" onClick={saveImage}>
          <IconSave />
          Save
        </div>
        <a className="button doc" href="https://github.com/Doubleshotjs/doubleshot" target="_blank">
          <IconDoc />
          Documentation
        </a>
        <a className="button github" href="https://github.com/Doubleshotjs/doubleshot" target="_blank">
          <IconGithub />
          Github
        </a>
      </div>
    </div>
  )
}

export default Paint