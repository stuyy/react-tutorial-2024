import { describe, it, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsernameDisplay } from "../components/UsernameDisplay";

describe("UsernameDisplay", () => {
	it("should render username", async () => {
		render(<UsernameDisplay username="ansonthedev" />);
		expect(
			await screen.findByText("ansonthedev", {}, { timeout: 2000 })
		).toBeInTheDocument();
	});
});
