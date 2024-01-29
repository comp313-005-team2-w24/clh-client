import { vi } from "vitest";
const axiosMocks = vi.hoisted(() => ({
    post: vi.fn(),
    get: vi.fn()
}));
//mock axios setup
vi.mock("axios", async (importActual) => {
    const actual = await importActual<typeof import("axios")>();
    const mockAxios = {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: axiosMocks.get,
                post: axiosMocks.post,
            })),
        },
    };
    return mockAxios;
});
export default axiosMocks;
