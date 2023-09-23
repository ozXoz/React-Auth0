
import { useState } from "react";

export default function SeasoningAdd() {
    const [seasoning, setSeasoning] = useState('');

    const handleSubmit = () => {
        // Save vegetable to database or state
    };

    return (
        <div>
            <h2>Add SeasoningAdd</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    value={seasoning} 
                    onChange={e => setSeasoning(e.target.value)} 
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
