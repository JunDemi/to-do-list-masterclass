import { useRecoilValue, useRecoilState } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import { useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";


function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const [categories, setCategories] = useRecoilState(categoriesState);

	const onClick = (category: React.FormEvent<HTMLSelectElement>) => {
		setCategory(category.currentTarget.value as any);
	};

	const addCategory = () => {
		const newCategory = prompt("New Category name", "");

		if (newCategory) {
			setCategories([...categories, newCategory]);
			setCategory(newCategory);
		}
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	return (
		<>
			<div>
				<header>
					<h1>To Do List</h1>
				</header>
				<div>
					<select value={category} onInput={onClick}>
					{categories.map((availableCategory) => (
						<option key={availableCategory} value={availableCategory}>{availableCategory}</option>
					))}
					</select>
					<div>
						<button onClick={addCategory}>+</button>
					</div>
				</div>
				<hr />
				<CreateToDo />
				{toDos.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</div>
		</>
	);
}

export default ToDoList;
