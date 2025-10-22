import { useContext } from 'react';
import { VideoId } from './config/types';
import { VideoProperty } from './HomePage';

type Props = {
    videoId: VideoId;
}


function Video({ videoId }: Props) {
    const { videoWidth } = useContext(VideoProperty);

    return (
        <div className='video-wrapper'>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ width: String(videoWidth) + "px" }}
            >
            </iframe>
        </div>
    )
}

export default Video
