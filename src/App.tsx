import React from 'react';
import styled from 'styled-components';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({destination, source, draggableId}: DropResult) => {
    const copyToDos = [...toDos];
    copyToDos.splice(source.index, 1);
    copyToDos.splice(destination?.index!, 0, draggableId);
    setToDos(copyToDos);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one'>
            {(magic) => (
            <Board ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => <Draggable draggableId={toDo} index={index} key={index}>
                {(magic) => (
                  <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                    {toDo}
                  </Card>)}
              </Draggable>)}
              {magic.placeholder}
            </Board>)}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext> 
  );
}

export default App;