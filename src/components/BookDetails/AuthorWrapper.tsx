import { Fragment, useCallback, useEffect } from "react";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../config/devices";
import { Author } from "../../interfaces/Author";
import { getAuthorById } from "../../services/apis/AuthorAPI";

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
type QueriesResult = {
    author: Author;
};
const AuthorWrapper = ({ authorIds }: AuthorWrapperProps) => {
    const results = useQueries<QueriesResult[]>(
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
                if (response.data) {
                    const { author } = response.data as QueriesResult;
                    if (author) {
                        authorsOptions.push({
                            value: author.author_id,
                            label: author.name,
                        });
                    }
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
                    if (response.data) {
                        const { author } = response.data as QueriesResult;
                        if (author) {
                            return (
                                <Fragment key={author.author_id}>
                                    <AuthorLink
                                        to={`/authors/${author.author_id}`}
                                    >
                                        {author.name || "Unknown"}
                                    </AuthorLink>
                                    {results.indexOf(response) ===
                                    results.length - 1
                                        ? ""
                                        : ", "}
                                </Fragment>
                            );
                        }
                    }
                })}
        </Wrapper>
    );
};

export default AuthorWrapper;
