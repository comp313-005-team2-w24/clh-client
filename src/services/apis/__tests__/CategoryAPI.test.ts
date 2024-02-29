import { describe, test } from "vitest";
import axiosMocks from "../../../mocks/axiosMockInstance";
import { Book } from "../../../interfaces/Book";
import { Category } from "../../../interfaces/Category";
import {
    addCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../CategoryAPI";
beforeEach(() => {
    axiosMocks.get.mockReset();
    axiosMocks.post.mockReset();
    axiosMocks.put.mockReset();
    axiosMocks.delete.mockReset();
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
    const testToken = "test";
    const configTest = {
        headers: {
            Authorization: `Bearer ${testToken}`,
        },
    };
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => testToken);
    vi.stubEnv("VITE_ADMIN_TOKEN", testToken);
    test("Get category by id should call GET and return category with related books", async () => {
        axiosMocks.get.mockResolvedValue({ data: categoryTestResponse });
        const category = await getCategoryById(1);
        expect(category).toStrictEqual(categoryTestResponse);
        expect(axiosMocks.get).toHaveBeenCalledWith(`/categories/${1}`);
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
    });
    test("Get all categories should call GET and return a list of categories", async () => {
        const categoryListResponse: Category[] = [];
        categoryListResponse.push(categoryTestResponse);
        axiosMocks.get.mockResolvedValue({ data: categoryListResponse });
        const categories = await getAllCategories();
        expect(categories).toStrictEqual(categoryListResponse);
        expect(axiosMocks.get).toHaveBeenCalledWith(`/categories`);
        expect(axiosMocks.get).toHaveBeenCalledTimes(1);
    });
    test("Add category should call POST and return a new category", async () => {
        axiosMocks.post.mockResolvedValue({ data: categoryTestResponse });
        const category = await addCategory(categoryTestResponse);
        expect(category).toStrictEqual(categoryTestResponse);
        expect(axiosMocks.post).toHaveBeenCalledWith(
            `/categories`,
            JSON.stringify(categoryTestResponse),
            configTest
        );
        expect(axiosMocks.post).toHaveBeenCalledTimes(1);
    });
    test("Update category should call PUT and return the updated category", async () => {
        axiosMocks.put.mockResolvedValue({ data: categoryTestResponse });
        const updatedCategory = await updateCategory(
            categoryTestResponse.id,
            categoryTestResponse
        );
        expect(updatedCategory).toStrictEqual(categoryTestResponse);
        expect(axiosMocks.put).toHaveBeenCalledWith(
            `/categories/${categoryTestResponse.id}`,
            JSON.stringify(categoryTestResponse),
            configTest
        );
        expect(axiosMocks.put).toHaveBeenCalledTimes(1);
    });
    test("Delete category should call DELETE and return the deleted category", async () => {
        axiosMocks.delete.mockResolvedValue({ data: categoryTestResponse });
        const deletedCategory = await deleteCategory(categoryTestResponse.id);
        expect(deletedCategory).toStrictEqual(categoryTestResponse);
        expect(axiosMocks.delete).toHaveBeenCalledWith(
            `/categories/${categoryTestResponse.id}`,
            configTest
        );
        expect(axiosMocks.delete).toHaveBeenCalledTimes(1);
    });
});
