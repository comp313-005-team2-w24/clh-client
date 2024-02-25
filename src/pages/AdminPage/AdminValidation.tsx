import { FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import {
    Alert,
    Button,
    ButtonContainer,
    FormContainer,
    FormController,
    FormInput,
    FormLabel,
    FormTitle,
} from "../../components/Form/formStyle.styled";
import { validateToken } from "../../services/apis/AuthenticationAPI";
import { useNavigate } from "react-router";
const Container = styled.div`
    display: flex;
    background-color: rgb(128, 128, 128, 0.3);
    min-height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AdminForm = styled(FormContainer)`
    width: clamp(20rem, 90%, 40rem);
`;
const AdminValidation = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!ref.current?.value) {
            setError("Please enter an admin token");
        } else if (ref.current?.value !== import.meta.env.VITE_ADMIN_TOKEN) {
            setError("Token is invalid");
        } else {
            const response = await validateToken(ref.current.value);
            if (response.permissions === 2) {
                localStorage.setItem("token", ref.current.value);
                navigate(0);
            } else {
                setError("Token is invalid");
            }
        }
    };
    return (
        <Container>
            <AdminForm onSubmit={handleSubmit}>
                <FormTitle>Login as admin</FormTitle>
                {error && <Alert>{error}</Alert>}
                <FormController>
                    <FormLabel>Token</FormLabel>
                    <FormInput
                        type="password"
                        placeholder="Please enter a provided token"
                        ref={ref}
                    />
                </FormController>
                <ButtonContainer>
                    <Button>Submit</Button>
                </ButtonContainer>
            </AdminForm>
        </Container>
    );
};

export default AdminValidation;
