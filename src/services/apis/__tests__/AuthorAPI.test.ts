import { AxiosError, AxiosResponse } from "axios";
import { describe, test, vi } from "vitest";
import { Author } from "../../../interfaces/Author";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { addNewAuthor, getAllAuthors, getAuthorById } from "../AuthorAPI";
import { Book } from "../../../interfaces/Book";
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
    const testToken = "test";
    const configTest = {
        headers: {
            Authorization: `Bearer ${testToken}`,
        },
    };
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => testToken);
    vi.stubEnv("VITE_ADMIN_TOKEN", testToken);
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
            JSON.stringify(testNewAuthor),
            configTest
        );
        expect(createdAuthor.author_id).toStrictEqual(testNewAuthor.author_id);
    });
    test("Should call Get and return an author with corresponding books", async () => {
        const booksTest: Book[] = [
            {
                book_id: 1,
                title: "test",
                description: "test",
                isbn: "abc123",
                publicationDate: "01-01-2001",
                price: 19.12,
                stockQuantity: 200,
                authorIds: [1],
            },
        ];
        axiosMocks.get.mockResolvedValue({
            data: { author: testAuthorsResponse[0], books: booksTest },
        });
        const { author, books } = await getAuthorById("1");
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
        expect(axiosMocks.get).toHaveBeenCalledWith("/authors/id/1");
        expect(author).toStrictEqual(testAuthorsResponse[0]);
        expect(books).toStrictEqual(booksTest);
        expect(author.author_id).toStrictEqual(
            testAuthorsResponse[0].author_id
        );
    });
    test("Should return error message", async () => {
        axiosMocks.get.mockRejectedValue(testErrorResponse);
        axiosMocks.post.mockRejectedValue(testErrorResponse);
        expect(getAllAuthors()).rejects.toThrow();
        expect(addNewAuthor(testAuthorsResponse[0])).rejects.toThrow();
        expect(getAuthorById("testId")).rejects.toThrow();
    });
});
