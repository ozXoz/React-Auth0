import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function VegetableAdd() {
    const [vegetables, setVegetables] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all vegetables on component mount
        const fetchVegetables = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/vegetables');
                setVegetables(response.data);
            } catch (err) {
                setError("Failed to fetch vegetables");
            }
        };

        fetchVegetables();
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
                .map(([key, value]) => [key, parseInt(value, 10)])
                .filter(([_, value]) => !isNaN(value) && value !== undefined)
        );
        
    
        try {
            const response = await axios.post('http://localhost:3000/api/addvegetables', numericQuantities);
            console.log(response.data);
        } catch (error) {
            console.error("Error updating quantities:", error);
        }
    };
    
    

    return (
        <div>
            <h2>Vegetables</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {vegetables.map(veg => (
                    <div key={veg._id} style={{ marginBottom: '15px' }}>
                        <label>{veg.name}</label>
                        <br />
                        <img src={veg.imageUrl} alt={veg.name} style={{ width: '50px', height: '50px', marginRight: '15px' }} />
                        <input 
                            type="number" 
                            value={quantities[veg._id] || ''}
                            onChange={(e) => handleQuantityChange(veg._id, e.target.value)}
                            placeholder="Quantity"
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
