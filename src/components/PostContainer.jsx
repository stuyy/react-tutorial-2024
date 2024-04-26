import { useContext } from "react";
import { PostContent } from "./PostContent";
import { UserContext } from "../utils/contexts/UserContext";

export function PostContainer() {
	const userContextData = useContext(UserContext);

	return (
		<div>
			<div>
				<h2>PostContainer</h2>
			</div>
			<div>Display Name: {userContextData.name}</div>
			<div>ID: {userContextData.id}</div>
			<div>Email: {userContextData.email}</div>
			<div>Username: {userContextData.username}</div>
			<PostContent />
		</div>
	);
}
