import React from 'react'
import "./HowToUsePage.css"
import { Link } from 'react-router-dom'


function HowToUsePage() {
    return (
        <div id='page-wrapper'>
            <header id="header">
                <h2 className='page-title'>How to use</h2>
                <div id="goto-home-btn">
                    <Link to="/" className='link'>BACK TO HOME</Link>
                </div>
            </header>
            <main id="main">
                <ul>
                    <li>
                        <p>
                            YouTubeサイトの動画リストで、<span>共有をクリック</span>します<a href='#li-3' className='link'> 3. → </a>
                            <br/>
                            見つからないときは2. を試してください<a href='#li-2'> 2. → </a>
                        </p>
                        <img id='img-1' src="/img/youtube1.jpg" alt="" />
                    </li>
                    <li id='li-2'>
                        <p>
                            共有をクリックした後、<span>コピーをクリック</span>します <a href='#li-4'> 4. → </a>
                            <br/>
                            見つからないときは3. を試してください<a href='#li-3'> 3. → </a>
                        </p>
                        <img src="/img/youtube2.jpg" alt="" />
                    </li>
                    <li id='li-3'>
                        <p>URLバーからコピーしてもOK</p>
                        <img src="/img/youtube-url.jpg" alt="" />
                    </li>
                    <li id='li-4'>
                        <p>HOMEに戻り、URLを貼り付けて追加ボタンを押します</p>
                        <img src="/img/form.jpg" alt="" />
                    </li>
                </ul>
                <div className='spacer'></div>
            </main>
        </div>
    )
}

export default HowToUsePage
