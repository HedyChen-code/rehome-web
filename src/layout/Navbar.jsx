import { useState } from 'react';

function Offcanvas({ isOpen, close }) {
    return (<div className={`offcanvas offcanvas-top h-100 bg-primary-10 ${isOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{
            visibility: isOpen ? 'visible' : 'hidden',
        }}>
        <div className="d-flex justify-content-end p-4">
            <button className="rounded-circle bg-white p-5  border-0" onClick={close}><i class="bi bi-x nav-icon"></i></button>
        </div>
        <div className="offcanvas-body py-5 px-4">
            <ul className="navbar-nav justify-content-center align-items-center flex-grow-1">
                <li className="nav-item"><a className="nav-link fs-2" href="#">商品系列</a></li>
                <li className="nav-item"><a className="nav-link fs-2" href="#">風格嚴選</a></li>
                <li className="nav-item"><a className="nav-link fs-2" href="#">關於收購</a></li>
                <li className="nav-item"><a className="nav-link fs-2" href="#">品牌故事</a></li>
                <li className="nav-item"><a className="nav-link fs-2" href="#">連絡我們</a></li>
                <li className="nav-item"><a className="nav-link fs-2" href="#">查看購物車</a></li>
            </ul>
        </div>
    </div>)
};

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* 手機版導覽列 */}
            <nav className="navbar navbar-light fixed-top d-lg-none p-4">
                <div className="container-fluid align-items-start p-0">
                    <a className="" href="#">
                        <img src="./src/assets/images/logo/logo v2_white.svg" alt="logo" />
                    </a>

                    <div className="d-flex">

                        <div className="me-3 p-5">
                            <i className="bi bi-search text-white nav-icon "></i>
                        </div>

                        {/* 漢堡按鈕：手動綁定 isOpen 類別 */}
                        <button
                            className={`navbar-toggler rounded-circle bg-white p-5  border-0  shadow-none
wh-56 ${isOpen ? 'open' : ''}`}
                            type="button"
                            onClick={toggleOpen}
                        >
                            <div className="hamburger-icon ">
                                <span className="line"></span>
                                <span className="line middle"></span>
                                <span className="line"></span>
                            </div>
                        </button>
                    </div>

                    <Offcanvas isOpen={isOpen} close={toggleOpen} />
                </div>
            </nav>

            {/* 電腦版導覽列 */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-none d-lg-flex fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar;