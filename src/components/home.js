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
    return (
        isAuthenticated && (
            <div style={styles.container}>
                <img src={user.picture} alt={user.name} style={styles.userImage} />
                <h2 style={styles.userInfo}>{user.name}</h2>
                <p style={styles.userInfo}>{user.email}</p>
                <p style={styles.userInfo}>{user.phone_number_verified}</p>

                <button style={styles.button} onClick={() => navigate('/add-vegetable')}>
                    Add Vegetable
                </button>

                <button style={styles.button} onClick={() => navigate('/add-seasoning')}>
                    Add Seasoning
                </button>

                <button style={styles.button} onClick={() => navigate('/add-drink')}>
                    Add Drink
                </button>

                <button style={styles.button} onClick={() => navigate('/add-cleaning')}>
                    
                    Add Cleaning
                </button>

                <button style={styles.button} onClick={() => navigate('/add-container')}>
                    Add Container
                </button>
            </div>
        )
    );
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Roboto', sans-serif",  // A popular modern font
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '50px auto',
        backgroundColor: '#f8f9fa', // light gray background
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // subtle shadow
    },
    userImage: {
        width: '120px',
        height: '120px',
        borderRadius: '60%',
        objectFit: 'cover',
        marginBottom: '25px'
    },
    userInfo: {
        fontSize: '20px',
        margin: '10px 0',
        color: '#333' // dark gray text
    },
    button: {
        backgroundColor: '#007BFF',
        background: 'linear-gradient(90deg, #007BFF 0%, #0047ab 100%)', // gradient background
        color: 'white',
        padding: '12px 25px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'all 0.3s',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // 3D shadow
        position: 'relative', // Necessary for the 3D effect on hover

        // A pseudo-element for an additional 3D effect
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            height: '5px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '0 0 5px 5px',
            transform: 'scaleX(0.98)', // slight squeeze
            transition: 'all 0.3s'
        },

        '&:hover': {
            backgroundColor: '#0056b3',
            background: 'linear-gradient(90deg, #0056b3 0%, #003478 100%)',
            transform: 'translateY(-3px)', // Slight lift effect
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',

            '&:before': {
                height: '8px', // Increase the pseudo-element height to enhance the 3D effect
            }
        }
    }
};




export default Home;