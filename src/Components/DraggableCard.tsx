import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{isDragging: boolean}>`
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  opacity: ${props => props.isDragging ? '0.8' : 'none'};
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}
const DraggableCard = ({toDo, index}: IDraggableCardProps) => {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo}
        </Card>)}
    </Draggable>
  );
};

export default React.memo(DraggableCard);