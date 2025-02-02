import React, { useState} from 'react';

const pets = [
    {
        id: 1,
        name: 'Lethal',
        image: 'assets/gifs/lethal-company-dance.gif',
    },
    {
        id: 2,
        name: 'Rick',
        image: 'assets/gifs/rick.gif'
    },
    {
        id:3,
        name: 'Rem',
        image: 'assets/gifs/rem-re-zero.gif',
    },
    {
        id:4,
        name: 'Fox',
        image: 'assets/gifs/fox.gif'
    }
]

const PetSelection = ({ onSelectPet }) => {
    const [selectedPet, setSelectedPet] = useState(null);


const handleSelect = (pet) => {
    setSelectedPet(pet);
    // Pass seleted pet to Parent component
    onSelectPet(pet); 

};

return (
    <div style={{ textAlign: 'center' }}>
    <h2>Select Your Pet</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {pets.map((pet) => (
            <div
                key={pet.id}
                style={{
                    border: pet === selectedPet ? '3px solid #4caf50' : '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                onClick={() => handleSelect(pet)}
            >
                <img src={pet.image} alt={pet.name} style={{ width: '100px', height: '100px' }} />
                <p>{pet.name}</p>
            </div>
        ))}
    </div>
    {selectedPet && <h3>You selected: {selectedPet.name}</h3>}
</div>
)

};

export default PetSelection;