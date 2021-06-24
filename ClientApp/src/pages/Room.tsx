import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/room.scss'

export function Room() {
    return(
        <div id="page-room">
            <header>
                <div className="class-header">
                    <img src={logoImg} alt="LetMeAsk" />
                    <div>Sala #651561</div>
                </div>
            </header>


            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que voce quer perguntar?"
                    />
                    <div className="form-footer">
                        <span> Para enviar uma pergunta, <button>registre-se</button> </span>
                        <Button type="submit"> Enviar uma pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}