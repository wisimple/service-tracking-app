import { ClockCircleOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface PointProps {
  size: number;
  index: number;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, index: number) => void;
}

interface PointWrapperProps {
  percentPerItem: number;
}

const PointWrapper = styled.div<PointWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  flex: 1 0 ${({ percentPerItem }) => percentPerItem}%;
  width: ${({ percentPerItem }) => percentPerItem}%;
`;

const Point = ({ size, index, disabled, checked, onChange = () => {} }: PointProps) => {
  const percentPerItem = 100 / size;

  return (
    <PointWrapper percentPerItem={percentPerItem}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onChange={({ target }) => onChange(target.checked, index)}
      />
    </PointWrapper>
  );
};

interface PatternProps {
  initialPattern?: string;
  size?: number;
  onChange: (items: number[]) => void;
}

const PatternWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PasswordPattern = ({ size = 3, initialPattern, onChange }: PatternProps) => {
  const [isAnimating, setisAnimating] = useState(false);
  const [animationIndex, setanimationIndex] = useState(0);
  const [pattern, setpattern] = useState<number[]>(() => {
    return initialPattern?.split(",").map((item) => parseInt(item)) || [];
  });

  const handleChange = (checked: boolean, index: number) => {
    const newPattern = [...pattern];

    if (checked) {
      newPattern.push(index);
    } else {
      newPattern.pop();
    }
    setpattern(newPattern);
    onChange(newPattern);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (initialPattern) {
      setisAnimating(true);
      let localCount = 0;

      interval = setInterval(() => {
        if (localCount < pattern.length) {
          setanimationIndex(localCount);
          console.log(localCount);
          ++localCount;
          setpattern(pattern.filter((_, i) => i < localCount));
        } else {
          setisAnimating(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isAnimating)
    return (
      <>
        <p>
          <ClockCircleOutlined spin /> Desen gösteriliyor
        </p>
        <PatternWrapper>
          {Array.from({ length: size ** 2 }).map((_, i) => {
            const number = i + 1;
            return <Point key={number} size={size} index={number} checked={pattern.includes(number)} />;
          })}
        </PatternWrapper>
      </>
    );

  return (
    <PatternWrapper>
      {Array.from({ length: size ** 2 }).map((_, i) => {
        const number = i + 1;
        return (
          <Point
            key={number}
            size={size}
            index={number}
            disabled={pattern.includes(number) && pattern[pattern.length - 1] !== number}
            onChange={handleChange}
            checked={pattern.includes(number)}
          />
        );
      })}
    </PatternWrapper>
  );
};

export default PasswordPattern;
