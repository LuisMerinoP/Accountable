import { useEffect, useState } from "react";
import { ProyectType } from './../../store/types/projectTypes';

type ProyectTypeKeys = Array<keyof typeof ProyectType | number>;
// type ProyectTypeKeys = (number | "time" | "hits" | "value" | "results")[]

const values = (Object.keys(ProyectType) as ProyectTypeKeys)
  .filter((k): k is keyof typeof ProyectType => typeof ProyectType[k] === "number");
// const values: ("time" | "hits" | "value" | "results")[]

const keys = values.map(k => ProyectType[k]);
// const keys: ProyectType[]

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
    }
  }

  return(
    <div className="input-field">
      <select id="defaultOption" defaultValue='' onChange={handleOnChange} >
        <option value='' disabled>{defaultPlaceholderText}</option>
        <option value={keys[0]}>{values[0]}</option>
        <option value={keys[1]}>{values[1]}</option>
        <option value={keys[2]}>{values[2]}</option>
        <option value={keys[3]}>{values[3]}</option>
      </select>
    </div>
  );
}

export default SelectProjectType;