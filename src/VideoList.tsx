import type { Element, VideoId } from './config/types'
import Video from './Video';

type Props = {
    videoCount: number;
}


function VideoList({ videoCount }: Props) {
    const savedVideoIds: VideoId[] = JSON.parse(localStorage.getItem("youtubeVideos") || "[]");

    const endOffset = Math.min(videoCount, savedVideoIds.length);

    let videos: Element[] = [];
    for (let i=0; i < endOffset; i++) {
        const video: Element = <Video key={i} videoId={savedVideoIds[i]} />
        videos.push(video);
    }


    return (
        <div className='video-list'>
            {videos}
        </div>
    )
}

export default VideoList
