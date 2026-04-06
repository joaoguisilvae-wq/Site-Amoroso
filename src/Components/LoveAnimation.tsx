import { useEffect, useState } from "react";
import "./LoveAnimation.css";

interface FallingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const messages = [
  "Oi meu amor! 😊",
  "Espero que tenha gostado desse sitezinho hehe",
  "Eu te amo mt mt mt tá?",
  "Um dia vamos casar e ter filhinhos!",
  "Te amo ❤️",
];

interface LoveAnimationProps {
  trigger?: boolean;
  onEnd?: () => void;
}

export default function LoveAnimation({ trigger, onEnd }: LoveAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    if (trigger && !showAnimation) {
      setShowAnimation(true);
      setMessageIndex(0);

      // Troca as mensagens
      messages.forEach((_, index) => {
        setTimeout(() => {
          setMessageIndex(index);
        }, (index + 1) * 2000);
      });

      // Chuva de corações no final
      setTimeout(() => {
        const newHearts: FallingHeart[] = [];
        for (let i = 0; i < 100; i++) {
          newHearts.push({
            id: Date.now() + i,
            x: Math.random() * 100,
            size: Math.random() * 25 + 15,
            duration: Math.random() * 3 + 7,
            delay: Math.random() * 3,
          });
        }
        setHearts(newHearts);

        // Adiciona corações continuamente
        const interval = setInterval(() => {
          const additional: FallingHeart[] = [];
          for (let i = 0; i < 15; i++) {
            additional.push({
              id: Date.now() + i,
              x: Math.random() * 100,
              size: Math.random() * 25 + 15,
              duration: Math.random() * 3 + 7,
              delay: 0,
            });
          }
          setHearts((prev) => [...prev, ...additional]);
        }, 600);

        setTimeout(() => clearInterval(interval), 9000);
      }, messages.length * 2000);

      // Finaliza
      setTimeout(() => {
        setShowAnimation(false);
        setMessageIndex(-1);
        setHearts([]);
        onEnd?.();
      }, messages.length * 2000 + 10000);
    }
  }, [trigger, showAnimation, onEnd]);

  if (!showAnimation && hearts.length === 0) return null;

  return (
    <>
      {showAnimation && (
        <div className="love-overlay">
          <div className="love-big-heart">❤️</div>
          {messageIndex >= 0 && (
            <div className="love-message">{messages[messageIndex]}</div>
          )}
        </div>
      )}

      {hearts.length > 0 && (
        <div className="love-rain">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="love-rain-item"
              style={{
                left: `${heart.x}%`,
                fontSize: `${heart.size}px`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}
    </>
  );
}
