import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../../utils/constants";
import { render } from "@testing-library/react";

export const renderWithRouter = ({ initialEntries = [], initialIndex = 0 }) => {
	const router = createMemoryRouter(routes, {
		initialEntries,
		initialIndex,
	});

	return render(<RouterProvider router={router} />);
};
