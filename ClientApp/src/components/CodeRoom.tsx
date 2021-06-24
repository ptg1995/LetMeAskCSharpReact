import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss';
import copyImg from '../assets/images/copy.svg';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (){

    return(
        <button className="button" >
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
        </button>
    );
}