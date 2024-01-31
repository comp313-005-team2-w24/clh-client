import AuthorCard from "../../components/AuthorCard";
import { useQuery } from "react-query";
import { getAllAuthors } from "../../services/apis/AuthorAPI";
import styled from "styled-components";
const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
`;
const AuthorsList = () => {
    const { data: authors } = useQuery({
        queryKey: ["authors"],
        queryFn: () => getAllAuthors(),
    });
    return (
        <Container>
            {authors &&
                authors.map((author) => {
                    return (
                        <AuthorCard name={author.name} key={author.author_id} />
                    );
                })}
        </Container>
    );
};

export default AuthorsList;
