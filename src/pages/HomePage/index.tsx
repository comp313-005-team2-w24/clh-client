import { useQuery } from "react-query";
import BookCollection from "../../components/BookCollection";
import Navbar from "../../components/Navbar";
import { getAllCategories } from "../../services/apis/CategoryAPI";
import styled from "styled-components";
const Main = styled.main`
    margin-top: 1rem;
    padding-bottom: 1rem;
`;
const BookCollectionContainer = styled.div`
    margin-bottom: 1rem;
`;
const HomePage = () => {
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    return (
        <>
            <header>
                <Navbar />
            </header>
            <Main>
                <div>
                    <BookCollectionContainer>
                        <BookCollection />
                    </BookCollectionContainer>
                    {categories?.map((category) => {
                        if (category.books && category.books.length > 0) {
                            return (
                                <BookCollectionContainer key={category.id}>
                                    <BookCollection categoryId={category.id} />
                                </BookCollectionContainer>
                            );
                        }
                    })}
                </div>
            </Main>
        </>
    );
};

export default HomePage;
