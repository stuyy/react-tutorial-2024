import { useContext, useState } from "react";
import { UserContext } from "../utils/contexts/UserContext";

export function PostContentButtons() {
	const { id, setUserData } = useContext(UserContext);
	const [value, setValue] = useState("");

	return (
		<div>
			<div>
				<h3>PostContentButtons</h3>
			</div>
			{id}
			<br />
			<label htmlFor="updateName">Update Name: </label>
			<input
				id="updateName"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<button
				onClick={() => {
					setUserData((currentState) => ({
						...currentState,
						name: value,
					}));
				}}
			>
				Save Display Name
			</button>
		</div>
	);
}
