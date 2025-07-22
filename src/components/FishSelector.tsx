import React, { useState } from 'react';
import { fishList } from '../data/fishData';
import { COMMUNITY_WATER_PARAMETERS } from '../data/communityParameters';

const FishSelector = () => {
    const [selectedFish, setSelectedFish] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [customPh, setCustomPh] = useState('');
    const [customKh, setCustomKh] = useState('');
    const [customGh, setCustomGh] = useState('');
    const [tankVolume, setTankVolume] = useState('');

    const handleFishSelection = (fish) => {
        setSelectedFish(prev => prev.includes(fish) ? prev.filter(f => f !== fish) : [...prev, fish]);
    };

    const handleCommunityChange = (event) => {
        const community = COMMUNITY_WATER_PARAMETERS.find(c => c.name === event.target.value);
        setSelectedCommunity(community);
        setCustomPh(community.parameters.ph);
        setCustomKh(community.parameters.kh);
        setCustomGh(community.parameters.gh);
    };

    const handleAnalyze = () => {
        // Simulate sending to AI for analysis
        const parameters = selectedCommunity || { ph: customPh, kh: customKh, gh: customGh };
        const volume = tankVolume ? parseInt(tankVolume) : null;

        console.log('Selected Fish:', selectedFish);
        console.log('Parameters:', parameters);
        console.log('Tank Volume:', volume);
        // Here should be the call to AI endpoint with these selected parameters
    };

    return (
        <div className="fish-selector">
            <h2>Select Fish Combination</h2>
            <div className="fish-list">
                {fishList.map(fish => (
                    <div key={fish.id} className={`fish-card ${selectedFish.includes(fish) ? 'selected' : ''}`} onClick={() => handleFishSelection(fish)}>
                        <img src={fish.img} alt={fish.name} className="fish-image" />
                        <p>{fish.name}</p>
                    </div>
                ))}
            </div>
            <h3>Select Community Parameters or Enter Custom</h3>
            <select onChange={handleCommunityChange}>
                <option value="">Select Community</option>
                {COMMUNITY_WATER_PARAMETERS.map(com => (
                    <option key={com.name} value={com.name}>{com.name}</option>
                ))}
            </select>
            <div className="custom-parameters">
                <label>pH: <input type="number" value={customPh} onChange={e => setCustomPh(e.target.value)} /></label>
                <label>KH: <input type="number" value={customKh} onChange={e => setCustomKh(e.target.value)} /></label>
                <label>GH: <input type="number" value={customGh} onChange={e => setCustomGh(e.target.value)} /></label>
            </div>
            <label>Tank Volume (L): <input type="number" value={tankVolume} onChange={e => setTankVolume(e.target.value)} /></label>
            <button onClick={handleAnalyze} className="analyze-button">Analyze Setup</button>
        </div>
    );
};

export default FishSelector;
