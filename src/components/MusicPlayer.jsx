import { useEffect, useRef } from "react";

export default function MusicPlayer({ src, isPlaying, volume, loop }) {
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (!src) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
    }
    
    const audio = audioRef.current;
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Autoplay prevented - waiting for user interaction");
        });
      }
    } else {
      audio.pause();
    }
    
    return () => {
      audio.pause();
    };
  }, [isPlaying, src, loop, volume]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  return null;
}