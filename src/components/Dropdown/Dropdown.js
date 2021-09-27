import React, { useRef } from "react";

const Dropdown = (props) => {
  console.log("Dropdown");
  const dropdownRef = useRef("");

  const handleChange = () => {
    props.setDropdownvalue(dropdownRef.current.value);
  };

  return (
    <>
      <select ref={dropdownRef} onChange={handleChange}>
        {props.options &&
          props.options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
      </select>
    </>
  );
};
export default React.memo(Dropdown);
