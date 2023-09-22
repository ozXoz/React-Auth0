import { useAuth0 } from "@auth0/auth0-react";

function Home(){
    const {user,isAuthenticated,isLoading} =useAuth0();
    if(isLoading){
        return(
            <div>Loading ...</div>
        )
    }
    return(
        isAuthenticated &&(
            <div>
                <img src={user.picture} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone_number_verified}</p>
               
            </div>
        )
    )
}


export default Home;