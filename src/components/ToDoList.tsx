import { useRecoilValue, useRecoilState } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import { useEffect, useState } from "react";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	h1{
		text-align: center;
		margin: 60px 0;
		font-size: 40px;
		color: steelblue;
	}
`;
const CartegoryItem1 = styled.div``;
const CartegoryItem2 = styled.select``;
const Categories = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
	${CartegoryItem1}{
		input[type=text]{
			padding: 8px 20px;
			margin-right: 10px;
			width: 200px;
			border: none;
			border-radius: 15px;
			transition: 0.2s ease-in;
			box-shadow: 2px 2px 4px lightgray;
			&:focus{
				background-color: #e9edff;
			}
		}
		button{
			padding: 8px 12px;
			border-radius: 15px;
			box-shadow: 2px 2px 4px lightgray;
			border: none;
			background-color: steelblue;
			color: white;
			transition: 0.2s ease-in;
			&:hover{
				background-color: #396a92;
			}
		}
	}
	${CartegoryItem2}{
		padding: 8px 20px;
		width: 245px;
		border: none;
		border-radius: 15px;
		box-shadow: 2px 2px 4px lightgray;
	}
`;
const View = styled.div`
	background-color: #e6e7eb;
	padding: 30px;
	margin-top: 30px;
	border-radius: 20px;
	box-shadow: 2px 2px 4px lightgray;
	transition: 0.2s ease-in;
`;


function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const [categories, setCategories] = useRecoilState(categoriesState);

	const onInput = (category: React.FormEvent<HTMLSelectElement>) => {
		setCategory(category.currentTarget.value as any);
	};

	const [newCategory, set_newCategory] = useState<string>("");

	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		set_newCategory(event.currentTarget.value)
	}

	const addCategory = () => {

		if (newCategory) {
			if (categories.includes(newCategory)) {
				return;
			}
			setCategories([...categories, newCategory]);
			setCategory(newCategory);
		}
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	return (
			<Container>
				<h1>To Do List</h1>
				<Categories>
					<CartegoryItem1>
						<form onSubmit={addCategory}>
							<input type="text" placeholder="Add new Category" onChange={onChange} autoComplete="off"/>
							<button type="submit">+</button>
						</form>
					</CartegoryItem1>
					<CartegoryItem2 value={category} onInput={onInput}>
					{categories.map((availableCategory) => (
						<option key={availableCategory} value={availableCategory}>{availableCategory}</option>
					))}
					</CartegoryItem2>
				</Categories>
				<View>
				<CreateToDo />
				{toDos.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
				</View>
			</Container>
	);
}

export default ToDoList;
