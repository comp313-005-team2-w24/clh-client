import { describe, test } from "vitest";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { Book } from "../../../interfaces/Book";
import { addNewBook, getAllBooks, getBookById, updateBook } from "../BookAPI";
import { AxiosError, AxiosResponse } from "axios";
beforeEach(() => {
    axiosMocks.get.mockReset();
    axiosMocks.post.mockReset();
    axiosMocks.put.mockReset();
});
describe("Book API test", () => {
    const testResponse: Book[] = [
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
    test("Should call GET and display all books in database", async () => {
        axiosMocks.get.mockResolvedValue({ data: testResponse });
        const books = await getAllBooks();
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
        expect(axiosMocks.get).toHaveBeenCalledWith("/books");
        expect(books).toStrictEqual(testResponse);
    });
    test("Should call GET and display a specific book by id", async () => {
        const testBook = testResponse[0];
        axiosMocks.get.mockResolvedValue({ data: testBook });
        const book = await getBookById(testBook.book_id.toString());
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
        expect(axiosMocks.get).toHaveBeenCalledWith(
            `/books/${testBook.book_id}`
        );
        expect(book).toStrictEqual(testBook);
    });
    test("Should call POST and return an new book", async () => {
        const testNewBook = testResponse[0];
        axiosMocks.post.mockResolvedValue({ data: testNewBook });
        const newBook = await addNewBook(testNewBook);
        expect(axiosMocks.post).toHaveBeenCalledTimes(1);
        expect(axiosMocks.post).toHaveBeenCalledWith(
            "/books",
            JSON.stringify(testNewBook),
            configTest
        );
        expect(newBook).toStrictEqual(testNewBook);
    });
    test("Should call PUT and return an updated book", async () => {
        const testUpdatedBook = testResponse[0];
        axiosMocks.put.mockResolvedValue({ data: testUpdatedBook });
        const updatedBook = await updateBook(testUpdatedBook);
        expect(axiosMocks.put).toHaveBeenCalledTimes(1);
        expect(axiosMocks.put).toHaveBeenCalledWith(
            `/books/${testUpdatedBook.book_id}`,
            JSON.stringify(updatedBook),
            configTest
        );
        expect(updatedBook).toStrictEqual(testUpdatedBook);
    });
    test("Should return error message", async () => {
        axiosMocks.get.mockRejectedValue(testErrorResponse);
        axiosMocks.post.mockRejectedValue(testErrorResponse);
        axiosMocks.put.mockRejectedValue(testErrorResponse);
        expect(getAllBooks()).rejects.toThrow();
        expect(getBookById("1")).rejects.toThrow();
        expect(addNewBook(testResponse[0])).rejects.toThrow();
        expect(updateBook(testResponse[0])).rejects.toThrow();
    });
});
