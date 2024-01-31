import React from "react";
import styled from "styled-components";
import { devices } from "../../config/devices";
type AuthorCardProps = {
    name: string;
    imageUrl?: string;
};
const CardContainer = styled.div`
    text-align: center;
    width: 10rem;
    height: 13rem;
    padding: 1rem;
    background-color: #ffffff;
    word-wrap: break-word;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: 0.4s all ease-in-out;
    &:hover {
        scale: 1.05;
        box-shadow: rgba(0, 17, 249, 0.24) 2px 5px 10px;
    }
    @media screen and (${devices.tablets}){
        width: 12rem;
    }
    & img {
        width: 8rem;
        display: block;
        margin: auto;
    }
    & a {
        margin-top: 0.5rem;
        display: block;
        color: rgb(70, 80, 219);
        font-weight: bold;
        text-decoration: underline;
        width: 100%;
    }
`;
const AuthorCard = ({ name }: AuthorCardProps) => {
    return (
        <CardContainer>
            <img src="portrait-placeholder.jpg" />
            <a href="#">{name}</a>
        </CardContainer>
    );
};

export default AuthorCard;
