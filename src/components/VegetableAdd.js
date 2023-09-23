
import { useState } from "react";

export default function VegetableAdd() {
    const [vegetable, setVegetable] = useState('');

    const handleSubmit = () => {
        // Save vegetable to database or state
    };

    return (
        <div>
            <h2>Add Vegetable</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    value={vegetable} 
                    onChange={e => setVegetable(e.target.value)} 
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
