import { useRef } from "react";

const Dropdown = (props) => {
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
export default Dropdown;
