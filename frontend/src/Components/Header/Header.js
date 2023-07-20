import './header.css'
import logo from '../../assets/img/logoLocalHarvest.png'

function Header(){
    return(
        <>
        
         <header className="container">
            <div className="logo">
                <img src={logo} alt='logo'/>
            </div>
            <nav className="menu">
                <a href="/">LOG IN</a>
               
            </nav>
           
            </header>
        
        </>
    )
}

export default Header;