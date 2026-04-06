import { useState } from "react";
import "./HeartRain.css";

interface FallingItem {
  id: number;
  x: number;
  type: "heart" | "star";
  size: number;
  duration: number;
  delay: number;
}

export default function HeartRain() {
  const [isRaining, setIsRaining] = useState(false);
  const [items, setItems] = useState<FallingItem[]>([]);

  const startRain = () => {
    if (isRaining) return;
    setIsRaining(true);

    const newItems: FallingItem[] = [];
    for (let i = 0; i < 50; i++) {
      newItems.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        type: Math.random() > 0.5 ? "heart" : "star",
        size: Math.random() * 20 + 15,
        duration: Math.random() * 3 + 7,
        delay: Math.random() * 3,
      });
    }
    setItems(newItems);

    setTimeout(() => {
      setIsRaining(false);
      setItems([]);
    }, 10000);

    // Adiciona corações e estrelas continuamente
    const interval = setInterval(() => {
      const additionalItems: FallingItem[] = [];
      for (let i = 0; i < 10; i++) {
        additionalItems.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          type: Math.random() > 0.5 ? "heart" : "star",
          size: Math.random() * 20 + 15,
          duration: Math.random() * 3 + 7,
          delay: 0,
        });
      }
      setItems((prev) => [...prev, ...additionalItems]);
    }, 800);

    setTimeout(() => clearInterval(interval), 9000);
  };

  return (
    <div className="rain-container">
      <button className="rain-button" onClick={startRain} disabled={isRaining}>
        {isRaining ? "✨ Chuvendo... ✨" : " Faça Chover uhahahaha "}
      </button>

      {isRaining && (
        <div className="rain-effects">
          {items.map((item) => (
            <span
              key={item.id}
              className={`rain-item ${item.type}`}
              style={{
                left: `${item.x}%`,
                fontSize: `${item.size}px`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.type === "heart" ? "❤️" : "⭐"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
