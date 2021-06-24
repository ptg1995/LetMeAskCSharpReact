import { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'


import '../styles/auth.scss'
import {Button} from '../components/Button'
import {useAuth} from '../hooks/useAuth';
import {database} from '../services/firebase'


export default function Home(){

    const {userData, signInWithGoogle} = useAuth();
    const [codeRoom, setCodeRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(){
       if(!userData){
           await signInWithGoogle();
       }
       history.push('/rooms/newroom')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(codeRoom.trim() === ""){
            return ;
        }

        const roomRef = await database.ref(`rooms/${codeRoom}`).get()
        if(!roomRef.exists()){
            alert("Sala não existe!")
            return;
        }
        console.log(codeRoom);
        history.push(`/rooms/${codeRoom}`)
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
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt = "Logo do google"/>
                        Crie sua sala com o Google.
                    </button>
                    <div className ="separator"> 
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type = "text"
                            placeholder="Digite o código da sala"
                            onChange = {event => setCodeRoom(event.target.value)}
                            value = {codeRoom}
                        />
                        <Button type = "submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>    
            </main>    
        </div>
    )
}