import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {
    deleteCategory,
    getAllCategories,
} from "../../services/apis/CategoryAPI";
import { Button } from "../../components/Form/formStyle.styled";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const Header = styled.div`
    width: clamp(10rem, 95%, 50rem);
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;
const Table = styled.table`
    text-align: center;
    width: clamp(10rem, 95%, 50rem);
    margin: auto;
    border-collapse: collapse;
    background-color: #ccedfd;
    & tr:nth-child(odd) {
        background-color: #ffffff;
    }
    & th {
        color: #00407d;
        width: 5rem;
    }
    & th,
    td {
        text-align: left;
        padding: 0.3rem;
    }
`;
const AddButton = styled(Button)`
    margin: 0;
    background-color: #0084d0;
    color: #ffffff;
    &:hover {
        background-color: #0071b2;
    }
`;
const ActionButton = styled.button`
    width: fit-content;
    background-color: inherit;
    outline: none;
    border: none;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
`;
const IconWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
`;
const CategoryPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    const { mutateAsync: deleteCategoryMutation } = useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            navigate(0);
        },
    });
    return (
        <>
            <Header>
                <h3>Category List</h3>
                <AddButton
                    onClick={() => {
                        navigate("/admin/categories/add");
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} /> Add category
                </AddButton>
            </Header>
            <Table>
                <tr>
                    <th>Id</th>
                    <th>Category name</th>
                    <th>Number of books</th>
                    <th>Actions</th>
                </tr>
                {categories?.map((category) => {
                    return (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.books?.length}</td>
                            <td>
                                <IconWrapper>
                                    {/* Update button */}
                                    <ActionButton
                                        onClick={() => {
                                            navigate(
                                                `/admin/categories/update/${category.id}`
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            color="#3b73ff"
                                            size="lg"
                                        />
                                    </ActionButton>
                                    {/* Delete button */}
                                    <ActionButton
                                        onClick={async () => {
                                            await deleteCategoryMutation(
                                                category.id
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            color="#f93f3f"
                                            size="lg"
                                        />
                                    </ActionButton>
                                </IconWrapper>
                            </td>
                        </tr>
                    );
                })}
            </Table>
        </>
    );
};

export default CategoryPage;
