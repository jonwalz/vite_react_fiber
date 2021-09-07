/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react'
import tw from 'twin.macro'
import randomColor from 'randomcolor'
import { Sphere, Cylinder } from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import { Object3D } from 'three'

const Container = tw.div`h-screen p-12 bg-blue-600 font-sans tracking-wider`

function getSize(): any {
  return [Math.random() * 0.5, Math.random() * 0.5, 0.2]
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Object3D>()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    if (mesh !== undefined && mesh.current) {
      mesh.current.rotation.y += Math.random() * 0.04
      mesh.current.rotation.x += Math.random() * 0.07
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={event => setActive(!active)}
      onPointerOver={event => setHover(true)}
      onPointerOut={event => setHover(false)}
    >
      <boxGeometry args={getSize()} />
      <meshStandardMaterial color={hovered ? 'hotpink' : props.color} />
    </mesh>
  )
}

interface Shapes {
  color: string
  position: any
  size: number
  args: any
}

function SphereShape({ color, position }: Shapes) {
  const mesh = useRef<Object3D>()
  useFrame((state, delta) => {
    if (mesh !== undefined && mesh.current) {
      mesh.current.rotation.y += Math.random() * 0.04
      mesh.current.rotation.x += Math.random() * 0.07
    }
  })
  return (
    <Sphere position={position} args={getSize()} ref={mesh}>
      <meshStandardMaterial attach="material" color={color} />
    </Sphere>
  )
}

function CylinderShape({ color, position }: Shapes) {
  const mesh = useRef<Object3D>()
  useFrame((state, delta) => {
    if (mesh !== undefined && mesh.current) {
      mesh.current.rotation.y += Math.random() * 0.04
      mesh.current.rotation.x += Math.random() * 0.07
    }
  })

  return (
    <Cylinder position={position} args={getSize()} ref={mesh}>
      <meshStandardMaterial attach="material" color={color} />
    </Cylinder>
  )
}

function makeRandomX() {
  return Math.floor(Math.random() * 21) - 10
}

// consider using https://gka.github.io/chroma.js/
function getRandomColor() {
  return randomColor({ hue: 'pink' })
}

const shapes: { [index: string]: any } = {
  0: (args: any) => <Box {...args} />,
  1: (args: any) => <SphereShape {...args} />,
  2: (args: any) => <CylinderShape {...args} />,
}

function makeShapes() {
  return Array.from({ length: 3000 }, () => {
    const shape = shapes[Math.floor(Math.random() * 3)]
    return {
      position: [makeRandomX(), makeRandomX(), makeRandomX()],
      color: getRandomColor(),
      Shape: shape,
    }
  })
}

// Use capture.js to export to gif or video
// https://github.com/spite/ccapture.js/

export function Main() {
  return (
    <Container>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {makeShapes().map(({ position, color, Shape }, i) => (
          <Shape key={i} position={position} color={color} />
        ))}
      </Canvas>
    </Container>
  )
}
