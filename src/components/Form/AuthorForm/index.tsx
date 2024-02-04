import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { devices } from "../../../config/devices";
import { Author } from "../../../interfaces/Author";
import AuthorCard from "../../AuthorCard";
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
import { addNewAuthor } from "../../../services/apis/AuthorAPI";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
const Container = styled.div`
    width: 80%;
    margin: auto;
    @media screen and (${devices.tablets}) {
        display: grid;
        grid-template-columns: 60% 40%;
        justify-content: center;
        align-items: center;
    }
`;
const Textarea = styled.textarea`
    resize: none;
`;
const AuthorButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const AuthorCardContainer = styled.div`
    margin: auto;
    width: fit-content;
    margin-top: 1rem;
    @media screen and (${devices.tablets}) {
        display: none;
    }
`;
const AutoAuthorCardContainer = styled(AuthorCardContainer)`
    display: none;
    @media screen and (${devices.tablets}) {
        display: flex;
        margin-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;
const SubmitButton = styled(Button)``;
const PreviewButton = styled(Button)`
    @media screen and (${devices.tablets}) {
        display: none;
    }
`;
const AuthorForm = () => {
    const queryClient = useQueryClient();
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm<Author>();
    const [isPreview, setIsPreview] = useState(false);
    const [alert, setAlert] = useState("");
    const { mutateAsync: addNewAuthMutation } = useMutation({
        mutationFn: (author: Author) => {
            return addNewAuthor(author);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authors"] });
        },
        onError: (error: Error) => {
            setAlert(error.message);
        },
    });
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Author> = async (data: Author) => {
        const createdAuthor = await addNewAuthMutation(data);
        if (createdAuthor) {
            navigate("/authors");
        }
    };
    return (
        <Container>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FormTitle>Add new author</FormTitle>
                {alert && <Alert>{alert}</Alert>}
                <FormController>
                    <FormLabel>Name*</FormLabel>
                    <FormInput
                        type="text"
                        aria-label="authorName"
                        {...register("name", {
                            required: "Author name is required",
                            maxLength: 40,
                        })}
                        maxLength={40}
                    />
                    {errors.name && (
                        <ErrorMessage>
                            {errors.name.type &&
                            errors.name.type === "maxLength"
                                ? "Author name must be less than 40 characters"
                                : errors.name.message}
                        </ErrorMessage>
                    )}
                </FormController>
                <FormController>
                    <FormLabel>Image Url</FormLabel>
                    <FormInput
                        type="text"
                        aria-label="imageUrl"
                        placeholder="http://example.com/example.jpg"
                        {...register("imageUrl")}
                    />
                </FormController>
                <FormController>
                    <FormLabel>Biography</FormLabel>
                    <FormInput
                        as={Textarea}
                        rows={6}
                        aria-label="biography"
                        placeholder="Describe something about this author"
                        {...register("biography")}
                    />
                </FormController>
                <ButtonContainer as={AuthorButtonContainer}>
                    <SubmitButton type="submit" aria-label="submit">
                        Submit
                    </SubmitButton>
                    <PreviewButton
                        type="button"
                        onClick={() => {
                            setIsPreview(!isPreview);
                        }}
                        aria-label="preview"
                    >
                        {isPreview ? "Close" : "Preview"}
                    </PreviewButton>
                </ButtonContainer>
            </FormContainer>
            {/* For devices smaller than tablets only */}
            <AutoAuthorCardContainer>
                <AuthorCard author={watch()} isPreview={true} />
            </AutoAuthorCardContainer>
            {isPreview && (
                <AuthorCardContainer>
                    <AuthorCard author={watch()} isPreview={true} />
                </AuthorCardContainer>
            )}
        </Container>
    );
};

export default AuthorForm;
