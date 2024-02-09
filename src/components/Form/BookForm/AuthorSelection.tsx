import Select, { MultiValue } from "react-select";
import { ErrorMessage, FormController, FormLabel } from "../formStyle.styled";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { getAllAuthors } from "../../../services/apis/AuthorAPI";
type Option = {
    value: number;
    label: string;
};
type AuthorSelectionProps = {
    setAuthorIds: Dispatch<SetStateAction<number[]>>;
    errorMessage?: string;
    setMessage: Dispatch<SetStateAction<string>>;
};
const AuthorSelection = ({
    setAuthorIds,
    errorMessage,
    setMessage,
}: AuthorSelectionProps) => {
    const { data: authors, isLoading } = useQuery({
        queryKey: ["authors"],
        queryFn: () => getAllAuthors(),
    });
    return (
        <FormController role="select-controller">
            <FormLabel>Authors</FormLabel>
            <Select
                options={
                    authors
                        ? authors.map(
                              (author) =>
                                  ({
                                      value: author.author_id,
                                      label: author.name,
                                  } as Option)
                          )
                        : []
                }
                isMulti
                isLoading={isLoading}
                onChange={(choice: MultiValue<Option>) => {
                    const authorIds = choice.map((item) => item.value);
                    if (authorIds.length > 0) {
                        setMessage("");
                    } else {
                        setMessage("At least one author must be selected");
                    }
                    setAuthorIds(authorIds);
                }}
                styles={{
                    control: (styles, { isFocused }) => ({
                        ...styles,
                        borderRadius: "10px",
                        border: "none",
                        outline: "none",
                        backgroundColor: isFocused ? "#d3e9f5" : "#ffffff",
                    }),
                    multiValue: (styles) => ({
                        ...styles,
                        backgroundColor: "#8ad4fd",
                    }),
                }}
                inputId="authorSelect"
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormController>
    );
};

export default AuthorSelection;
