import { useEffect, useState } from "react";
import { ProyectType } from './../../store/types/projectTypes';

function projectTypeValues() {
  const values = Object.keys(ProyectType).filter(k => typeof ProyectType[k as any] === "number"); // ["time", "hits", "value", "results"]
  const keys = values.map(k => ProyectType[k as any]); // [0, 1, 2, 3]

  return values;
}

const SelectProjectType = () => {
  const [defaultPlaceholderText, setPlaceHolderText] = useState('Choose project type')
  const [isDropdownSet, setIsDropdownSet] = useState(false);

  useEffect(() => {
    setIsDropdownSet(false);
  }, []);
  
  //set style from grey (placeholder text) to black(input text) and erase placeholder only on 1rst  option select
  const handleOnChange = () => {
    if (!isDropdownSet) {
      const dropdownWrapper = document.getElementsByClassName('select-dropdown dropdown-trigger')[0];
      dropdownWrapper.setAttribute("style", "color:black;");
      setPlaceHolderText('');
      setIsDropdownSet(true);
      projectTypeValues();
    }
  }

  return(
    <div className="input-field">
      <select id="defaultOption" defaultValue='' onChange={handleOnChange} >
        <option value='' disabled>{defaultPlaceholderText}</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
  );
}

export default SelectProjectType;