import React, { createContext, useState } from 'react'
import Menu from './Menu'
import VideoList from './VideoList'


export const VideoProperty = createContext({} as any);


function HomePage() {
	const [videoWidth, setVideoWidth] = useState("");
	const value = { videoWidth, setVideoWidth };


    const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: any) => {
		setInputValue(e.target.value);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		saveVideoId(inputValue);
		setInputValue("");
	}

	const saveVideoId = (url: string) => {
		let videoId: string | null;
		if (url && url.includes("youtu.be")) {
            videoId = url.split("/").pop() || null;
        } else if (url && url.includes("youtube.com") && url.includes("watch?v=")) {
            videoId = url.split("watch?v=").pop()?.split("&")[0] || null;
        } else {
            console.log("invalid URL:", !url ? "null" : url);
			return;
        }

		if (!videoId) return;

		let savedVideos = JSON.parse(localStorage.getItem("youtubeVideos") || "[]");
		if (!savedVideos.includes(videoId)) {
			savedVideos.push(videoId);
			localStorage.setItem("youtubeVideos", JSON.stringify(savedVideos));
		}
	}


    return (
        <VideoProperty.Provider value={value}>
            <div className="shutter">
				<h1 className='site-title'>
					<span>YouTube </span><span>Video </span><span>Holder</span>
				</h1>
				<div className='shutter-cover'></div>
			</div>
			<header id='header'>
				<form onSubmit={handleSubmit}>
					<label htmlFor="url">YouTube動画のURLを入力</label>
					<input id="url" type="url" value={inputValue} onChange={handleInputChange} />
					<button id="submit-btn">追加</button>
				</form>
				<Menu />
			</header>
			<main id='main'>
				<VideoList videoCount={5} />
			</main>
        </VideoProperty.Provider>
    )
}

export default HomePage
