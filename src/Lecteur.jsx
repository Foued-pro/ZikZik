import './Lecteur.css';
import { useEffect, useRef } from 'react';


function Lecteur({ musique, playing ,playNext, queue, queueOpen, setQueueOpen }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [playing,musique]);

    const handleEnded = () => {
        // play the next song
        playNext();
    };
// Dans ton composant
useEffect(() => {
  console.log('Queue Open changed to:', queueOpen);
}, [queueOpen]); 
    return (
      <div className="lecteur-container">
          <div className="lecteur">
              <img
                  src={musique.imageUrl}
                  alt="cover"
                  className="cover-image"
                  onClick={setQueueOpen}  // Toggle queue visibility on click
              />
              <div className="info">
                  <h3>{musique.title}</h3>
                  <audio
                      ref={audioRef}
                      src={musique.sonUrl}
                      controls
                      autoPlay
                      onEnded={handleEnded}
                  />
              </div>
              {!queueOpen && queue.length > 0 && (
                  <div className="prochaine-musique">
                      <img src={queue[0].imageUrl} alt={queue[0].title} />
                      <span>{queue[0].title}</span>
                  </div>
              )}
          </div>
          {/* Affiche la file d'attente si queueOpen est true */}
          {queueOpen && queue.length > 0 && (
              <div className="queue-list">
                  {queue.map((item, index) => (
                      <div key={index} className="queue-item">
                          <div className="queue-condensed">
                              <img src={item.imageUrl} alt={item.title} />
                              <span>{item.title}</span>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
} 
  export default Lecteur;

