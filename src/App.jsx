import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Three from './components/Three'

const App = () => {
  return (
    <Canvas id='three-canvas-container'>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  )
}

export default App
