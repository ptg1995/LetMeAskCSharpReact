import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { CodeRoom } from '../components/CodeRoom';
import { database } from '../services/firebase';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'

import '../styles/room.scss'
type RoomData = {
    id: string,
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string,
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
}

export function Room(roomData: RoomData) {
    const params = useParams<RoomData>();
    const { userData } = useAuth();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    const question = {
        content: newQuestion,
        author: {
            name: userData?.name,
            avatar: userData?.avatar,
        },
        isHighlighted: false,
        isAnswered: false,
    }

    useEffect(() => {
        const roomRef = database.ref(`rooms/${params.id}`);
        roomRef.on('value', (room) => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parseQuestionToArray = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                }
            });
            setTitle(databaseRoom.title);
            setQuestions(parseQuestionToArray);
        })
    }, [params.id])

    async function setFirebase(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === "") {
            return;
        }
        const usersRef = await database.ref('rooms');
        usersRef.child(`${params.id}/questions`).push(question);
    }
    return(
        <div id="page-room">
            <header>
                <div className="class-header">
                    <img src={logoImg} alt="LetMeAsk" />
                    <CodeRoom code={params.id} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={setFirebase}>
                    <textarea
                        placeholder="O que voce quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        {!userData ? (
                            <span> Para enviar uma pergunta, <button>registre-se</button> </span>) : 
                        (   <div className="user-info">
                                <img src={userData.avatar} />
                                <span>{userData.name}</span>
                            </div>
                        )}
                        <Button type="submit" disabled={!userData}> Enviar uma pergunta</Button>
                    </div>
                    <div>{JSON.stringify(questions)}</div>
                </form>
            </main>
        </div>
    );
}