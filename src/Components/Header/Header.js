

import { useContext } from "react";
import { Link,NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import './Header.css';

const Header = () => {
     
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav className = ''>

                <Link  to="/shop">Shop</Link>
                <Link  to="/review">Order review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={()=> setLoggedInUser({})}> sign out </button>


                
                {/* <a href="/shop">shop</a>
                <a href="/review">Order review</a>
                <a href="/inventor"> Manage Inventory</a> */}
            </nav>
            
        </div>
    )
}

export default Header;