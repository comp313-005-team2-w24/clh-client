import styled from "styled-components";

export const FormContainer = styled.form`
    padding: 1rem;
    background-color: #e6ebee;
    border-radius: 10px;
`;
export const FormController = styled.div`
    margin-bottom: 1rem;
`;
export const FormLabel = styled.label`
    width: 100%;
    display: block;
    margin-bottom: 0.2rem;
`;
export const FormInput = styled.input`
    width: 100%;
    padding: 0.3rem 1rem;
    border: none;
    outline: none;
    font-size: inherit;
    border-radius: 10px;
    &:focus {
        outline: solid 1px #983a44;
    }
`;
export const ErrorMessage = styled.span`
    color: #ff5050;
    font-size: 0.8rem;
`;
export const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 0.5rem;
`;
export const ButtonContainer = styled.div`
    width: fit-content;
    margin: auto;
`;
export const Button = styled.button`
    margin: auto;
    padding: 0.5rem 2rem;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #b8cdd7;
    font-size: inherit;
    &:hover {
        background-color: #9ac8dd;
        cursor: pointer;
    }
    &:active {
        background-color: #b8cdd7;
    }
`;
export const LinkContainer = styled.div`
    text-align: center;
    width: 100%;
    margin-bottom: 1rem;
`;
export const Alert = styled.div`
    width: 80%;
    margin: auto;
    background-color: rgb(237, 130, 130, 0.7);
    padding: 0.2rem 0.5rem;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 1rem;
`;
