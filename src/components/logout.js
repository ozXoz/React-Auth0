import { useAuth0 } from "@auth0/auth0-react";

function LogOutButton(){
    const {logout} =useAuth0();

    return(
        <button onClick={()=>logout({return:window.location.origin})}>Logout</button>
    )
}


export default LogOutButton;