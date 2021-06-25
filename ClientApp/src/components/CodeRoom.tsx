import {ButtonHTMLAttributes} from 'react'
import '../styles/roomCodeComponent.scss';
import copyImg from '../assets/images/copy.svg';
import { useState } from 'react';
type RoomCopyProps = {
    code: string;
}

export function CodeRoom(room: RoomCopyProps) {
    function copyRoomCodeForClipBoard() {
        navigator.clipboard.writeText(room.code);
    }
    return (
        <button className="button-code-room" onClick={copyRoomCodeForClipBoard} >
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
            <span>Sala #{room.code}</span>
        </button>
    );
}