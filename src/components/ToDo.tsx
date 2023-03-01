import styled from "styled-components";
import { categoriesState, ToDoInterface, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ToDoItem = styled.div`
	background-color: #7c7c7c;
	border-radius: 14px;
	box-shadow: 2px 2px 4px lightgray;
	width: 70%;
	margin: 15px auto;
`;
const Item1 = styled.div`
	padding: 15px;
	color: white;
`;
const Item2 = styled.div`
	display: grid;
	background-color: white;
	border-bottom-left-radius: 14px;
	border-bottom-right-radius: 14px;
	padding: 10px;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 10px;
	button{
		padding: 8px 15px;
		border-radius: 8px;
		box-shadow: 2px 2px 4px lightgray;
		border: none;
		background-color: #f5f6fa;
		transition: 0.2s ease-in;
		&:hover{
			background-color: #e1e1e4;
		}
	}
`;

function ToDo({ text, category, id }: ToDoInterface) {
	const setToDos = useSetRecoilState(toDoState);
	const categories = useRecoilValue(categoriesState);

	const changeCategory = (selectedCategory: string) => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
			const newToDo = { text, category: selectedCategory, id };

			return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
		});
	};

	return (
		<ToDoItem>
			<Item1>{text}</Item1>
			<Item2>
				{Object.values(categories).map((availableCategory) => (
					availableCategory === category ? null :
						<button
							key={availableCategory}
							onClick={() => changeCategory(availableCategory)}
						>
							{availableCategory} &rarr;
						</button>
				))}
			</Item2>
		</ToDoItem>
	);
}

export default ToDo;
