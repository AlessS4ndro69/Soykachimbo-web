import React, { useState } from 'react';
import data from "../AreaList.json"

const Dropdown = ({handleSelectChange, option}) => {
  const [selectedOption, setSelectedOption] = useState(option);

  const handle = (event) => {
    setSelectedOption(event.target.value);
    handleSelectChange(event);
  }
  /*const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };*/

  return (
    <div>
      <label htmlFor="dropdown">Curso:</label>
      <select id="dropdown" value={selectedOption} onChange={handle}>
        <option value="">Elige una opción</option>
        {data.data.map((item, index) => (
          <option key={item.courseCode} value={item.courseCode}>
            {item.title}
          </option>
        ))}

      </select>
      <p>Seleccionaste: {selectedOption}</p>
    </div>
  );
};

export default Dropdown;
