'use client'
import dynamic from 'next/dynamic'
import VideosPage from '@/components/videos/videos'
import { Canvas, useFrame} from '@react-three/fiber'
import { Plane, useAspect, useTexture, useVideoTexture, OrbitControls, Html, Instance, Bvh } from '@react-three/drei'
import { BoxGeometry, Camera, Color, DoubleSide, Group, MathUtils, Mesh, MeshLambertMaterial } from 'three'
import { useEffect, useRef } from 'react'
import VideoCluster from '@/components/videos/videoCluster'
// import { Dog } from '@/components/canvas/Examples'


// const Plane = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Plane), {ssr: false})

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const Loading = () => {
  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  )
}

// function Scene() {
//   const size = useAspect(1800 / 4, 1000 / 4)
//   return (
//     <mesh scale={size}>
//       <planeGeometry />
//       <Suspense fallback={<FallbackMaterial url="testimage.jpg" />}>
//         <VideoMaterial url="test.mp4" />
//       </Suspense>
//     </mesh>
//   )
// }

function YouTubePlane() {
  const iframeRef = useRef();
  

  return (
    <group>
      <instancedMesh>
        <Html
          scale={[0.5, 0.5, 0.5]}
          transform
          occlude
          position={[0, 0, 0.1]} // Slight offset to avoid z-fighting
        >
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/FEEF5wdGFKk"
              width="250"
              height="auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
        </Html>
      </instancedMesh>
    </group>
  );
}





export default function Page() {
  
  
  return (
    <>
    <div>WorldVideoV1</div>
    <div className='size-full'>
          <Canvas>
              
              <VideoCluster boundary={100} count={10}/>
              <OrbitControls />
          </Canvas>
        </div>
    </>
  )
}

