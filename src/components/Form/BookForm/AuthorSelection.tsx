import { Dispatch, SetStateAction } from "react";
import { useQueries, useQuery } from "react-query";
import Select, { MultiValue } from "react-select";
import { Author } from "../../../interfaces/Author";
import { getAllAuthors, getAuthorById } from "../../../services/apis/AuthorAPI";
import { ErrorMessage, FormController, FormLabel } from "../formStyle.styled";
type Option = {
    value: number;
    label: string;
};
type AuthorSelectionProps = {
    authorIds: number[];
    setAuthorIds: Dispatch<SetStateAction<number[]>>;
    errorMessage?: string;
    setMessage: Dispatch<SetStateAction<string>>;
    isUpdate?: boolean;
};
type Result = {
    author: Author;
};
const AuthorSelection = ({
    setAuthorIds,
    errorMessage,
    setMessage,
    authorIds,
    isUpdate,
}: AuthorSelectionProps) => {
    const { data: authors, isLoading } = useQuery({
        queryKey: ["authors"],
        queryFn: () => getAllAuthors(),
    });
    const results = useQueries<Result[]>(
        authorIds.map((id) => {
            return {
                queryKey: ["author", id],
                queryFn: () => getAuthorById(id.toString()),
                staleTime: Infinity,
                refetchOnMount: false,
            };
        })
    );
    return (
        <FormController role="select-controller">
            <FormLabel>Authors</FormLabel>
            {results && (
                <Select
                    defaultValue={
                        isUpdate
                            ? (JSON.parse(
                                  localStorage.getItem("temp_options") as string
                              ) as Option[])
                            : []
                    }
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
            )}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </FormController>
    );
};

export default AuthorSelection;
