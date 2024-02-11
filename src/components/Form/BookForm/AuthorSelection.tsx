import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useQueries, useQuery } from "react-query";
import Select, { MultiValue } from "react-select";
import { getAllAuthors, getAuthorById } from "../../../services/apis/AuthorAPI";
import { ErrorMessage, FormController, FormLabel } from "../formStyle.styled";
import { Author } from "../../../interfaces/Author";
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
    const results = useQueries<Author[]>(
        authorIds.map((id) => {
            return {
                queryKey: ["author", id],
                queryFn: () => getAuthorById(id.toString()),
                staleTime: Infinity,
                refetchOnMount: false,
            };
        })
    );
    const [isSuccess, setIsSuccess] = useState(false);
    const defaultValues = useRef<Option[]>([]);
    useEffect(() => {
        console.log(results);
        const allSuccess = results.every(
            (response) => response.isSuccess === true
        );
        if (allSuccess) {
            defaultValues.current = results.map((response) => {
                const authorResponse = response.data as Author;
                return {
                    value: authorResponse.author_id,
                    label: authorResponse.name,
                } as Option;
            });
        }
        setIsSuccess(allSuccess);
    }, [results]);
    return (
        <FormController role="select-controller">
            <FormLabel>Authors</FormLabel>
            {isSuccess && (
                <Select
                    defaultValue={
                        isUpdate && localStorage.getItem("temp_options")
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
