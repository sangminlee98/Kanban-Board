import React from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import DraggableCard from './Components/DraggableCard';

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

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({destination, source, draggableId}: DropResult) => {
    if(!destination) return;
    setToDos(prev => {
      const toDosCopy = [...prev];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index!, 0, draggableId);
      return toDosCopy;
    })
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one'>
            {(magic) => (
            <Board ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => <DraggableCard key={toDo} toDo={toDo} index={index}/>)}
              {magic.placeholder}
            </Board>)}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext> 
  );
}

export default App;