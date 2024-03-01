import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import styled from "styled-components";
import { getAllCategories } from "../../services/apis/CategoryAPI";
import { Option } from "../../types/Option.type";
import { devices } from "../../config/devices";
import CategoriesPick from "./CategoriesPick";
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
    @media screen and (${devices.laptops}) {
        max-height: 23rem;
        overflow-y: auto;
    }
`;
const SelectContainer = styled.div`
    @media screen and (${devices.laptops}) {
        display: none;
    }
`;
const BookFilter = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const foundCategory = categories?.find(
        (category) => category.id.toString() === categoryId
    );
    return (
        <Container>
            <h3>Filter</h3>
            <span>Category</span>
            <SelectContainer>
                {categories && (
                    <ReactSelect
                        defaultValue={
                            foundCategory
                                ? {
                                      value: foundCategory.id,
                                      label: foundCategory.name,
                                  }
                                : { value: 0, label: "All" }
                        }
                        options={categories
                            ?.map((category) => {
                                const option: Option = {
                                    label: category.name,
                                    value: category.id,
                                };
                                return option;
                            })
                            .concat([{ label: "All", value: 0 }])}
                        isLoading={isLoading}
                        onChange={(newValue) => {
                            setSearchParams((prev) => {
                                if (!newValue || newValue.value === 0) {
                                    prev.delete("categoryId");
                                } else {
                                    prev.set(
                                        "categoryId",
                                        newValue.value.toString()
                                    );
                                }
                                return prev;
                            });
                        }}
                    />
                )}
            </SelectContainer>
            {categories && <CategoriesPick categories={categories}/>}
        </Container>
    );
};

export default BookFilter;
