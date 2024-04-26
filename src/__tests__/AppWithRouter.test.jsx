import { renderWithRouter } from "./utils/helpers";
import { expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("should click on Users link and navigate to users route", async () => {
	renderWithRouter({ initialEntries: ["/"] });
	await userEvent.click(screen.getByRole("link", { name: "Users" }));

	expect(screen.getByText("Welcome to Users Dashboard")).toBeInTheDocument();
});

it("should navigate to /blog-posts and back to /", async () => {
	renderWithRouter({ initialEntries: ["/"] });
	await userEvent.click(screen.getByRole("link", { name: "Blogs" }));
	expect(screen.getByText("Welcome to BlogPosts Page")).toBeInTheDocument();
	await userEvent.click(screen.getByRole("link", { name: "Home" }));
	expect(screen.queryByText("Welcome to BlogPosts Page")).toBeNull();
});
