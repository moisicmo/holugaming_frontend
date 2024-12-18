import { useState } from "react";
import { ComponentInput } from "."

interface searchProps {
    title: string;
    search?: (value: string) => void;
}
export const ComponentSearch = (props: searchProps) => {
    const {
        title,
        search,
    } = props;
    /*BUSCADOR */
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: any) => {
        const inputQuery = event.target.value;
        setQuery(inputQuery);
        search!(inputQuery)
    };
    return (
        <ComponentInput
            type="text"
            label={title}
            name="search"
            value={query}
            onChange={handleInputChange}
        />
    )
}
