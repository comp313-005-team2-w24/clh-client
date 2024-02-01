import { AxiosError, AxiosResponse } from "axios";
import { describe, test } from "vitest";
import { Author } from "../../../interfaces/Author";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { addNewAuthor, getAllAuthors } from "../AuthorAPI";
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
    test("Should call POST and return a created author", async () => {
        const testNewAuthor = testAuthorsResponse[0];
        axiosMocks.post.mockResolvedValue({ data: testNewAuthor });
        const createdAuthor = await addNewAuthor(testNewAuthor);
        expect(axiosMocks.post).toHaveBeenCalledTimes(1);
        expect(axiosMocks.post).toHaveBeenCalledWith(
            "/authors",
            JSON.stringify(testNewAuthor)
        );
        expect(createdAuthor.author_id).toStrictEqual(testNewAuthor.author_id);
    });
    test("Should return error message", async () => {
        axiosMocks.get.mockRejectedValue(testErrorResponse);
        axiosMocks.post.mockRejectedValue(testErrorResponse);
        expect(getAllAuthors()).rejects.toThrow();
        expect(addNewAuthor(testAuthorsResponse[0])).rejects.toThrow();
    });
});
