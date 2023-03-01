import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

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
		<form onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", { required: true })}
				placeholder={`Add ${category}...`}
			/>
			<button>add</button>
		</form>
	);
}

export default CreateToDo;
