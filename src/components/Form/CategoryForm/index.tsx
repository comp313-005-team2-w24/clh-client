import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect, { MultiValue } from "react-select";
import styled from "styled-components";
import { Book } from "../../../interfaces/Book";
import { Category } from "../../../interfaces/Category";
import { getAllBooks } from "../../../services/apis/BookAPI";
import {
    addCategory,
    getCategoryById,
    updateCategory,
} from "../../../services/apis/CategoryAPI";
import { Option } from "../../../types/Option.type";
import {
    Button,
    ButtonContainer,
    ErrorMessage,
    FormContainer,
    FormController,
    FormInput,
    FormLabel,
    FormTitle,
} from "../formStyle.styled";
const Description = styled.textarea`
    resize: none;
`;
const CategoryFormContainer = styled(FormContainer)`
    width: clamp(20rem, 95%, 40rem);
    margin: auto;
`;
const CategoryFormButton = styled(Button)`
    display: flex;
    align-items: center;
`;
type CategoryFormProps = {
    isUpdate?: boolean;
};
type UpdateCategoryParams = {
    id: string;
    category: Category;
};
type BookOption = {
    book_id: number;
    title: string;
};
const CategoryForm = ({ isUpdate }: CategoryFormProps) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const { data: books, isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: getAllBooks,
    });
    const { data: categoryToUpdate, isSuccess } = useQuery({
        queryKey: ["category", id],
        queryFn: isUpdate
            ? () => getCategoryById(id as string)
            : () => ({} as Category),
    });
    const navigate = useNavigate();
    const { mutateAsync: updateCategoryMutation } = useMutation({
        mutationFn: (params: UpdateCategoryParams) =>
            updateCategory(params.id, params.category),
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            navigate("/admin/categories");
        },
    });
    const { mutateAsync: addCategoryMutation } = useMutation({
        mutationFn: (category: Category) => addCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            navigate("/admin/categories");
        },
    });
    const [booksSelected, setBooksSelected] = useState<BookOption[]>([]);
    const [booksSelectionError, setBooksSelectionError] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Category>({
        defaultValues: categoryToUpdate,
    });
    const onSubmit: SubmitHandler<Category> = async (data, e) => {
        e?.preventDefault();
        const booksId = booksSelected.map(
            (item) => ({ book_id: item.book_id } as Book)
        );
        if (isUpdate && id) {
            await updateCategoryMutation({
                id: id,
                category: { ...data, books: booksId },
            });
        } else {
            await addCategoryMutation({ ...data, books: booksId });
        }
    };
    useEffect(() => {
        if (isUpdate && isSuccess) {
            reset(categoryToUpdate);
            setBooksSelected(categoryToUpdate?.books as Book[]);
        }
    }, [categoryToUpdate, isSuccess, isUpdate, reset]);
    return (
        <CategoryFormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>
                {isUpdate ? "Update category" : "Add a new category"}
            </FormTitle>
            <FormController>
                <FormLabel>Name*</FormLabel>
                <FormInput
                    type="text"
                    placeholder="Enter name of category"
                    {...register("name", {
                        required: "Name of category is required",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Description</FormLabel>
                <FormInput
                    as={Description}
                    rows={3}
                    {...register("description")}
                />
            </FormController>
            <FormController>
                <FormLabel>Books</FormLabel>
                <ReactSelect
                    isLoading={isLoading}
                    value={booksSelected.map((book) => {
                        return {
                            value: book.book_id,
                            label: book.title,
                        } as Option;
                    })}
                    options={books?.map((book) => {
                        return {
                            value: book.book_id,
                            label: book.title,
                        } as Option;
                    })}
                    isMulti
                    onChange={(choice: MultiValue<Option>) => {
                        const books = choice.map((option) => {
                            const bookToAdd: BookOption = {
                                book_id: option.value,
                                title: option.label,
                            };
                            return bookToAdd;
                        });
                        if (books.length > 0) {
                            setBooksSelectionError("");
                        } else {
                            setBooksSelectionError(
                                "At least one author must be selected"
                            );
                        }
                        setBooksSelected(books);
                    }}
                />
                {booksSelectionError && (
                    <ErrorMessage>{booksSelectionError}</ErrorMessage>
                )}
            </FormController>
            <ButtonContainer>
                <CategoryFormButton>Submit</CategoryFormButton>
            </ButtonContainer>
        </CategoryFormContainer>
    );
};

export default CategoryForm;
