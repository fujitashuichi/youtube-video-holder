import React from 'react'
import { VideoId } from './config/types';

type Props = {
    videoId: VideoId;
}


function Video({ videoId }: Props) {
    console.log(typeof videoId);
    return (
        <div className='video-wrapper'>
            <iframe width="560px" height="315px"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            >
            </iframe>
        </div>
    )
}

export default Video
