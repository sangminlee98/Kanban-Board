import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Schedule = () => {
  // const timeArr = Array.from({ length: 20 }, () => false);
  // const dayArr = Array.from({ length: 5 }, () => 1);
  const arr = Array.from(Array(5), () => Array(20).fill(false));
  const [day, setDay] = useState<boolean[][]>(arr);
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    const onMouseDown = () => {
      setIsMouseDown(true);
    };
    const onMouseUp = () => {
      setIsMouseDown(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });
  return (
    <Container>
      {day.map((time, dayIndex) => {
        return (
          <DayTable key={dayIndex}>
            {time.map((_, timeIndex) => {
              return (
                <TimeCell
                  isMouseDown={isMouseDown}
                  isSelected={day[dayIndex][timeIndex]}
                  key={timeIndex}
                  onMouseOut={() => {
                    if (isMouseDown) {
                      setDay((prev) => {
                        const copyArr = prev;
                        copyArr[dayIndex][timeIndex] =
                          !prev[dayIndex][timeIndex];

                        return copyArr;
                      });
                    }
                  }}
                  onMouseUp={() => {
                    if (isMouseDown) {
                      setDay((prev) => {
                        const copyArr = prev;
                        copyArr[dayIndex][timeIndex] =
                          !prev[dayIndex][timeIndex];
                        return copyArr;
                      });
                    }
                  }}
                />
              );
            })}
          </DayTable>
        );
      })}
    </Container>
  );
};

export default Schedule;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const DayTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TimeCell = styled.div<{ isSelected: boolean; isMouseDown: boolean }>`
  width: 90px;
  height: 30px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${(props) => (props.isSelected ? "red" : "white")};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
