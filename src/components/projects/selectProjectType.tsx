import { useEffect, useState } from "react";
import { ProyectType } from './../../store/types/projectTypes';

type ProyectTypeKeys = Array<keyof typeof ProyectType | number>;
// type ProyectTypeKeys = (number | "time" | "hits" | "value" | "results")[]

const values = (Object.keys(ProyectType) as ProyectTypeKeys)
  .filter((k): k is keyof typeof ProyectType => typeof ProyectType[k] === "number");
// const values: ("time" | "hits" | "value" | "results")[]

//const keys = values.map(k => ProyectType[k]);
// const keys: ProyectType[]

const makeOptionItem = function(value: ("time" | "hits" | "value" | "results"), key: ProyectType) {
  return <option key={key} value={key}>{value}</option>;
};

const SelectProjectType = () => {
  const [defaultPlaceholderText, setPlaceHolderText] = useState('Choose project type')
  const [isDropdownSet, setIsDropdownSet] = useState(false);

  useEffect(() => {
    setIsDropdownSet(false);
  }, []);
  
  //set style from grey (placeholder text) to black(input text) and erase placeholder only on 1rst  option select
  const handleOnChange = () => {
    if (!isDropdownSet) {
      const dropdownWrapper = document.querySelector('.select-dropdown.dropdown-trigger');
      dropdownWrapper?.classList.add('text-black');
      setPlaceHolderText('');
      setIsDropdownSet(true);
    }
  }

  return(
    <div className="input-field">
      <select id="defaultOption" defaultValue='' onChange={handleOnChange} >
        <option value='' disabled>{defaultPlaceholderText}</option>
        {values.map(makeOptionItem)}
      </select>
    </div>
  );
}

export default SelectProjectType;