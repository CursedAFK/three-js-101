import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { BackSide, MathUtils } from 'three'
import Car from './Car'

const Three = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [yValue, setYValue] = useState(20)

  const orbitControlsRef = useRef(null)

  useFrame(state => {
    if (!orbitControlsRef.current) return

    const { x, y } = state.mouse

    orbitControlsRef.current.setAzimuthalAngle(-x * MathUtils.degToRad(45))
    orbitControlsRef.current.setPolarAngle((y + 1) * MathUtils.degToRad(60))

    orbitControlsRef.current.update()

    if (!isHovered) return
  })

  return (
    <>
      {/* Cameras */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={MathUtils.degToRad(60)}
        maxPolarAngle={MathUtils.degToRad(80)}
      />

      {/* Ball */}
      <motion.mesh
        position={[-2, 1.5, 0]}
        castShadow
        animate={{
          x: 1,
          y: [0.5, 1.4, 0.5, 0.8, 0.5, 0.6, 0.5]
        }}
        transition={{
          x: {
            duration: 2,
            ease: 'easeOut'
          },
          y: {
            duration: 1,
            ease: 'easeOut'
          }
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' metalness={0.6} roughness={0.2} />
      </motion.mesh>

      {/* Car */}
      <Car
        scale={0.6}
        position={[-0.5, 0, 0]}
        rotation={[0, -MathUtils.degToRad(yValue), 0]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      />

      {/* Floor */}
      <mesh rotation={[-MathUtils.degToRad(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>

      {/* Lights */}
      <ambientLight args={['#ffffff', 0.25]} />
      <spotLight
        args={['#ffffff', 1.5, 7, MathUtils.degToRad(45), 0.4]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* Environment */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color='#2266cc' side={BackSide} />
        </mesh>
      </Environment>
    </>
  )
}

export default Three
