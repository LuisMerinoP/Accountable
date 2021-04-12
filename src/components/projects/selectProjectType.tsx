import { useRef, useEffect, useState } from "react";

const SelectProjectType = () => {
  const [defaultPlaceholderText, setPlaceHolderText] = useState('Choose project type')
  const defaultOption = useRef(null);
  const selectCounter = 0; 

  useEffect(() => {

  }, [selectCounter]);

  return(
    <div className="input-field">
      <label htmlFor="title">{defaultPlaceholderText}</label>
      <select defaultValue='' onChange={() => setPlaceHolderText('')} >
        <option value="" disabled ref={defaultOption}></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
  );
}

export default SelectProjectType;