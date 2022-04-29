import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}
const DraggableCard = ({toDo, index}: IDraggableCardProps) => {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo}
        </Card>)}
    </Draggable>
  );
};

export default React.memo(DraggableCard);