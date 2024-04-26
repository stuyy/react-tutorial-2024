import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestInputField } from "../components/TestInputField";

it("should find input by placeholder value", () => {
	render(<TestInputField />);
	expect(screen.getByPlaceholderText(/enter data/)).toBeInTheDocument();
});

it("should find input by display value", () => {
	render(<TestInputField />);
	expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
});
