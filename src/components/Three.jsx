import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils } from 'three'

const Three = () => {
  const orbitControlsRef = useRef(null)

  useFrame(state => {
    if (!orbitControlsRef.current) return

    const { x, y } = state.mouse

    orbitControlsRef.current.setAzimuthalAngle(-x * MathUtils.degToRad(45))

    orbitControlsRef.current.setPolarAngle((y + 1) * MathUtils.degToRad(60))

    orbitControlsRef.current.update()
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />

      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={MathUtils.degToRad(60)}
        maxPolarAngle={MathUtils.degToRad(80)}
      />

      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>

      <mesh rotation={[-MathUtils.degToRad(90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>

      <ambientLight args={['#ffffff', 1]} />
    </>
  )
}

export default Three
