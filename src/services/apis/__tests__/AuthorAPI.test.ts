import { describe, test } from "vitest";
import { Author } from "../../../interfaces/Author";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { getAllAuthors } from "../AuthorAPI";
import { AxiosError, AxiosResponse } from "axios";
beforeEach(() => {
    axiosMocks.post.mockReset();
    axiosMocks.get.mockReset();
});

describe("Author API test", () => {
    const testAuthorsResponse: Author[] = [
        {
            author_id: 1,
            name: "test",
            biography: "testing",
        },
    ];
    const testErrorResponse = {} as AxiosError;
    testErrorResponse.response = {
        status: 500,
    } as AxiosResponse;
    test("Should call GET and display all authors data", async () => {
        axiosMocks.get.mockResolvedValue({ data: testAuthorsResponse });
        const authors = await getAllAuthors();
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
        expect(axiosMocks.get).toHaveBeenCalledWith("/authors");
        expect(authors).toStrictEqual(testAuthorsResponse);
    });
    test("Should return error message", async () => {
        axiosMocks.get.mockRejectedValue(testErrorResponse);
        expect(getAllAuthors()).rejects.toThrow();
    });
});
