import './Lecteur.css';
import { useEffect, useRef } from 'react';


function Lecteur({ musique, playing ,playNext}) {
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

  return (
    <div className="lecteur">
      <img src={musique.imageUrl} alt="cover" />
      <div className="info">
        <h3>{musique.title}</h3>
        <audio ref={audioRef} src={musique.sonUrl} controls autoPlay onEnded={handleEnded} />
      </div>
    </div>
  );
}

export default Lecteur;
