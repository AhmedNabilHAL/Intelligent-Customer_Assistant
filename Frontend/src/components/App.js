import React, {  Fragment ,useContext, useState} from 'react'
import { Route,HashRouter } from 'react-router-dom'
// import '../App.css';
import Nav from './Nav'
import Login from './Login'
import ConversationList from './ConversationList';
import {GlobalState} from './GlobalState'
import Conversation from './Conversation';
import Profile from './Profile';
import Home from './Home';
import Registeration from './Registration'
function App(){
    const state = useContext(GlobalState)
    const [loading,setLoading] = useState(false)
    const [isLogged] = state.userAPI.isLogged

    return (
      <HashRouter>
        <div className="App">
          <Fragment>
              <Nav />
              {loading === true
                ? null
                : <Fragment>
                    
                    <Route path='/' exact component={Home}  />
                    <Route path='/profile' exact component={isLogged ? Profile : Login }  />
                    <Route path='/conversations' exact component={isLogged ?  ConversationList : Login } />
                    <Route path="/conversations/:id" children={isLogged ? <Conversation /> : <Login />}  />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Registeration} />

                    
                  </Fragment>}
            {/* </div> */}
          </Fragment>
        </div>

      </HashRouter>
    );
  
}

export default App;
