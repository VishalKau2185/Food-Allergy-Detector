import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [allergies, setAllergies] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAllergiesChange = (e) => {
    setAllergies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('allergies', allergies);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>Allergen Detector</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Enter Allergies (comma-separated):
            <input type="text" value={allergies} onChange={handleAllergiesChange} />
          </label>
        </div>
        <div>
          <button type="submit">Detect Allergens</button>
        </div>
      </form>
      {result && (
        <div>
          <h2>Results</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
