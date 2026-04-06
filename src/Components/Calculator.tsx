import { useState } from "react";
import "./Calculator.css";

const colorThemes = {
  pink: {
    primary: "#ec4899",
    hover: "#db2777",
    light: "rgba(236, 72, 153, 0.1)",
  },
  red: {
    primary: "#ef4444",
    hover: "#dc2626",
    light: "rgba(239, 68, 68, 0.1)",
  },
  blue: {
    primary: "#3b82f6",
    hover: "#2563eb",
    light: "rgba(59, 130, 246, 0.1)",
  },
  purple: {
    primary: "#a855f7",
    hover: "#9333ea",
    light: "rgba(168, 85, 247, 0.1)",
  },
  green: {
    primary: "#22c55e",
    hover: "#16a34a",
    light: "rgba(34, 197, 94, 0.1)",
  },
  orange: {
    primary: "#f97316",
    hover: "#ea580c",
    light: "rgba(249, 115, 22, 0.1)",
  },
};

type ColorKey = keyof typeof colorThemes;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [accentColor, setAccentColor] = useState<ColorKey>("pink");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const theme = colorThemes[accentColor];

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const inputPercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let result: number;

      switch (operation) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "×":
          result = currentValue * inputValue;
          break;
        case "÷":
          result = currentValue / inputValue;
          break;
        default:
          result = inputValue;
      }

      setDisplay(result.toString());
      setPreviousValue(result.toString());
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    let result: number;

    switch (operation) {
      case "+":
        result = currentValue + inputValue;
        break;
      case "-":
        result = currentValue - inputValue;
        break;
      case "×":
        result = currentValue * inputValue;
        break;
      case "÷":
        result = currentValue / inputValue;
        break;
      default:
        result = inputValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const Button = ({
    children,
    onClick,
    className = "",
    variant = "default",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: "default" | "operator" | "equals";
  }) => {
    const baseClass = "calc-button";
    const variantClass =
      variant === "operator"
        ? "operator"
        : variant === "equals"
        ? "equals"
        : "";

    return (
      <button
        className={`${baseClass} ${variantClass} ${className}`}
        onClick={onClick}
        style={{
          "--accent-primary": theme.primary,
          "--accent-hover": theme.hover,
          "--accent-light": theme.light,
        } as React.CSSProperties}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={`calculator-wrapper ${isDark ? "dark" : "light"}`}>
      <div className="calculator">
        <div className="calculator-header">
          <h2 className="calculator-title">Calculadora</h2>
          <div className="theme-controls">
            <button
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <div className="color-picker-container">
              <button
                className="color-picker-toggle"
                onClick={() => setShowColorPicker(!showColorPicker)}
                title="Escolher cor de destaque"
                style={{ backgroundColor: theme.primary }}
              >
                <span className="color-dot" />
              </button>
              {showColorPicker && (
                <div className="color-picker">
                  {(Object.keys(colorThemes) as ColorKey[]).map((color) => (
                    <button
                      key={color}
                      className={`color-option ${accentColor === color ? "active" : ""}`}
                      onClick={() => {
                        setAccentColor(color);
                        setShowColorPicker(false);
                      }}
                      style={{ backgroundColor: colorThemes[color].primary }}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="calculator-display">{display}</div>

        <div className="calculator-buttons">
          <Button onClick={clear} className="clear">
            AC
          </Button>
          <Button onClick={toggleSign}>±</Button>
          <Button onClick={inputPercent}>%</Button>
          <Button onClick={() => performOperation("÷")} variant="operator">
            ÷
          </Button>

          <Button onClick={() => inputDigit("7")}>7</Button>
          <Button onClick={() => inputDigit("8")}>8</Button>
          <Button onClick={() => inputDigit("9")}>9</Button>
          <Button onClick={() => performOperation("×")} variant="operator">
            ×
          </Button>

          <Button onClick={() => inputDigit("4")}>4</Button>
          <Button onClick={() => inputDigit("5")}>5</Button>
          <Button onClick={() => inputDigit("6")}>6</Button>
          <Button onClick={() => performOperation("-")} variant="operator">
            −
          </Button>

          <Button onClick={() => inputDigit("1")}>1</Button>
          <Button onClick={() => inputDigit("2")}>2</Button>
          <Button onClick={() => inputDigit("3")}>3</Button>
          <Button onClick={() => performOperation("+")} variant="operator">
            +
          </Button>

          <Button onClick={() => inputDigit("0")} className="zero">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={handleEquals} variant="equals">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
