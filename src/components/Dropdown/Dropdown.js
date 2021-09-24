const Dropdown = (props) => {
  console.log(props);
  return (
    <>
      <select {...props}>
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
