import styled from "styled-components";
import { categoriesState, ToDoInterface, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";


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
		<li>
			<span>{text}</span>
			<div>
				{Object.values(categories).map((availableCategory) => (
					availableCategory === category ? null :
						<button
							key={availableCategory}
							onClick={() => changeCategory(availableCategory)}
						>
							{availableCategory}
						</button>
				))}
			</div>
		</li>
	);
}

export default ToDo;
