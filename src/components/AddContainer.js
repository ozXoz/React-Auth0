import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddContainer() {
    const [container, setContainer] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all container on component mount
        const fetchContainer = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/container');
                setContainer(response.data);
                toast.success("Successfully ordered!"); // Display a success toast
            } catch (err) {
                setError("Failed to fetch container");
                toast.error("Failed to order. Please try again."); // Display an error toast
            }
        };

        fetchContainer();
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const numericQuantities = Object.fromEntries(
            Object.entries(quantities)
                .map(([key, value]) => {
                    // Get the vegetable name using its ID
                    const containerName = container.find(dir => dir._id === key)?.name;
                    return [containerName, parseInt(value, 10)];
                })
                .filter(([name, value]) => name && !isNaN(value) && value !== undefined)
        );
    
        try {
            const response = await axios.post('http://localhost:3000/api/containerQuantity', numericQuantities);
            console.log(response.data);
        } catch (error) {
            console.error("Error updating quantities:", error);
        }
    };
    
    
    

    return (
        <div style={styles.container}>
            <h2>Container</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {container.map(con => (
                    <div key={con._id} style={styles.card}>
                        <label>{con.name}</label>
                        <div style={styles.vegContainer}>
                            <img src={con.imageUrl} alt={con.name} style={styles.image} />
                            <input 
                                type="number" 
                                value={quantities[con._id] || ''}
                                onChange={(e) => handleQuantityChange(con._id, e.target.value)}
                                placeholder="Quantity"
                                style={styles.input}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        padding: '15px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    vegContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
    },
    image: {
        width: '50px',
        height: '50px',
        marginRight: '15px',
        borderRadius: '50%'  // Makes the seasoning image circular
    },
    input: {
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px'
    }
    
};
