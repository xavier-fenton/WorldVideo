'use client'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
// import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

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


export default function VideosPage() {
  
  const fetcher = (...args) => fetch(args).then(res => res.json())

  const { data, error, isLoading } = useSWR('http://localhost:8080/v1/scrape', fetcher, {revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false})
  
  
  if (error) return <div>failed to load</div>
  
  
  // render data
  return (
    <>
    <div>WorldVideoV1</div>
    {isLoading ? <Loading /> :

    <div className='h-dvh'>
        {data ? <div className='h-full grid grid-cols-4 gap-[5px]'> {data.map((video: {id: number, videoSrc: string}) => {
            // Original slice
            // if(video.videoSrc.match('/shorts'))
            // {
            //   video.videoSrc = video.videoSrc.replace('/shorts', '/embed')
            // } 
            // else if(video.videoSrc.includes('/watch?v='))
            // {        
            //   video.videoSrc = video.videoSrc.replace('/watch?v=', '/embed/')
            // }
            if(video.videoSrc.match('/shorts/'))
              {
                  video.videoSrc = video.videoSrc.replace('/shorts/', '')
              } 
              else if(video.videoSrc.includes('/watch?v='))
              {        
                  video.videoSrc = video.videoSrc.replace('/watch?v=', '')
              }
              else if(video.videoSrc.includes('/'))
                  {        
                      video.videoSrc = video.videoSrc.replace('/', '')
                  }
              console.log(video);
          
              return (
                <>
                  <LiteYoutubeEmbed id={video.videoSrc} />
                </>
              )
          
          })} </div> 
        : <div>Nothing to present</div>
        }
     </div>
     
     }
    </>
  )
}
