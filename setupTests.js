import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup, configure } from "@testing-library/react";
import { server } from "./src/__mocks__/msw/server";
import "@testing-library/jest-dom/vitest";

configure({ asyncUtilTimeout: 5000 });

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
