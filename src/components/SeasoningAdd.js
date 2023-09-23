import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function SeasoningAdd() {
    const [seasoning, setSeasoning] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all vegetables on component mount
        const fetchSeasoning = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/seasoning');
                setSeasoning(response.data);
            } catch (err) {
                setError("Failed to fetch seasoning");
            }
        };

        fetchSeasoning();
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
                    const seasoningName = seasoning.find(veg => veg._id === key)?.name;
                    return [seasoningName, parseInt(value, 10)];
                })
                .filter(([name, value]) => name && !isNaN(value) && value !== undefined)
        );
    
        try {
            const response = await axios.post('http://localhost:3000/api/seasoningQuantity', numericQuantities);
            console.log(response.data);
        } catch (error) {
            console.error("Error updating quantities:", error);
        }
    };
    
    
    

    return (
        <div style={styles.container}>
            <h2>Seasoning</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {seasoning.map(sea => (
                    <div key={sea._id} style={styles.card}>
                        <label>{sea.name}</label>
                        <div style={styles.vegContainer}>
                            <img src={sea.imageUrl} alt={sea.name} style={styles.image} />
                            <input 
                                type="number" 
                                value={quantities[sea._id] || ''}
                                onChange={(e) => handleQuantityChange(sea._id, e.target.value)}
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
