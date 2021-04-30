import { useEffect, useRef } from 'react';

function addClass(selector:string, className:string) {
  const element = document.querySelector(selector);
  element?.classList.add(className);
}

const FrequencySet =  ( props : { clearLableCallback:() => void }) => {
  const myInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { // timepickers init
    const elems = document.querySelectorAll('.timepicker');
    var options = {
      defaultTime: "00:00",
      showClearBtn: true,
      onOpenStart: () => { 
        // set 12 to 00
        let timePickerDivs = document.getElementsByClassName('timepicker-tick');
        let twelveDiv = Array.from(timePickerDivs).find(element => element.innerHTML === '12')
        if (twelveDiv) twelveDiv.innerHTML = '00';
        // remove AM PM labels from display
        const ampmLabels = document.querySelector('.timepicker-span-am-pm');
        ampmLabels?.classList.add('hidden');
      },
      onCloseStart:() => {
        let value = myInputRef.current?.value.replace('AM','').replace('PM','');
        if (value && myInputRef.current) myInputRef.current.value = value;
        props.clearLableCallback();
      }
    }
    M.Timepicker.init(elems, options);
  },[props]);

  return (
    <div>
        <input id="timeObjective" type="text" className="timepicker" ref={myInputRef}/>
    </div>
  );
}

export default FrequencySet;