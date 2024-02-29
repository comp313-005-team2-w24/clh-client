import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactSelect, { MultiValue } from "react-select";
import styled from "styled-components";
import { Category } from "../../../interfaces/Category";
import { getAllBooks } from "../../../services/apis/BookAPI";
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
import { addCategory } from "../../../services/apis/CategoryAPI";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../interfaces/Book";
import { Option } from "../../../types/Option.type";
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
const CategoryForm = () => {
    const queryClient = useQueryClient();
    const { data: books, isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: getAllBooks,
    });
    const navigate = useNavigate();
    const { mutateAsync: addCategoryMutation } = useMutation({
        mutationFn: (category: Category) => addCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries("category");
            navigate("/admin/categories");
        },
    });
    const [booksSelected, setBooksSelected] = useState<Partial<Book>[]>([]);
    const [booksSelectionError, setBooksSelectionError] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Category>();
    const onSubmit: SubmitHandler<Category> = async (data, e) => {
        e?.preventDefault();
        await addCategoryMutation({ ...data, books: booksSelected });
    };
    return (
        <CategoryFormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Add a new category</FormTitle>
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
                    options={books?.map((book) => {
                        return {
                            value: book.book_id,
                            label: book.title,
                        } as Option;
                    })}
                    isMulti
                    onChange={(choice: MultiValue<Option>) => {
                        const books = choice.map((option) => {
                            const bookToAdd = { book_id: option.value };
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
