import { useEffect, useState, useRef } from "react";
import "./HeartEffect.css";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  tx?: string;
  ty?: string;
  isExplosion?: boolean;
}

export default function HeartEffect() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const lastHeartTime = useRef(0);

  useEffect(() => {
    const createHeart = (x: number, y: number, tx?: string, ty?: string) => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 60 - 30,
        tx,
        ty,
        isExplosion: !!tx && !!ty,
      };

      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastHeartTime.current > 50) {
        createHeart(e.clientX, e.clientY);
        lastHeartTime.current = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 360;
        const distance = Math.random() * 80 + 60;
        const tx = Math.cos(angle * (Math.PI / 180)) * distance;
        const ty = Math.sin(angle * (Math.PI / 180)) * distance;

        createHeart(x, y, `${tx}px`, `${ty}px`);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={`heart ${heart.isExplosion ? "explode" : ""}`}
          style={
            {
              left: heart.x,
              top: heart.y,
              width: heart.size,
              height: heart.size,
              "--tx": heart.tx,
              "--ty": heart.ty,
              "--rotation": `${heart.rotation}deg`,
            } as React.CSSProperties
          }
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
