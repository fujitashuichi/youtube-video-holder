import React, { createContext, useEffect, useState } from 'react'
import Menu from './Menu'
import VideoList from './VideoList'
import ReactPaginate from 'react-paginate';


export const VideoProperty = createContext({} as any);
export const ItemsPerPage = createContext({} as any);


function HomePage() {
	const [videoWidth, setVideoWidth] = useState<number>();
	const value = { videoWidth, setVideoWidth };

	const [itemCount, setItemCount] = useState<number>(10);
	const value2 = { itemCount, setItemCount };


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

		setStorageLength(savedVideos.length);
	}


	//---------------------------------------------- ページネーション関連 ------------------------------------------------- //

	const [pageCount, setPageCount] = useState<number>();
	const [storageLength, setStorageLength] = useState<number>(0);

	useEffect(() => {
		setStorageLength(JSON.parse(localStorage.getItem("youtubeVideos") || "[]").length);
	}, []);

	// itemCountとstorageLengthに応じてpageCountの値を更新する
	useEffect(() => {
		const newPageCount = Math.ceil(storageLength / itemCount);
		setPageCount(newPageCount);
	}, [itemCount, storageLength]);

    const [itemsOffset, setItemsOffset] = useState(0);

    const endOffset = itemsOffset + itemCount;

    const currentItemsOffsets = [itemsOffset, endOffset];

	const handlePageClick = (e: { selected: number }) => {
		const newOffset = (e.selected * itemCount) % storageLength;
        setItemsOffset(newOffset);
	}


    return (
        <VideoProperty.Provider value={value}>
		<ItemsPerPage.Provider value={value2}>
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
				<VideoList offsets={currentItemsOffsets} />
				<div className="pagination-wrapper">
					<ReactPaginate
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={pageCount || 1}
						previousLabel="< previous"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						breakLabel="..."
						breakClassName="page-item"
						breakLinkClassName="page-link"
						containerClassName="pagination"
						activeClassName="active"
						activeLinkClassName="active"
					/>
				</div>
			</main>
		</ItemsPerPage.Provider>
        </VideoProperty.Provider>
    )
}

export default HomePage
