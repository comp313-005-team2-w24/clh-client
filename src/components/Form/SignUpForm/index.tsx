import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../../interfaces/User";
import { createUser } from "../../../services/apis/AuthenticationAPI";
import {
    Alert,
    Button,
    ButtonContainer,
    ErrorMessage,
    FormContainer,
    FormController,
    FormInput,
    FormLabel,
    FormLink,
    FormTitle,
    LinkContainer,
} from "../formStyle.styled";
interface SignUpUser extends User {
    confirmPassword: string;
}
const SignUpForm = () => {
    const [alert, setAlert] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
    } = useForm<SignUpUser>();
    const validateEmail = (email: string) => {
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email);
    };
    const onSubmit = async (data: User) => {
        try {
            const { success, message } = await createUser(data);
            if (success) {
                console.log(message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 500) {
                    setAlert("Something went wrong with server");
                }
                if (error.response?.status === 401) {
                    const errorMessage = error.response.data.error as string;
                    setAlert(
                        errorMessage[0]
                            .toUpperCase()
                            .concat(errorMessage.slice(1))
                    );
                }
            }
        }
    };
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Create new account</FormTitle>
            {alert && <Alert>{alert}</Alert>}
            <FormController>
                <FormLabel>Email</FormLabel>
                <FormInput
                    type="text"
                    {...register("email", {
                        required: "Email is required",
                        validate: (value) => {
                            return validateEmail(value) || "Invalid Email";
                        },
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Password</FormLabel>
                <FormInput
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: 6,
                    })}
                />
                {errors.password && (
                    <ErrorMessage>
                        {errors.password.type === "minLength"
                            ? "Password must be at least 6 characters"
                            : errors.password.message}
                    </ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) => {
                            const { password } = getValues();
                            return (
                                password === value ||
                                "Both password must match"
                            );
                        },
                    })}
                />
                {errors.confirmPassword && (
                    <ErrorMessage>
                        {errors.confirmPassword.message}
                    </ErrorMessage>
                )}
            </FormController>
            <FormController>
                <FormLabel>Username</FormLabel>
                <FormInput
                    type="text"
                    {...register("username", {
                        required: "User name is required",
                        minLength: 3,
                    })}
                />
                {errors.username && (
                    <ErrorMessage>
                        {errors.username.type === "minLength"
                            ? "User name must be more than 3 characters"
                            : errors.username.message}
                    </ErrorMessage>
                )}
            </FormController>
            <LinkContainer>
                <span>
                    Already have an account ?{" "}
                    <FormLink to={"/auth/login"}>Login</FormLink>
                </span>
            </LinkContainer>
            <ButtonContainer>
                <Button type="submit">Sign Up</Button>
            </ButtonContainer>
        </FormContainer>
    );
};

export default SignUpForm;
