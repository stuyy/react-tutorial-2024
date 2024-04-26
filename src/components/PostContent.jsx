import { useContext } from "react";
import { PostContentButtons } from "./PostContentButtons";
import { UserContext } from "../utils/contexts/UserContext";

export function PostContent() {
	const userContextData = useContext(UserContext);

	return (
		<div>
			<div>
				<h3>PostContent</h3>
			</div>
			<PostContentButtons />
			{userContextData.email}
		</div>
	);
}
