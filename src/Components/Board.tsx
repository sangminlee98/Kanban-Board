import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? 'pink' : props.draggingFromThisWith ? 'red' : 'blue'};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({boardId, toDos}: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
        <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => <DraggableCard key={toDo} toDo={toDo} index={index}/>)}
          {provided.placeholder}
        </Area>)}
      </Droppable>
    </Wrapper>
  );
};

export default Board;