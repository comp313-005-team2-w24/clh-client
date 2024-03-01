import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../config/devices";
import { Category } from "../../interfaces/Category";
const Container = styled.ul`
    list-style: none;
    margin-left: 0.3rem;
    display: none;
    @media screen and (${devices.tablets}) {
        display: block;
        min-height: 18rem;
    }
`;
const CategoryItem = styled.li<{ $isActive?: boolean }>`
    color: ${(props) => (props.$isActive ? "#00a4b6" : "#000000")};
    font-weight: ${(props) => (props.$isActive ? "500" : "300")};
    &:hover {
        cursor: pointer;
        color: #00a4b6;
    }
`;
type CategoriesPickProps = {
    categories: Category[];
};
const CategoriesPick = ({ categories }: CategoriesPickProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    return (
        <Container>
            <CategoryItem
                $isActive={!categoryId}
                onClick={() => {
                    setSearchParams((prev) => {
                        prev.delete("categoryId");
                        return prev;
                    });
                }}
            >
                All
            </CategoryItem>
            <>
                {categories.map((category) => {
                    return (
                        <CategoryItem
                            key={category.id}
                            $isActive={categoryId === category.id.toString()}
                            onClick={() => {
                                setSearchParams((prev) => {
                                    prev.set(
                                        "categoryId",
                                        category.id.toString()
                                    );
                                    return prev;
                                });
                            }}
                        >
                            {category.name}
                        </CategoryItem>
                    );
                })}
            </>
        </Container>
    );
};

export default CategoriesPick;
