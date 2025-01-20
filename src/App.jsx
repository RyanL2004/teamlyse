import { useState } from 'react'
import PetSelection from './components/PetSelection'

function App () {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div>
    <h1>Welcome to MeeTPeT</h1>
    <PetSelection onSelectPet={setSelectedPet} />
    {selectedPet && (
        <p style={{ textAlign: 'center' }}>
            Your pet, {selectedPet.name}, will assist you during meetings!
        </p>
    )}
</div>
  )
};

export default App
