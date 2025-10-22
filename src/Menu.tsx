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
    const { videoWidth, setVideoWidth } = useContext(VideoProperty);

    const [displayValue, setDisplayValue] = useState<string>("");
    const [maxWidth, setMaxWidth] = useState<number>(window.innerWidth - 60);

    // ユーザーがビデオサイズを変更するときの処理
    const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newWidth = Number(e.target.value);
        setVideoWidth(newWidth);
    }

    // ビデオサイズを既定の大きさにする関数
    const resetVideoWidth = useCallback(() => {
        console.log("resetVideoWidth()");

        const w = window.innerWidth;
        setMaxWidth(w - 60);
        if (w >= 610) {
            setVideoWidth(560);
        } else {
            setMaxWidth(w - 60);
            setVideoWidth(w - 60);
        }
    }, [setVideoWidth]);

    // ロード時の処理
    useEffect(() => {
        // 初期値をセット
        resetVideoWidth();
    }, [resetVideoWidth]);

    // リサイズイベントが発生したときの処理
    const handleWindowResized = useCallback(() => {
        console.log("handleWindowResized()");

        resetVideoWidth();
    }, [resetVideoWidth]);
    // リサイズイベントのリスナー
    useEffect(() => {
        window.addEventListener('resize', handleWindowResized);
        return () => {
            window.removeEventListener('resize', handleWindowResized)
        };
    }, [handleWindowResized]);

    // 縦横回転時の処理
    useEffect(() => {
        const handleChangeOrientation = () => {
            console.log("handleChangeOrientation()");
            handleWindowResized();
        }

        window.screen.orientation.addEventListener("change", handleChangeOrientation);

        return () => {
            window.screen.orientation.removeEventListener("change", handleChangeOrientation);
        }
    }, [handleWindowResized]);

    // videoWidth更新時の処理
    useEffect(() => {
        setDisplayValue(String(videoWidth) + "px");
    }, [videoWidth]);


    return (
        <div id='menu'>
            <nav className={className}>
                <h2 className='menu-title'>Menu</h2>
                <ul>
                    <li>
                        <h3 className='li-title'>Video Size</h3>
                        <div id='range-display'>size: {displayValue}</div>
                        <input type="range" id="iframeWidth" min="0" max={maxWidth} step="1" value={videoWidth} onChange={handleChangeWidth} />
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
