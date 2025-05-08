import { useState } from 'react';
import Card from './Card';
import Lecteur from './Lecteur';
import database from './BDD';
import './App.css';

function App() {
  const [playing, setPlaying] = useState(false);
  const [currentMusique, setCurrentMusique] = useState(null);
  const[queue, setQueue] = useState([]); // file d'attente
  const[queueOpen, setQueueOpen] = useState(true); // état d'ouverture de la file d'attente

  const addQueue = (musique) => {
    if (!queue.some(item => item.id === musique.id)) {
      setQueue((prevQueue) => [...prevQueue, musique]);
    } 
  }  
  const removeQueue = (musique) => {
    setQueue((prevQueue) => prevQueue.filter((item) => item.id !== musique.id));
  }
  const playNext = () => {
    if (queue.length > 0) {
      setCurrentMusique(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
    }
  }
  const toggleQueue = () => {
  setQueueOpen(prevState => !prevState);
  }
  return (
    <>
      <div className="card-container">
        {database.map((item, index) => (
          <Card
          key={index}
          musique={item}
          currentMusique={currentMusique}
          setCurrentMusique={setCurrentMusique}
          playing={playing}
          setPlaying={setPlaying}
          addQueue={addQueue}
        />
        
        ))}
      </div>
      {queueOpen && (
      <div className="queue">
        <h2>File d'attente</h2>
        {queue.length === 0 && <p>Aucune musique en attente</p>}
        {queue.map((musique, index) => (
          <div className="queue-item" key={index}>
            <img src={musique.imageUrl} alt={musique.title} />
            <span>{musique.title}</span>
            <button onClick={() => removeQueue(musique)}>✕</button>
          </div>
        ))}
        <button className="toggle-btn" onClick={() => setQueueOpen(false)}>−</button>
      </div>
    )}
    {!queueOpen && (
      <button className="toggle-btn" onClick={() => setQueueOpen(true)}>+</button>
    )}

        {currentMusique && <Lecteur 
                            musique={currentMusique} 
                            playing={playing} 
                            setPlaying={setPlaying} 
                            playNext={playNext}
                            queue={queue}
                            removeQueue={removeQueue}
                            queueOpen={queueOpen}
                            setQueueOpen={toggleQueue}  // Passe ici la fonction toggleQueue

  />
  }
    </>
  );
}


export default App;
