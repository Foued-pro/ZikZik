import './Card.css';

function Card({ musique,currentMusique, setCurrentMusique,playing, setPlaying, addQueue, }) {

  const handleClick = () => {
    if(currentMusique?.id=== musique.id){
      setPlaying(!playing);
    }else{
      setCurrentMusique(musique);
      setPlaying(true);
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={musique.imageUrl} alt={musique.title} />
      <h2>{musique.title}</h2>
      <p>{musique.description}</p>
      <button onClick={(e) => {e.stopPropagation(); addQueue(musique);}}>Ajouter à la queue</button>
    </div>
  );
}

export default Card;
