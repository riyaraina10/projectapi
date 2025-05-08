import { useState } from "react";

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search for a meal..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default Search;
