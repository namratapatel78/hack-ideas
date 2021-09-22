import './Home.css';
import like from '../../assets/like.svg';
import likeColored from '../../assets/like-colored.svg';

const Home = () => {
  const ideas = [
    {
      title: 'idea 1',
      description: 'description 1',
      tags: ['feature', 'tech', 'improvement'],
      liked: true,
      votes: 10,
      creationDate: new Date()
    },
    {
      title: 'idea 1',
      description: 'description 1',
      tags: ['feature', 'tech', 'improvement'],
      liked: false,
      votes: 10,
      creationDate: new Date()
    },
    {
      title: 'idea 1',
      description: 'description 1',
      tags: ['feature', 'tech', 'improvement'],
      liked: true,
      votes: 10,
      creationDate: new Date()
    }
  ]

  console.log(ideas)
  return <section className="home-section">
    <button className="add-new">+ Challenge/Idea</button>
    <div className="ideas-list">
      {ideas.length > 0 && ideas.map((idea) => {
        return <div className="idea-card">
          <div className="title">{idea.title}</div>
          <div className="description">{idea.description}</div>
          <div className="meta-data">
            <div className="date-and-votes">
              <div className="created-date">{idea.creationDate.toLocaleString('en-US', { year: "numeric", month: "short", day: "numeric" })}</div>
              <div className="votes"><img className="like-icon" alt="like" src={idea.liked ? likeColored : like}/>{idea.votes}</div>
            </div>
            <div className="tags">
              {idea.tags.map((tag) => {
                return <div className="tag">#{tag}</div>
              })
              }
            </div>
          </div>
        </div>
      })}
    </div>
  </section>
}

export default Home