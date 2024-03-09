import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {GlobalState} from './GlobalState'

import { Navbar ,Container ,NavDropdown } from 'react-bootstrap';
function Nav (props) {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    function handleClick(){
        // props.dispatch(setAuthedUser(null))
    }
    const logoutUser = async () =>{
        // await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    return (
    <nav className="navbar navbar-expand-sm bg-light">
        <div className="conatiner container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav">

                    <li key={'Home'} className="nav-item">
                        <NavLink  to='/' exact className='nav-link' activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    { isLogged &&
                    <li key={'Profile'} className="nav-item">
                        <NavLink to='/profile' exact className='nav-link' activeClassName='active'>
                            Profile
                        </NavLink>
                    </li>
                    }
                    { isLogged &&

                    <li key={'Conversations'} className="nav-item">
                        <NavLink to='/conversations' exact className='nav-link' activeClassName='active'>
                            Conversations
                        </NavLink>
                    </li>
                    }
                    <li key={'login'} className="nav-item">
                        {isLogged ? <NavLink to='/' onClick={logoutUser}  className='nav-link'>logout</NavLink>
                        :<NavLink to='/login' exact className='nav-link' activeClassName='active'>
                            login
                        </NavLink> 
                        
                        }
                    </li>
                    {   isLogged ? '':
                        <li key={'Registeration'} className="nav-item">
                            <NavLink to='/register' exact className='nav-link'>register</NavLink> 
                        </li>

                    }
                </ul>

            </div>

        </div>
    </nav>
    )
}

export default Nav