import type { Element, VideoId } from './config/types'
import Video from './Video';

type Props = {
    offsets: number[];
}


function VideoList({ offsets }: Props) {
    const savedVideoIds: VideoId[] = JSON.parse(localStorage.getItem("youtubeVideos") || "[]");

    const startOffset = offsets[0];
    const endOffset = Math.min(offsets[1], savedVideoIds.length);

    let videos: Element[] = [];
    for (let i=startOffset; i < endOffset; i++) {
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
