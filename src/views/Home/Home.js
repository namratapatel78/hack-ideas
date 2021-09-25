// import like from '../../assets/like.svg';
// import likeColored from '../../assets/like-colored.svg';
import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import { FILTERS, IDEAS } from "../../constants/constant";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [list, setList] = useState(IDEAS);
  const [ideas, setIdeas] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageNo, setPageNo] = useState(0);
  const [sortBy, setSortBy] = useState({
    id: "filter-1",
    text: "Creation date ascending",
  });

  const setIdeasList = useCallback(() => {
    let ideas = list.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
    setIdeas(ideas);
  }, [list, pageNo, pageSize]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll, {
      passive: true,
    });
    setIdeasList();
  }, []);

  useEffect(() => {
    setIdeasList();
  }, [pageSize, setIdeasList]);

  const sortList = useCallback(() => {
    let listCopy = [...list];
    switch (sortBy) {
      case "votes-asc":
        listCopy.sort((a, b) => a.votes - b.votes);
        break;
      case "date-desc":
        listCopy.sort((a, b) => {
          return b.creationDate - a.creationDate;
        });
        break;
      case "votes-desc":
        listCopy.sort((a, b) => b.votes - a.votes);
        break;
      default:
        listCopy.sort((a, b) => {
          return a.creationDate - b.creationDate;
        });
    }
    setList(listCopy);
  }, [sortBy]);

  useEffect(() => {
    sortList();
  }, [sortBy, sortList]);

  const onScroll = () => {
    if (bottomVisible()) {
      setPageSize(pageSize * 2);
    }
  };

  const bottomVisible = () => {
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visible + scrollY >= pageHeight;
    return bottomOfPage || pageHeight < visible;
  };

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
      <div className='action-div'>
        <button className='add-new' onClick={openForm}>
          + Challenge/Idea
        </button>
        <div>
          <div className='label'>Sort by</div>
          <Dropdown options={FILTERS} setDropdownvalue={setSortBy} />
        </div>
      </div>

      <div className='ideas-list'>
        {ideas.length > 0 &&
          ideas.map((idea) => {
            return <Card idea={idea} key={idea.id} />;
          })}
      </div>

      <div className='pagination'></div>
    </section>
  );
};

export default Home;
