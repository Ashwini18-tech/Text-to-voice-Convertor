import React, { useState, useEffect } from "react";

const TextToVoice = () => {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]); // Default voice
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const handleSpeak = () => {
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = selectedVoice;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="container">
            <h1>Text-to-Voice <span>Converter</span></h1>
            <textarea
                placeholder="Enter text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="controls">
                <select onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}>
                    {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
                <button onClick={handleSpeak}>
                    <i className="fas fa-play"></i> Listen
                </button>
            </div>
        </div>
    );
};

export default TextToVoice;
