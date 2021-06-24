import {ReactNode, useState, useEffect, createContext} from 'react'
import { auth, firebase } from '../services/firebase';

type User = {
    id:string;
    name: string;
    avatar: string;
}
  
type AuthContextType = {
    userData: User | undefined;
    signInWithGoogle: ()=> Promise<void> ;
} 

type AuthContextProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType); 

export function AuthContextPRovider(props: AuthContextProviderProps) {

    const [userData, setUserData] = useState<User>();

    useEffect(()=>{
      const unsubriscribe = auth.onAuthStateChanged(user=>{
        if(user){
          const {displayName, photoURL, uid} = user
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account.");
          }
          setUserData({
            id: uid,
            name: displayName,
            avatar: photoURL,
          })
        }
      })
  
      return() =>{
        unsubriscribe();
      }
    }, []);
  
    async function signInWithGoogle(){
  
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
  
        if(result.user){
          const {displayName, photoURL, uid} = result.user
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google Account.");
          }
          setUserData({
            id: uid,
            name: displayName,
            avatar: photoURL,
          })
        }
    }
    return(
        <AuthContext.Provider value={{userData, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
} 