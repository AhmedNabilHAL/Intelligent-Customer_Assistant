import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {GlobalState} from './GlobalState'

function ConversationStub(props){
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    return (
        <div className="card">
        <div className="card-body">
            <NavLink to={`/conversations/${props.conversation.id}`} className='nav_link' activeClassName='active'>
                <h5 className="card-title">{props.conversation.title}</h5>
            </NavLink>
            <p className="card-text"><small className="text-muted">{user.username}</small></p>
            <p className="card-text"><small className="text-muted">{props.conversation.created}</small></p>
        </div>
        </div>
        
    )
    
}

export default ConversationStub;