import { Html } from '@react-three/drei';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';
import { ThreeElements, useThree } from '@react-three/fiber';


type videoType = {
    position: { x: number, z: number, y: number }
    box: number
}

type videoProps = {
    boundary: number,
    count: number
}
type ytVideoData = {
    id: number,
    videoSrc: string
}

const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number,

) => {
    let aLeftofB = maxAx < minBx;
    let aRightofB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;

    return !(aLeftofB || aRightofB || aAboveB || aBelowB);
}

const VideoCluster: React.FC<videoProps> = ({ boundary, count }) => {
    const iframeRef = useRef();
    const [videos, setVideos] = useState<videoType[]>([])
    const [ytData, setYtData] = useState<ytVideoData[]>([])

    const fetcher = (...args) => fetch(args).then(res => res.json())

    const { data, error, isLoading } = useSWR('http://localhost:8080/v1/scrape', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    const isOverlapping = (index: number, video: any, videos: any[]) => {

        const minTargetX = video.position.x - video.box / 2;
        const maxTargetX = video.position.x + video.box / 2;
        const minTargetZ = video.position.z - video.box / 2;
        const maxTargetZ = video.position.z + video.box / 2;
      


        for (let i = 0; i < index; i++) {
            let minChildX = videos[i].position.x - videos[i].box / 2;
            let maxChildX = videos[i].position.x + videos[i].box / 2;
            let minChildZ = videos[i].position.z - videos[i].box / 2;
            let maxChildZ = videos[i].position.z + videos[i].box / 2;
        

            if (
                boxIntersect(
                    minTargetX,
                    minTargetZ,
                    maxTargetX,
                    maxTargetZ,
                    minChildX,
                    minChildZ,
                    maxChildX,
                    maxChildZ,
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
        for (let i = 0; i < count; i++) {
            tempVideos.push({ position: { x: 0, z: 0, y: 0 }, box: 10 })
        }

        updatePosition(tempVideos, boundary)

        if (data) {

            const cleanData: ytVideoData[] = data.map((video: { id: number, videoSrc: string }, i: number) => {

                if (video.videoSrc.match('/shorts/')) {
                    video.videoSrc = video.videoSrc.replace('/shorts/', '')
                }
                else if (video.videoSrc.includes('/watch?v=')) {
                    video.videoSrc = video.videoSrc.replace('/watch?v=', '')
                }
                else if (video.videoSrc.includes('/')) {
                    video.videoSrc = video.videoSrc.replace('/', '')
                }
                return video
            })

            setYtData(cleanData)
        };

    }, [boundary, count, data])


    return (
        <group>
            <Html position={[0, 65, 0]}>
                <div className='rounded-lg border p-[10px] text-xs'>Trending</div>
            </Html>
            {videos.map((video, index) => (
                <object3D key={index} position={[video.position.x, video.position.y, video.position.z]}>
                    {ytData[index] && ( // Ensure there's a matching YouTube video for this position
                        <Html
                            key={ytData[index].id}
                            scale={[1, 1, 1]}
                            transform
                            occlude
                        >
                            <div style={{ width: "400px", height: "100px" }}>
                                <LiteYoutubeEmbed lazyImage={false} id={ytData[index].videoSrc} />
                            </div>
                        </Html>
                    )}
                </object3D>
            ))}
        </group>
    )
};

export default VideoCluster;