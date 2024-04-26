import { http } from "msw";

export const handlers = [
	http.get("https://jsonplaceholder.typicode.com/users/*", ({ params }) => {
		return Response.json({
			id: params.id,
			username: "josh",
			name: "josh",
			email: "josh@josh.com",
		});
	}),
];
