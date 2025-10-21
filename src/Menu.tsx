import React, { useCallback, useContext, useEffect, useState } from 'react'
import "./Menu.css"
import { VideoProperty } from './HomePage';
import { Link } from 'react-router-dom';


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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { videoWidth, setVideoWidth } = useContext(VideoProperty);

    const [displayValue, setDisplayValue] = useState("560");
    const [maxWidth, setMAxWidth] = useState(windowWidth - 60);

    const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newWidth: string = e.target.value + "px";
        setVideoWidth(newWidth);
        setDisplayValue(newWidth);
    }

    // ビデオサイズを既定の大きさにする関数
    const resetVideoWidth = useCallback(() => {
        setMAxWidth(windowWidth - 60);
        if (windowWidth >= 610) {
            setVideoWidth("560px");
        } else {
            const newWidth = String(windowWidth - 60) + "px";
            setVideoWidth(newWidth);
        }
    }, []);

    // ロード時の処理
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const initializeValues = () => {
            setMAxWidth(window.innerWidth - 60);
            resetVideoWidth();
        };

        window.addEventListener("load", initializeValues);
    }, []);

    // リサイズイベントが発生したときの処理
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setMAxWidth(windowWidth - 60);
            if (windowWidth < 610) {
                const newWidth = String(windowWidth - 60) + "px";
                setVideoWidth(newWidth);
            }
        };

        window.addEventListener('resize', handleResize);

        // クリーンアップ関数: コンポーネントがアンマウントされるときにリスナーを削除
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setVideoWidth, windowWidth]);

    // videoWidth更新時の処理
    useEffect(() => {
        setDisplayValue(videoWidth);
    }, [videoWidth]);


    return (
        <div id='menu'>
            <nav className={className}>
                <h2 className='menu-title'>Menu</h2>
                <ul>
                    <li>
                        <h3 className='li-title'>Video Size</h3>
                        <div id='range-display'>size: {displayValue}</div>
                        <input type="range" id="iframeWidth" min="0" max={maxWidth} step="1" value={videoWidth.replace("px", "")} onChange={handleChangeWidth} />
                        <div className='reset-btn' onClick={resetVideoWidth}>reset</div>
                    </li>
                    <li>
                        <h3 className='li-title'>
                            <Link to="/how-to-use" className='link'>How to Use</Link>
                        </h3>
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
