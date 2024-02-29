import { useQuery } from "react-query";
import ReactSelect from "react-select";
import styled from "styled-components";
import { getAllCategories } from "../../services/apis/CategoryAPI";
import { Option } from "../../types/Option.type";
const Container = styled.div`
    width: 100%;
    background-color: #ffffff;
    padding: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    & span {
        display: block;
        margin-bottom: 0.5rem;
    }
    & button {
        margin-top: 0.5rem;
        width: 8rem;
        height: 2rem;
        border: none;
        outline: none;
        background-color: #00d9ff;
        border-radius: 10px;
        &:hover {
            cursor: pointer;
            background-color: #00b3d2;
        }
    }
`;
const BookFilter = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    return (
        <Container>
            <h3>Filter</h3>
            <span>Category</span>
            <ReactSelect
                defaultValue={{ label: "All", value: 0 }}
                options={categories?.map((category) => {
                    const option: Option = {
                        label: category.name,
                        value: category.id,
                    };
                    return option;
                })}
                isLoading={isLoading}
            />
        </Container>
    );
};

export default BookFilter;
