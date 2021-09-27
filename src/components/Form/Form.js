import { useRef, useState } from "react";
import { TAGS } from "../../constants/constant";
import "./Form.css";

const Form = (props) => {
  const { showAndHideModal } = props;
  const titleRef = useRef("");
  const descRef = useRef("");
  const [tags, setTags] = useState(TAGS);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (titleRef.current.value && descRef.current.value) {
      let ideaObj = {
        id: Math.floor(Math.random() * 100),
        title: titleRef.current.value,
        description: descRef.current.value,
        tags: tags,
        creationDate: new Date().getTime(),
        votes: 0,
      };
      props.addIdea(ideaObj);
      props.showAndHideModal();
    }
  };

  const addTag = (tagId) => {
    const tagsCopy = [...tags];
    tagsCopy.forEach((tag) => {
      if (tag.id === tagId) {
        tag.checked = !tag.checked;
      }
    });
    setTags(tagsCopy);
  };

  const resetForm = (event) => {
    event.preventDefault();
    // showAndHideModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='add-idea'>Add Challenge/Idea</div>
      <div className='flex-div'>
        <span className='label'>Title</span>
        <input
          ref={titleRef}
          className='input-text'
          type='text'
          maxLength='100'
        />
      </div>
      <div className='flex-div'>
        <span className='label'>Description</span>
        <textarea
          ref={descRef}
          className='input-text'
          rows='4'
          cols='50'
          maxLength='500'></textarea>
      </div>
      <div className='flex-div'>
        <span className='label'>Tags</span>
        {tags.map((tag, index) => {
          return (
            <div>
              <input
                key={tag.text + tag.id + index}
                type='checkbox'
                checked={tag.checked}
                onChange={() => {
                  addTag(tag.id);
                }}
              />
              {tag.text}
            </div>
          );
        })}
      </div>
      <div className='actions'>
        <button type='submit'>Add Idea</button>
        {/* <button onClick={resetForm}>Cancel</button> */}
      </div>
    </form>
  );
};

export default Form;
