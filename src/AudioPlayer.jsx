import React, { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css"; 

const AudioPlayer = ({ audioSrc }) => { //on definit une constante qui va recuperer le son
  const audioRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false);//une constante avec une liste pour set le player en false donc en pause 
  const [progress, setProgress] = useState(0); // pareil mais pour le progress bar
  const [duration, setDuration] = useState(0);  // pareil mais pour la durée du son

  useEffect(() => { //on utilise useEffect pour gerer le son
    const audio = audioRef.current; //on definit une constante qui va recuperer le son
    if (!audio) return; //si pas de son on ne fait rien

    const updateProgress = () => {  // une constante qui va mettre a jour le progress bar
      setProgress(audio.currentTime);    //on set le progress bar a la duree du son
    };

    const setAudioDuration = () => {   // une constante qui va set la duree du son
      if (!audio) return; //si pas de son on ne fait rien
      setDuration(audio.duration); //on set la duree du son
    };
    const handleEnded = () => {  // une constante qui va gerer la fin du son
      setIsPlaying(false);  //on set le player en pause
      setProgress(0); //on reset le progress bar
    };

    audio.addEventListener("timeupdate", updateProgress); //on ajoute un event listener pour mettre a jour le progress bar
    audio.addEventListener("loadedmetadata", setAudioDuration); //on ajoute un event listener pour set la duree du son
    audio.addEventListener("ended", handleEnded); //on ajoute un event listener pour gerer la fin du son


    return () => {
      audio.removeEventListener("timeupdate", updateProgress);   //on enleve l'event listener pour mettre a jour le progress bar
      audio.removeEventListener("loadedmetadata", setAudioDuration); //on enleve l'event listener pour set la duree du son
      audio.removeEventListener("ended", handleEnded); //on enleve l'event listener pour gerer la fin du sonpas trop compris ici
    };
  }, []);

  const togglePlay = async () => { // une constante qui va gerer le play/pause du son
    const audio = audioRef.current;
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play(); // attente du play
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Erreur de lecture audio :", error);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <div className="custom-audio-player">
      <audio ref={audioRef} src={audioSrc}></audio>
      <button onClick={togglePlay} className="play-btn">
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar"
      />
      <div className="time">
        {formatTime(progress)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default AudioPlayer;
