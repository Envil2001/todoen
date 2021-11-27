import './Header.css';

const Header = () => {
    return (
        <nav className="topnav">
            <div className="topnav-logo">
                <a href="/">

                </a>
            </div>    
            <div className="topnav-links">
                <a href="/home">
                    Home
                </a>
                <a href="/cards">
                    Cards
                </a>
            </div>
            <div className="topnav-icons">

            </div>
        </nav>
    )
}

export default Header;