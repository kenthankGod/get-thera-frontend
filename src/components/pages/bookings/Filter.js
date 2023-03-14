import React, { useState, useMemo } from 'react';
import therapistData from '../therapists/TherapistData';




function Filter() {
  const [selectedGender, setSelectedGender] = useState('');


  const people = [
    { name: 'John', gender: 'male' },
    { name: 'Jane', gender: 'female' },
    { name: 'Mike', gender: 'male' },
    { name: 'Mary', gender: 'female' },
    { name: 'Dave', gender: 'male' },
  ];


  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const filteredData = useMemo(() => {
    return therapistData.filter(({ gender }) => {
      if (selectedGender === 'male') {
        return gender === 'male';
      } else if (selectedGender === 'female') {
        return gender === 'female';
      } else {
        return true;
      }
    });
  }, [therapistData, selectedGender]);

  return (
    <div>
      <label>
        Show:
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="male">Males</option>
          <option value="female">Females</option>
        </select>
      </label>
      <ul>
        {filteredData.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
