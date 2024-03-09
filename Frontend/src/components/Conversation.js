import { Component,useState,useEffect,useContext,useRef} from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { GlobalState } from "./GlobalState";
import logo from '../logo.svg';

function Conversation(){
    const myRef = useRef(null)

    const [loading,setLoading] = useState(true)
    const [messageSent,setMessageSent] = useState(true)
    const [conversation,setConversation] = useState([])
    const [currentMessage,setCurrentMessage] = useState('')
    const state = useContext(GlobalState)
    const [token] = state.token
    const [user] = state.userAPI.user

    const params = useParams()
    
    const loadConversation = async ()=> {
        try{
            const res = await axios.get(`api/chat/conversations/${params.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }}
            )
            setConversation(res.data)
            setLoading(false)
        }catch (err){
            alert('Not authorized')
            window.location.href = "/";

        }

    }

    const sendMessage = async ()=> {
        if(currentMessage !== ''){
            setMessageSent(false)
            setCurrentMessage('')
            try{
                setConversation([...conversation,{
                    body:currentMessage,
                    user:user.username,
                    id:100968
                
                }])
                const res = await axios.post(`api/chat/conversations/${params.id}/`, {body:currentMessage},{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    }}
                    )

            }catch(e){
                alert('Message wasn\'t sent')
            }
            setMessageSent(true)
            loadConversation()
            
        }

    }
    useEffect(()=> {
        loadConversation()
    },[])
    useEffect(()=>{
        myRef.current?.scrollIntoView({behavior: 'smooth'});

    },[conversation])

    return (
        <div className="container py-5 px-4">
            <div className="row rounded-lg overflow-hidden shadow">
            <div   className="px-4 py-5 chat-box bg-white">

                {conversation.map(message => (
                    message.user === user.username ? 
                        <div key={message.id} className="media w-50 ms-auto mb-3">
                            <div className="media-body">
                                <div className="bg-primary rounded py-2 px-3 mb-2">
                                <p className="text-small mb-0 text-white">{message.body}</p>
                                </div>
                                <p className="small text-muted">{message.created}</p>
                            </div>
                        </div>
                        :
                            <div key={message.id} className="media w-50 mb-3">
                                <div className="media-body me-auto">
                                    <div className="bg-secondary rounded py-2 px-3 mb-2">
                                    <p className="text-small mb-0 text-white">{message.body}</p>
                                    </div>
                                    <p className="small text-muted">{message.created}</p>
                                </div>
                            </div>
                ))}
            <div ref={myRef}/>
            </div>
                <form action="#" className="bg-light" onSubmit={(e) => {e.preventDefault();sendMessage();
        }}>
                    <div className="input-group mb-3">
                    <input value={currentMessage} onChange={(e)=> setCurrentMessage(e.target.value)} 
                    type="text" placeholder="Type a message"
                     aria-describedby="button-addon2" className="form-control" ></input>
                    <button id="button-addon2" type="submit" className="r-2 btn btn-outline-primary" disabled={!messageSent}><i className="fa fa-paper-plane"></i></button>
                    </div>
                </form>
        </div>
        </div>
    )
}

export default Conversation;