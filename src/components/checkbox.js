import React, { useState } from "react";

function CheckBox(props) {
  const [isChecked, setChecked] = useState(false);
  let changeState = () => {
    if (props.collapse) {
      setChecked(!isChecked);
      return;
    }

    props.checkHandle();
  };

  return (
    <label className="switch" htmlFor="checkbox" onClick={changeState}>
      <input
        type="checkbox"
        checked={props.status || isChecked}
        name={props.id}
        onChange={(e) => console.log(e)}
      />
      <div className="slider round"></div>
    </label>
  );
}

export default CheckBox;
