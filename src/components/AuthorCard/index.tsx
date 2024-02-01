import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { devices } from "../../config/devices";
type AuthorCardProps = {
    name: string;
    imageUrl?: string;
    isPreview?: boolean;
};
const CardContainer = styled.div`
    text-align: center;
    width: 12rem;
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
    @media screen and (${devices.tablets}) {
        width: 14rem;
    }
    & img {
        width: 8rem;
        height: 8rem;
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
const LIMIT_CHARACTER = 28;
const AuthorCard = ({ name, imageUrl, isPreview }: AuthorCardProps) => {
    return (
        <CardContainer>
            <img
                src={imageUrl || "portrait-placeholder.jpg"}
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "portrait-placeholder.jpg";
                }}
            />
            <a href={isPreview ? undefined : "#"}>
                {name.length > LIMIT_CHARACTER ? name.slice(0, LIMIT_CHARACTER) : name}
            </a>
        </CardContainer>
    );
};

export default AuthorCard;
