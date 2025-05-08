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
      {currentMusique && <Lecteur musique={currentMusique} playing={playing} setPlaying={setPlaying} playNext={playNext} />}
    
      <div className={`queue ${queueOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={() => setQueueOpen(!queueOpen)}>
          {queueOpen ? '❌' : '🡆'}
        </button>

        {queueOpen ? (
          <>
            <h2>File d'attente</h2>
            {queue.map((item, index) => (
              <div key={index} className="queue-item">
                <span>{index + 1}. {item.title}</span>
                <img src={item.imageUrl} alt={item.title} />
                <button onClick={() => removeQueue(item)}>Remove</button>
              </div>
            ))}
          </>
        ) : (
          currentMusique && (
            <div className="queue-collapsed">
              <img src={currentMusique.imageUrl} alt={currentMusique.title} />
              <span>{currentMusique.title}</span>
            </div>
          )
        )}
      </div>
    </>
  );
}


export default App;
