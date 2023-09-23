import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Home(){
    const {user,isAuthenticated,isLoading} =useAuth0();
    const navigate = useNavigate(); // Initialize the navigate function
    if(isLoading){
        return(
            <div>Loading ...</div>
        )
    }
    return(
        isAuthenticated &&(
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone_number_verified}</p>

                <button onClick={() => navigate('/add-vegetable')}>
                    Add Vegetable
                </button>

                <button onClick={() => navigate('/add-seasoning')}>
                    Add Seasoning
                </button>
               
            </div>
        )
    )
}


export default Home;