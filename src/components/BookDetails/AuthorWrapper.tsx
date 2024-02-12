import { Fragment, useCallback, useEffect } from "react";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Author } from "../../interfaces/Author";
import { getAuthorById } from "../../services/apis/AuthorAPI";
import { devices } from "../../config/devices";

const Wrapper = styled.div`
    text-align: center;
    @media screen and (${devices.tablets}) {
        text-align: left;
    }
`;

const AuthorLink = styled(Link)`
    text-decoration: none;
    color: #00a8fd;
    &:hover {
        text-decoration: underline;
    }
`;
type AuthorWrapperProps = {
    authorIds: number[];
};
type Option = {
    value: number;
    label: string;
};
const AuthorWrapper = ({ authorIds }: AuthorWrapperProps) => {
    const results = useQueries<Author[]>(
        authorIds.map((id) => {
            return {
                queryKey: ["author", id],
                queryFn: () => getAuthorById(id.toString()),
                staleTime: Infinity,
                refetchOnMount: false,
            };
        })
    );
    const saveOptions = useCallback(() => {
        const authorsOptions: Option[] = [];
        if (results) {
            results.forEach((response) => {
                const authorResponse = response.data as Author;
                if (authorResponse) {
                    authorsOptions.push({
                        value: authorResponse.author_id,
                        label: authorResponse.name,
                    });
                }
            });
        }
        localStorage.setItem("temp_options", JSON.stringify(authorsOptions));
    }, [results]);
    useEffect(() => {
        saveOptions();
    }, [saveOptions]);
    return (
        <Wrapper>
            <span>by </span>
            {results &&
                results.map((response) => {
                    const authorResponse = response.data as Author;
                    if (authorResponse) {
                        return (
                            <Fragment key={authorResponse.author_id}>
                                <AuthorLink
                                    to={`/authors/${authorResponse.author_id}`}
                                >
                                    {authorResponse.name || "Unknown"}
                                </AuthorLink>
                                {results.indexOf(response) ===
                                results.length - 1
                                    ? ""
                                    : ", "}
                            </Fragment>
                        );
                    }
                })}
        </Wrapper>
    );
};

export default AuthorWrapper;
