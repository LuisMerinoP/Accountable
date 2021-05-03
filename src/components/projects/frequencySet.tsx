import { useEffect, useRef, useState } from 'react';

function addClass(selector:string, className:string) {
  const element = document.querySelector(selector);
  element?.classList.add(className);
}

interface ExtendedTimePicker extends M.Timepicker {
  hours: number
}

const FrequencySet =  ( props : { clearLableCallback:() => void }) => {
  const myInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { // timepickers init
    const elem = document.querySelector('.timepicker');
    const options = {
      defaultTime: "00:00",
      showClearBtn: true,
      onOpenStart: () => { 
        // set 12 to 00 in picker
        let timePickerDivs = document.getElementsByClassName('timepicker-tick');
        let twelveDiv = Array.from(timePickerDivs).find(element => element.innerHTML === '12')
        if (twelveDiv) twelveDiv.innerHTML = '00';
        // remove AM PM labels from display
        const ampmLabels = document.querySelector('.timepicker-span-am-pm');
        ampmLabels?.classList.add('hidden');
        if (instance.hours === 12 || !instance.hours || instance.time === '') {
          // set 12 to 00 in digital display
          let hourDigitalDisplay = document.querySelector('.timepicker-span-hours.text-primary');
          if (hourDigitalDisplay) hourDigitalDisplay.innerHTML = '00';
        }
      },
      onSelect:(hour:number, minute:number) => {
        if (hour === 12) {
          // set 12 to 00 in digital display
          let hourDigitalDisplay = document.querySelector('.timepicker-span-hours');
          if (hourDigitalDisplay) hourDigitalDisplay.innerHTML = '00';
        }
      },
      onCloseStart:() => {
        let value = myInputRef.current?.value.replace('AM','').replace('PM','').replace('12','00').replace(/\s/g, "");
        if (value && myInputRef.current) myInputRef.current.value = value;
        props.clearLableCallback();
      }
    }
    if (elem) M.Timepicker.init(elem, options);
    let instance = {} as ExtendedTimePicker;
    if (elem) { instance = M.Timepicker.getInstance(elem) as ExtendedTimePicker; }
  },[props]);

  return (
    <div>
        <input id="timeObjective" type="text" className="timepicker" ref={myInputRef} autoComplete="off"/>
    </div>
  );
}

export default FrequencySet;