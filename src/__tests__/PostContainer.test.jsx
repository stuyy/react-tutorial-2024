import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostContainer } from "../components/PostContainer";
import { UserContext } from "../utils/contexts/UserContext";

describe("render context values", () => {
	const mockUserContextData = {
		id: 1001,
		username: "johnny",
		email: "johnny@gmail.com",
		name: "Johnny",
		setUserData: () => {},
	};

	it("should match snapshot", () => {
		const { container } = render(
			<UserContext.Provider value={mockUserContextData}>
				<PostContainer />
			</UserContext.Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it("should display correct username", () => {
		render(
			<UserContext.Provider value={mockUserContextData}>
				<PostContainer />
			</UserContext.Provider>
		);

		expect(screen.getByText("Username: johnny")).toBeInTheDocument();
	});
});
