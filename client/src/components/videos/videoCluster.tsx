import { Html } from '@react-three/drei';
import { tree } from 'next/dist/build/templates/app-page';
import React, { useEffect, useRef, useState } from 'react';


type videoType = {
    position: {x: number, z: number, y: number}
    box: number
}

type videoProps = {
    boundary: number,
    count: number
}

const boxIntersect = (
    minAx: number,
    minAz: number,
    minAy: number,
    maxAx: number,
    maxAz: number,
    maxAy: number,
    minBx: number,
    minBz: number,
    minBy: number,
    maxBx: number,
    maxBz: number,
    maxBy: number,

) => {
    let aLeftofB  = maxAx < minBx;
    let aRightofB = minAx > maxBx;
    let aAboveB   = minAz > maxBz;
    let aBelowB   = maxAz < minBz;

    return !(aLeftofB || aRightofB || aAboveB || aBelowB);
}

const VideoCluster: React.FC<videoProps> = ({boundary, count}) => {
    const iframeRef = useRef();
    const [videos, setVideos] = useState<videoType[]>([])

    const isOverlapping = (index: number, video: any, videos: any[]) => {

    const minTargetX = video.position.x  -  video.box  / 2;
    const maxTargetX = video.position.x  +  video.box  / 2;
    const minTargetZ = video.position.z  -  video.box  / 2; 
    const maxTargetZ = video.position.z  +  video.box  / 2;
    const minTargetY = video.position.y  -  video.box  / 2;
    const maxTargetY = video.position.y  +  video.box  / 2;



    for (let i = 0; i < index; i++) {
        let minChildX = videos[i].position.x - videos[i].box / 2;
        let maxChildX = videos[i].position.x + videos[i].box / 2;
        let minChildZ = videos[i].position.z - videos[i].box / 2;
        let maxChildZ = videos[i].position.z + videos[i].box / 2;
        let minChildY = videos[i].position.y - videos[i].box / 2;
        let maxChildY = videos[i].position.y + videos[i].box / 2;


        if(
            boxIntersect(
            minTargetX,
            minTargetZ,
            minTargetY,
            maxTargetX,
            maxTargetZ,
            maxTargetY,
            minChildX,
            minChildZ,
            minChildY,
            maxChildX,
            maxChildZ,
            maxChildY
            )  
            ) {
            console.log("Content box overlapping: ", video);
            return true;
            
            }

            return false;

    }



}

    const newPosition = (box: number, boundary: number) => {
        return (
            boundary / 2 -
            box / 2 -
            (boundary - box) * (Math.round(Math.random() * 100) / 100)

        )
    }

    const updatePosition = (videoArray: videoType[], boundary: number) => {
        videoArray.forEach((video, index) => {
            do {

                video.position.x = newPosition(video.box, boundary);
                video.position.z = newPosition(video.box, boundary);
                video.position.y = newPosition(video.box, boundary);
            } while (isOverlapping(index, video, videoArray))

        })
        setVideos(videoArray)
    }

    useEffect(() => {
        const tempVideos: videoType[] = []
        for(let i = 0; i < count; i++)
        {
            tempVideos.push({position: {x: 0, z: 0, y: 0}, box: 10})
        } 
        updatePosition(tempVideos, boundary)
            
    }, [boundary, count])

    return (
        <group>
            {videos.map((video, index) => {
                return(
                <object3D key={index} position={[video.position.x, video.position.y, video.position.z]}>
                    <instancedMesh>
                        {/* <mesh scale={[video.box, video.box, video.box ]}>
                            <boxGeometry/>
                            <meshBasicMaterial color={"blue"} wireframe/>
                        </mesh> */}
                        <Html
                            scale={[2, 2, 2]}
                            transform
                            occlude
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
                    </object3D>
                )
            })}
            
        </group>)
};

export default VideoCluster;