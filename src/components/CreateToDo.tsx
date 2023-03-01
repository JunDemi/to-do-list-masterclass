import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const ToDoInput = styled.div`
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	input{
		padding: 8px 20px;
		margin-right: 10px;
		width: 200px;
		border: none;
		border-radius: 15px;
		box-shadow: 2px 2px 4px lightgray;
		transition: 0.2s ease-in;
		&:focus{
				background-color: #e9edff;
		}
	}
	button{
		padding: 8px 12px;
		border-radius: 15px;
		box-shadow: 2px 2px 4px lightgray;
		border: none;
		background-color: #6c5ce7;
		transition: 0.2s ease-in;
		color: white;
		&:hover{
			background-color: #5b4ebd;
		}
	}
`;


interface FormDataInterface {
	toDo: string;
}

function CreateToDo() {
	const { register, handleSubmit, setValue } = useForm<FormDataInterface>();
	const [toDos, setToDos] = useRecoilState(toDoState);
	const category = useRecoilValue(categoryState);

	const onValid = ({ toDo }: FormDataInterface) => {
		setValue("toDo", "");
		setToDos((current) => [{ text: toDo, category, id: Date.now() }, ...current]);
	};

	useEffect(() => {
		localStorage.setItem("toDos", JSON.stringify(toDos));
	}, [toDos]);

	return (
		<ToDoInput>
			<form onSubmit={handleSubmit(onValid)}>
				<input
					{...register("toDo", { required: true })}
					placeholder={`Add ${category}...`}
					autoComplete="off"
				/>
				<button>+</button>
			</form>
		</ToDoInput>
	);
}

export default CreateToDo;
