import React, { useEffect, useState } from "react";

type OptionUnionType = string[][number] 
type OptionUnionTypeArray = OptionUnionType[]

const makeOptionItem = function(value: OptionUnionType, key: number) {
  return <option key={key} value={key}>{value}</option>;
};

const MaterializeDropdown = (props: { options: OptionUnionTypeArray } ) => {
  const [defaultPlaceholderText, setPlaceHolderText] = useState('Choose project type')
  const [isDropdownSet, setIsDropdownSet] = useState(false);
  //const values = useProjectTypes();

  useEffect(() => {
    setIsDropdownSet(false);
  }, []);
  
  //set style from grey (placeholder text) to black(input text) and erase placeholder only on 1rst  option select
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isDropdownSet) {
      const dropdownWrapper = event.target.parentElement?.querySelector('.select-dropdown.dropdown-trigger');
      dropdownWrapper?.classList.add('text-black');
      setPlaceHolderText('');
      setIsDropdownSet(true);
    }
  }

  return(
    <div className="input-field col s6">
      <select id="defaultOption" defaultValue='' onChange={(event) => handleOnChange(event)} >
        <option value='' disabled>{defaultPlaceholderText}</option>
        {props.options.map(makeOptionItem)}
      </select>
    </div>
  );
}

export default MaterializeDropdown;