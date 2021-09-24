import likeColored from "../../assets/like-colored.svg";
import like from "../../assets/like.svg";
import "./Card.css";

const Card = (props) => {
  return (
    <div className='idea-card'>
      <div className='title'>{props.idea.title}</div>
      <div className='description'>{props.idea.description}</div>
      <div className='meta-data'>
        <div className='date-and-votes'>
          <div className='created-date'>
            {props.idea.creationDate.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className='votes'>
            <img
              className='like-icon'
              alt='like'
              src={props.idea.liked ? likeColored : like}
            />
            {props.idea.votes}
          </div>
        </div>
        <div className='tags'>
          {props.idea.tags.map((tag) => {
            return (
              <div className='tag' key={tag}>
                #{tag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
