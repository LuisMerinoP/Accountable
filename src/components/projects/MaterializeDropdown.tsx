import React, { useEffect, useState, useRef } from "react";

const makeOptionItem = function(value: string, key: number) {
  return <option key={key} value={key}>{value}</option>;
};

const MaterializeDropdown = (props: { options: string[], placeholderText:string, onOptionSelect?: (selectedOption:string) => void, isEditOrCreate: 'edit' | 'create' } ) => {
  const [placeholderText, setPlaceHolderText] = useState(props.placeholderText)
  const [isDropdownSet, setIsDropdownSet] = useState(false);
  let selectRef = useRef<HTMLSelectElement>(null);
  
  useEffect(() => {
    const select = selectRef.current;      
    if (select) {
      select.value = props.isEditOrCreate === 'edit' ? '0' : ''
      M.FormSelect.init(select, {
        dropdownOptions: {
          inDuration: 300,
          outDuration: 225,
          constrainWidth: false, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on hover
          alignment: 'left', // Displays dropdown with edge aligned to the left of button 
          coverTrigger: true
        }
      });
      if (props.isEditOrCreate === 'edit') {
        const dropdownWrapper = document.querySelectorAll('.select-dropdown.dropdown-trigger');
        dropdownWrapper?.forEach(ddw => {
          ddw.classList.add('text-black')
        });
      }
    } 
  }, [props.isEditOrCreate]);
  //set style from grey (placeholder text) to black(input text) and erase placeholder only on 1rst  option select
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isDropdownSet) {
      const selectWrapper = event.target.parentElement;
      const dropdownWrapper = selectWrapper?.querySelector('.select-dropdown.dropdown-trigger');
      dropdownWrapper?.classList.add('text-black');
      setPlaceHolderText('');
      setIsDropdownSet(true);      
    }
    if (props.onOptionSelect) props.onOptionSelect(event.target.value);
  }

  return(
    <div>
      {/* //FIXME: selected option on edit needs to be passed as props and not magic value. Need to arrang this info handling with the backend */}
      <select id="defaultOption" defaultValue='' onChange={(event) => handleOnChange(event)} ref={selectRef}>
        <option value='' disabled>{placeholderText}</option>
        {props.options.map(makeOptionItem)}
      </select>
    </div>
    
  );
}

export default MaterializeDropdown;