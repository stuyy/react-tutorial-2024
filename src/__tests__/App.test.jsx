import { expect, it, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";
import App from "../App";
import { server } from "../__mocks__/msw/server";
import { http } from "msw";

describe("when there is only 1 user", () => {
	describe("Edit Button is Clicked", () => {
		it("should render save button", async () => {
			render(
				<App
					usersData={[
						{
							id: 1,
							username: "ansonthedev",
							email: "anson@gmail.com",
						},
					]}
				/>
			);
			const editButton = screen.getByRole("button", { name: "Edit" });
			await userEvent.click(editButton);
			const saveButton = screen.getByRole("button", { name: "Save" });
			expect(saveButton).toBeInTheDocument();
		});
		it("should display username & email input fields", async () => {
			render(
				<App
					usersData={[
						{
							id: 1,
							username: "ansonthedev",
							email: "anson@gmail.com",
						},
					]}
				/>
			);
			const editButton = screen.getByRole("button", { name: "Edit" });
			await userEvent.click(editButton);
			expect(screen.getByLabelText("Username:")).toBeInTheDocument();
			expect(screen.getByLabelText("Email:")).toBeInTheDocument();
		});
	});
});

describe("when there are 2 users", () => {
	it("should have two users", () => {
		render(
			<App
				usersData={[
					{
						id: 1,
						username: "ansonthedev",
						email: "anson@gmail.com",
					},
					{
						id: 2,
						username: "michael",
						email: "michael@gmail.com",
					},
				]}
			/>
		);

		expect(screen.getByText("ansonthedev")).toBeInTheDocument();
		expect(screen.getByText("michael")).toBeInTheDocument();
	});

	it("should click edit button for 1st user and display save button", async () => {
		render(
			<App
				usersData={[
					{
						id: 1,
						username: "ansonthedev",
						email: "anson@gmail.com",
					},
					{
						id: 2,
						username: "michael",
						email: "michael@gmail.com",
					},
				]}
			/>
		);
		const userDetails = screen.getByTestId("user-details-1");
		expect(within(userDetails).queryByText("michael")).toBeNull();
		const editBtn = within(userDetails).getByRole("button", { name: "Edit" });
		await userEvent.click(editBtn);
		expect(
			within(userDetails).getByRole("button", { name: "Save" })
		).toBeInTheDocument();
	});

	it("should edit 2nd username and save", async () => {
		render(
			<App
				usersData={[
					{
						id: 1,
						username: "ansonthedev",
						email: "anson@gmail.com",
					},
					{
						id: 2,
						username: "michael",
						email: "michael@gmail.com",
					},
				]}
			/>
		);
		const userDetails = screen.getByTestId("user-details-2");
		await userEvent.click(
			within(userDetails).getByRole("button", { name: "Edit" })
		);
		await userEvent.type(
			within(userDetails).getByLabelText("Username:"),
			"123"
		);
		await userEvent.click(
			within(userDetails).getByRole("button", { name: "Save" })
		);
		expect(within(userDetails).queryByLabelText("Username:")).toBeNull();
		expect(within(userDetails).getByText("michael123")).toBeInTheDocument();
	});
});

describe("rendering context data", () => {
	it("should render correct Email", async () => {
		server.use(
			http.get(
				"https://jsonplaceholder.typicode.com/users/*",
				async ({ params }) => {
					return Response.json({
						id: params.id,
						username: "joshua",
						name: "joshua",
						email: "joshua@yahoo.com",
					});
				}
			)
		);

		render(<App usersData={[]} />);
		await waitFor(async () =>
			expect(
				await screen.findByText("Email: joshua@yahoo.com")
			).toBeInTheDocument()
		);
	});
});
describe("updating UserContext", () => {
	it("should update display name", async () => {
		render(<App usersData={[]} />);
		await userEvent.type(
			screen.getByLabelText("Update Name:"),
			"Jonathan The Dev"
		);
		await userEvent.click(
			screen.getByRole("button", { name: "Save Display Name" })
		);
		expect(
			screen.getByText("Display Name: Jonathan The Dev")
		).toBeInTheDocument();
	});
});
