import { useRef } from "react";
import { TAGS } from "../../constants/constant";
import Dropdown from "../Dropdown/Dropdown";
import "./Form.css";

const Form = (props) => {
  const { showAndHideModal } = props;
  const titleRef = useRef("");
  const descRef = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (titleRef.current.value && descRef.current.value) {
      let ideaObj = {
        title: titleRef.current.value,
        description: descRef.current.value,
        tags: ["feature"],
        creationDate: new Date(),
        votes: 0,
      };
      props.addIdea(ideaObj);
      props.showAndHideModal();
    }
  };

  const resetForm = (event) => {
    console.log(event);
    event.preventDefault();
    // showAndHideModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='add-idea'>Add Challenge/Idea</div>
      <div className='flex-div'>
        <span className='label'>Title</span>
        <input ref={titleRef} className='input-text' type='text' />
      </div>
      <div className='flex-div'>
        <span className='label'>Description</span>
        <textarea
          ref={descRef}
          className='input-text'
          rows='4'
          cols='50'></textarea>
      </div>
      <div className='flex-div'>
        <span className='label'>Tags</span>
        <Dropdown options={TAGS} />
      </div>
      <div className='actions'>
        <button type='submit'>Add Idea</button>
        <button onClick={resetForm}>Cancel</button>
      </div>
    </form>
  );
};

export default Form;
