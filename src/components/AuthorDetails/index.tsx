import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../config/devices";
import { getAuthorById } from "../../services/apis/AuthorAPI";
const AuthorContainer = styled.div`
    background-color: #ffffff;
    padding: 1rem 0.5rem;
    width: 95%;
    margin: auto;
    @media screen and (${devices.phones}) {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
    }
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const AuthorImage = styled.img`
    width: 12rem;
    margin: auto;
    display: block;
    @media screen and (${devices.tablets}) {
        width: 15rem;
    }
`;
const AuthorName = styled.h2`
    text-align: center;
    margin-top: 1rem;
    color: #0079fb;
`;
const Biography = styled.article`
    word-wrap: break-word;
    margin-top: 1rem;
    text-indent: 1rem;
`;
const AuthorDetails = () => {
    const { id } = useParams() as { id: string };
    const { data: author } = useQuery({
        queryFn: () => getAuthorById(id),
        queryKey: [`author${id}`],
    });
    return (
        <div>
            {author && (
                <AuthorContainer>
                    <AuthorImage
                        src={author?.imageUrl || "portrait-placeholder.jpg"}
                        aria-label="authorImage"
                    />
                    <div>
                        <AuthorName role="authorName">{author.name}</AuthorName>
                        <Biography aria-label="biography">
                            {author.biography ||
                                "Author's information is not updated yet."}
                        </Biography>
                    </div>
                </AuthorContainer>
            )}
            {/* author-related books will be showed under */}
        </div>
    );
};

export default AuthorDetails;