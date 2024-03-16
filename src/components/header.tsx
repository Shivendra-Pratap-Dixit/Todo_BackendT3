import { signIn, signOut, useSession } from "next-auth/react"

export const Header=()=>{
    const {data:session}=useSession();
    return (
        <div className="flex justify-between px-2 py-4 border-b">
            <div>TODO APP</div>
            <div>
                {session?.user ? (
                    <div className="flex flex-row gap-2">
                        <p>{session.user.name}</p>
                        <button onClick={()=>void signOut()}>Sign Out</button>
                    </div>
                ):(
                    <button onClick={()=>void signIn()}>Sign In</button> 
                )}
            </div>
        </div>
    )
}