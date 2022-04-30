import React from 'react';
import styled from 'styled-components';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({destination, source, draggableId}: DropResult) => {
    if(!destination) return;
    if(source.droppableId === destination?.droppableId) {
      const cat = source.droppableId;
      const toDosCopy = [...toDos[cat]];
      const target = toDosCopy.splice(source.index,1);
      toDosCopy.splice(destination.index,0, ...target);
      setToDos((prev) =>  {
        return {
        ...prev,
        [cat]: toDosCopy
        }
      })
    } else if(source.droppableId !== destination?.droppableId) {
      const sourceCat = source.droppableId;
      const destinationCat = destination.droppableId;
      const sourceCatList = [...toDos[sourceCat]];
      const target = sourceCatList.splice(source.index,1);
      const destinationList = [...toDos[destinationCat]];
      destinationList.splice(destination.index,0, ...target);
      setToDos((prev) => {
        return {
          ...prev,
          [sourceCat]: sourceCatList,
          [destinationCat]: destinationList
        }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} toDos={toDos[boardId]} key={boardId}/>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext> 
  );
}

export default App;