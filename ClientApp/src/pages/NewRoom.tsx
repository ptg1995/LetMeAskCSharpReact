import {FormEvent, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import {Button} from '../components/Button'
import './Home'
import {database} from '../services/firebase'
import { useAuth } from '../hooks/useAuth';

//import { useAuth } from '../hooks/useAuth';

export default function NewRoom(){
     const {userData} = useAuth();
    const [codeRoom, setCodeRoom] = useState('');
    const history = useHistory();

    function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        if(codeRoom.trim() === ""){
            return ;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = roomRef.push({
            title: codeRoom,
            authorId: userData?.id,
        })
        history.push(`/rooms/${firebaseRoom.key}`)
        console.log(firebaseRoom.key);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas de audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk"/>
                    <div className="text-criar-sala">
                            Crie uma nova sala
                    </div>
                    <form onSubmit = {handleCreateRoom}>
                        <input
                            type = "text" 
                            placeholder="Digite o código da sala"
                            onChange = {event => setCodeRoom(event.target.value)}
                            value = {codeRoom}
                        />
                        <Button type = "submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
                </div>    
            </main>    
        </div>
    )
}