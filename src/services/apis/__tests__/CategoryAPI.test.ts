import { describe, test } from "vitest";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { Book } from "../../../interfaces/Book";
import { Category } from "../../../interfaces/Category";
import { getAllCategories, getCategoryById } from "../CategoryAPI";
beforeEach(() => {
    axiosMocks.get.mockReset();
    axiosMocks.post.mockReset();
    axiosMocks.put.mockReset();
});
describe("Test Category API", () => {
    const relatedBooksTest: Book[] = [
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
    const categoryTestResponse: Category = {
        id: 1,
        name: "test",
        description: "testing",
        books: relatedBooksTest,
    };
    test("Get category by id should call GET and return category with related books", async () => {
        axiosMocks.get.mockResolvedValue({data:categoryTestResponse});
        const category = await getCategoryById(1);
        expect(category).toStrictEqual(categoryTestResponse);
        expect(axiosMocks.get).toHaveBeenCalledWith(`/categories/${1}`);
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
    });
    test("Get all categories should call GET and return a list of categories", async () => {
        const categoryListResponse:Category[] = [];
        categoryListResponse.push(categoryTestResponse);
        axiosMocks.get.mockResolvedValue({data:categoryListResponse});
        const categories = await getAllCategories();
        expect(categories).toStrictEqual(categoryListResponse);
        expect(axiosMocks.get).toHaveBeenCalledWith(`/categories`);
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
    });
});
