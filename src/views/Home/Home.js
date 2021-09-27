import { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Dropdown from "../../components/Dropdown/Dropdown";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import { FILTERS, IDEAS } from "../../constants/constant";
import "./Home.css";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageNo, setPageNo] = useState(0);
  const [pages, setPages] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");

  const setIdeasList = useCallback(() => {
    let list = JSON.parse(localStorage.getItem("list"));
    let ideas = list.slice(pageNo * pageSize, (pageNo + 1) * pageSize);
    setIdeas(ideas);
  }, [pageNo, pageSize]);

  const sortList = useCallback(() => {
    let listCopy = JSON.parse(localStorage.getItem("list"));
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
    localStorage.setItem("list", JSON.stringify(listCopy));
    setIdeasList();
  }, [setIdeasList, sortBy]);

  useEffect(() => {
    if (!localStorage.getItem("list")) {
      localStorage.setItem("list", JSON.stringify(IDEAS));
    }
    setIdeasList();
    // pagination list
    let totalItems = JSON.parse(localStorage.getItem("list")).length;
    let totalPages = Math.ceil(totalItems / pageSize);
    let pages = [];
    for (let index = 0; index < totalPages; index++) {
      pages.push(index);
    }
    setPages(pages);
  }, []);

  useEffect(() => {
    sortList();
  }, [sortBy, sortList]);

  // Show and hide add Idea form
  const openForm = () => {
    setOpenModal((prev) => {
      return !prev;
    });
  };

  const likeUnlike = (id) => {
    let ideasCopy = [...ideas];
    ideasCopy.forEach((idea) => {
      if (idea.id === id) {
        if (idea.liked) {
          idea.liked = false;
          idea.votes -= 1;
        } else {
          idea.liked = true;
          idea.votes += 1;
        }
      }
    });
    setIdeas(ideasCopy);

    let listCopy = JSON.parse(localStorage.getItem("list"));
    listCopy.forEach((idea) => {
      if (idea.id === id) {
        if (idea.liked) {
          idea.liked = false;
          idea.votes -= 1;
        } else {
          idea.liked = true;
          idea.votes += 1;
        }
      }
      localStorage.setItem("list", JSON.stringify(listCopy));
    });
  };

  const addIdea = (idea) => {
    let listCopy = JSON.parse(localStorage.getItem("list"));
    listCopy.unshift(idea);
    localStorage.setItem("list", JSON.stringify(listCopy));

    if (pageNo === 0) {
      setIdeasList();
    } else {
      setPageNo(0);
    }
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
            return <Card idea={idea} key={idea.id} likeUnlike={likeUnlike} />;
          })}
      </div>
      <div className='pagination'>
        {pages.length > 0 &&
          pages.map((page) => {
            return (
              <span
                key={"page" + page}
                className={page === pageNo ? "highlight" : "pointer"}
                onClick={() => {
                  setPageNo(page);
                }}>
                {page + 1}
              </span>
            );
          })}
      </div>
    </section>
  );
};

export default Home;
