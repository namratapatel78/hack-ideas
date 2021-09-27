import { useContext } from "react";
import likeColored from "../../assets/like-colored.svg";
import like from "../../assets/like.svg";
import Context from "../../context";
import "./Card.css";

const Card = (props) => {
  const context = useContext(Context);

  return (
    <div className='idea-card'>
      <div className='title'>{props.idea.title}</div>
      <div className='description'>{props.idea.description}</div>
      <div className='meta-data'>
        <div className='date-and-votes'>
          <div className='created-date'>
            {new Date(props.idea.creationDate).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className='votes'>
            <img
              className={context.isLoggedIn ? "pointer like-icon" : "like-icon"}
              alt='like'
              src={context.isLoggedIn && props.idea.liked ? likeColored : like}
              onClick={() => {
                if (localStorage.getItem("employeeId")) {
                  props.likeUnlike(props.idea.id);
                }
              }}
            />
            {props.idea.votes}
          </div>
        </div>
        <div className='tags'>
          {props.idea.tags.map((tag, index) => {
            return (
              tag.checked && (
                <div className='tag' key={tag.text + index}>
                  #{tag.text}
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
