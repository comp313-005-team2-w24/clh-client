import React, { useState } from "react";
import {
    Alert,
    Button,
    ButtonContainer,
    ErrorMessage,
    FormContainer,
    FormController,
    FormInput,
    FormLabel,
    FormTitle,
} from "../formStyle.styled";
import styled from "styled-components";
import AuthorSelection from "./AuthorSelection";
import { SubmitHandler, useForm } from "react-hook-form";
import { Book } from "../../../interfaces/Book";
import { useMutation, useQueryClient } from "react-query";
import { addNewBook } from "../../../services/apis/BookAPI";
import { devices } from "../../../config/devices";
const Container = styled.div`
    width: 95%;
    margin: auto;
    @media screen and (${devices.tablets}) {
        width: 60%;
    }
`;
const Description = styled.textarea`
    resize: none;
`;
const BookForm = () => {
    const [authorIds, setAuthorIds] = useState<number[]>([]);
    const [authorIdsError, setAuthorIdsError] = useState("");
    const [alert, setAlert] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Book>();
    const queryClient = useQueryClient();
    const { mutateAsync: addNewBookMutation } = useMutation({
        mutationFn: (book: Book) => addNewBook(book),
        mutationKey: ["books"],
        onError: (error: Error) => {
            setAlert(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("books");
        },
    });
    const onSubmit: SubmitHandler<Book> = async (data, e) => {
        e?.preventDefault();
        if (authorIds.length < 1) {
            setAuthorIdsError("At least one author must be selected");
        } else {
            const response = await addNewBookMutation({
                ...data,
                authorIds: authorIds,
            });
            if (response) {
                console.log(response);
            }
        }
    };
    const onInvalid = () => {
        if (authorIds.length < 1) {
            setAuthorIdsError("At least one author must be selected");
        }
    };
    return (
        <Container>
            <FormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <FormTitle>Add a new book</FormTitle>
                {alert && <Alert>{alert}</Alert>}
                <FormController>
                    <FormLabel>ISBN</FormLabel>
                    <FormInput
                        type="text"
                        aria-label="isbn"
                        placeholder="ISBN must be unique"
                        {...register("isbn", {
                            required: "ISBN is required",
                        })}
                    />
                    {errors.isbn && (
                        <ErrorMessage>{errors.isbn.message}</ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Title</FormLabel>
                    <FormInput
                        type="text"
                        aria-label="title"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Publication Date</FormLabel>
                    <FormInput
                        type="date"
                        role="date"
                        {...register("publicationDate", {
                            required: "Publication date is required",
                            valueAsDate: true,
                        })}
                    />
                    {errors.publicationDate && (
                        <ErrorMessage>
                            {errors.publicationDate.message}
                        </ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Stock</FormLabel>
                    <FormInput
                        type="number"
                        aria-label="stock"
                        step={1}
                        min={0}
                        {...register("stockQuantity", {
                            valueAsNumber: true,
                            min: 0,
                            required: "Stock quantity is required",
                        })}
                    />
                    {errors.stockQuantity && (
                        <ErrorMessage>
                            {errors.stockQuantity.message}
                        </ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Price (in CAD)</FormLabel>
                    <FormInput
                        type="number"
                        aria-label="price"
                        min={0}
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                        })}
                    />
                    {errors.price && (
                        <ErrorMessage>{errors.price.message}</ErrorMessage>
                    )}
                </FormController>
                {/* Authors Selection Input */}
                <AuthorSelection
                    setAuthorIds={setAuthorIds}
                    errorMessage={authorIdsError}
                    setMessage={setAuthorIdsError}
                />

                <FormController>
                    <FormLabel>Description</FormLabel>
                    <FormInput
                        as={Description}
                        aria-label="description"
                        rows={5}
                        {...register("description")}
                    />
                </FormController>
                <ButtonContainer>
                    <Button type="submit">Submit</Button>
                </ButtonContainer>
            </FormContainer>
        </Container>
    );
};

export default BookForm;
