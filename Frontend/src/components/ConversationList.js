import { useState,useEffect,useContext } from "react";
import ConversationStub from "./ConversationStub";
import axios from "axios";
import {GlobalState} from './GlobalState'

function ConversationList() {
    const [conversations , setConversations] = useState([])
    const state = useContext(GlobalState)
    const [token] = state.token

    const [currentTicketTitle,setCurrentTicketTitle] = useState('')
    const getCoversations =  async () =>{ 
        try{
            const res = await axios.get('/api/chat/conversations/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }}
            )
            setConversations(res.data)
        }catch(err){
            
        }
    }
    useEffect( () =>{
        getCoversations()
    },[token])

    const creatTicket =  async () =>{ 
        const res = await axios.post('/api/chat/conversations/',{title:currentTicketTitle}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }}
        )
        setCurrentTicketTitle('')
        setConversations([...conversations,res.data])
    }
    return (
        <div className='box_list_container'>
            <div className="input-group mb-3">
                <input type="text" 
                 value={currentTicketTitle}
                 onChange={(e)=> setCurrentTicketTitle(e.target.value)}
                 className="form-control"
                 placeholder="Enter the problem title" 
                 aria-label="Example text with button addon" 
                 aria-describedby="button-addon1" />
                <button className="btn btn-primary" type="button" id="button-addon1" onClick={(e)=> {e.preventDefault();creatTicket()}}>Add Ticket</button>
            </div>
            {conversations.map(conv => (
                <li key={conv.id}>
                    <ConversationStub conversation={conv} />
                </li>
            ))}
        </div>
    )
    
}

export default ConversationList;

