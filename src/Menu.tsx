import React, { useState } from 'react'
import "./Menu.css"


function Menu() {
    const [className, setClassName] = useState("");

    const handleClickBtn = () => {
        toggleClassNames();
    }

    const toggleClassNames = () => {
        const newClassName = className === "" ? "opened" : "";
        setClassName(newClassName);
    }


    return (
        <div id='menu'>
            <nav className={className}>
                <h2 className='menu-title'>Menu</h2>
            </nav>
            <div className={`toggle-btn ${className}`} onClick={handleClickBtn}>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Menu
