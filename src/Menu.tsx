import React, { useContext, useEffect, useState } from 'react'
import "./Menu.css"
import { VideoProperty } from './HomePage';


function Menu() {
    /* トグルバトン関連 */
    const [className, setClassName] = useState("");

    const handleClickBtn = () => {
        toggleClassNames();
    }

    const toggleClassNames = () => {
        const newClassName = className === "" ? "opened" : "";
        setClassName(newClassName);
    }


    /* ビデオサイズ関連 */
    const { videoWidth, setVideoWidth } = useContext(VideoProperty);
    const [displayValue, setDisplayValue] = useState("560");

    const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newWidth: string = e.target.value;
        setVideoWidth(newWidth + "px");
        setDisplayValue(newWidth);
    }

    const resetVideoSize = () => {
        setVideoWidth("560px");
    }


    return (
        <div id='menu'>
            <nav className={className}>
                <h2 className='menu-title'>Menu</h2>
                <ul>
                    <li>
                        <h3 className='li-title'>Video Size</h3>
                        <div id='range-display'>size: {displayValue}</div>
                        <input type="range" id="iframeWidth" min="0" max="1200" step="1" value={videoWidth.replace("px", "")} onChange={handleChangeWidth} />
                        <div className='reset-btn' onClick={resetVideoSize}>reset</div>
                    </li>
                </ul>
            </nav>
            <div className={`toggle-btn ${className}`} onClick={handleClickBtn}>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Menu
