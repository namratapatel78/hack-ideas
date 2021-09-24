// import like from '../../assets/like.svg';
// import likeColored from '../../assets/like-colored.svg';
import { useState } from "react";
import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import { IDEAS } from "../../constants/constant";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [ideas, setIdeas] = useState(IDEAS);

  // Show and hide add Idea form
  const openForm = () => {
    setOpenModal((prev) => {
      return !prev;
    });
  };

  const addIdea = (idea) => {
    let ideasCopy = [...ideas];
    ideasCopy.unshift(idea);
    setIdeas(ideasCopy);
  };

  const showAndHideModal = () => {
    setOpenModal((prev) => {
      return !prev;
    });
  };

  return (
    <section className='home-section'>
      {openModal && (
        <Modal showAndHideModal={showAndHideModal}>
          <Form addIdea={addIdea} showAndHideModal={showAndHideModal} />
        </Modal>
      )}
      <button className='add-new' onClick={openForm}>
        + Challenge/Idea
      </button>
      <div className='ideas-list'>
        {ideas.length > 0 &&
          ideas.map((idea) => {
            return <Card idea={idea} key={idea.id} />;
          })}
      </div>
    </section>
  );
};

export default Home;
