import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
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
const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  padding: 0 10px;
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 10px 10px;
  background-color: ${props => props.isDraggingOver ? '#dfe6e9' : props.draggingFromThisWith ? '#b2bec3' : 'transparent'};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

const Board = ({boardId, toDos}: IBoardProps) => {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setToDoState = useSetRecoilState(toDoState);
  const onValid = (data: IForm) => {
    const id = Date.now();
    const newToDoState: IToDo = {id, text: data.toDo};
    setToDoState((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newToDoState]
      }
    })
    setValue('toDo', "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('toDo', {required: true})} type="text" placeholder={`input your ${boardId}`}/>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
        <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index}/>)}
          {provided.placeholder}
        </Area>)}
      </Droppable>
    </Wrapper>
  );
};

export default Board;