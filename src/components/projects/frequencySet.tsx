import { useEffect, useRef } from 'react';

function addClass(selector:string, className:string) {
  const element = document.querySelector(selector);
  element?.classList.add(className);
}

const FrequencySet =  ( props : { clearLableCallback:() => void }) => {
  const myInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { // timepickers init
    const elem = document.querySelector('.timepicker');
    const options = {
      defaultTime: "00:00",
      showClearBtn: true,
      onOpenStart: () => { 
        addClass('.timepicker-span-am-pm', 'hidden');
      },
      onCloseStart:() => {
        let value = myInputRef.current?.value.replace('AM','').replace('PM','').replace(/\s/g, "");
        if (value && myInputRef.current) myInputRef.current.value = value;
        props.clearLableCallback();
      }
    }
    if (elem) M.Timepicker.init(elem, options);
  },[props]);

  return (
    <div>
        <input id="timeObjective" type="text" className="timepicker" ref={myInputRef} autoComplete="off"/>
    </div>
  );
}

export default FrequencySet;