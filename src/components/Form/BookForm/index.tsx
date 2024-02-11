import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { devices } from "../../../config/devices";
import { Book } from "../../../interfaces/Book";
import {
    addNewBook,
    getBookById,
    updateBook,
} from "../../../services/apis/BookAPI";
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
import AuthorSelection from "./AuthorSelection";
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
type BookFormProps = {
    isUpdate?: boolean;
};
const BookForm = ({ isUpdate }: BookFormProps) => {
    const [authorIds, setAuthorIds] = useState<number[]>([]);
    const [authorIdsError, setAuthorIdsError] = useState("");
    const [alert, setAlert] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Book>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // for update book
    const { id } = useParams() as { id: string };
    const { data: bookToUpdate } = useQuery({
        queryFn: () => (isUpdate ? getBookById(id) : undefined),
        queryKey: ["book", id],
        onError: () => {
            navigate("/books");
        },
    });
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
    const { mutateAsync: updateBookMutation } = useMutation({
        mutationFn: (book: Book) => updateBook(book),
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
            if (isUpdate) {
                const updateBookRequest = async () => {
                    const response = await updateBookMutation({
                        ...data,
                        authorIds: authorIds,
                        book_id: Number(id),
                    });
                    if (response) {
                        navigate("/books");
                    }
                };
                void updateBookRequest();
            } else {
                const addBookRequest = async () => {
                    const response = await addNewBookMutation({
                        ...data,
                        authorIds: authorIds,
                    });
                    if (response) {
                        navigate("/books");
                    }
                };
                void addBookRequest();
            }
        }
    };
    const onInvalid = () => {
        if (authorIds.length < 1) {
            setAuthorIdsError("At least one author must be selected");
        }
    };
    useEffect(() => {
        if (bookToUpdate) {
            reset(() => {
                return {
                    ...bookToUpdate,
                };
            });
            setAuthorIds(bookToUpdate.authorIds);
        }
    }, [bookToUpdate, reset]);
    return (
        <Container>
            <FormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <FormTitle>
                    {isUpdate ? "Update book" : "Add a new book"}
                </FormTitle>
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
                        step={0.05}
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                        })}
                    />
                    {errors.price && (
                        <ErrorMessage>{errors.price.message}</ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Book Cover</FormLabel>
                    <FormInput
                        type="text"
                        aria-label="book-cover"
                        {...register("avatar_url")}
                    />
                </FormController>
                {/* Authors Selection Input */}
                <AuthorSelection
                    setAuthorIds={setAuthorIds}
                    errorMessage={authorIdsError}
                    setMessage={setAuthorIdsError}
                    authorIds={authorIds}
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
