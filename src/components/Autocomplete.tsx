import { useState } from "react";
import useFetchSuggestions, { Pokemon } from "../hooks/useFetchSuggestions";

function AutoComplete() {
  const { suggestions, loading, error } = useFetchSuggestions();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Pokemon[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleClick = (suggestion: Pokemon) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    // Splits text apart so that the highlight can be wrapped by a ".highlighted" span
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="highlighted">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search a pokemon..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {showSuggestions && inputValue && (
        <div className="suggestion-box">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <div key={index} onClick={() => handleClick(suggestion)} className="suggestion-item">
                {getHighlightedText(suggestion.name, inputValue)}
              </div>
            ))
          ) : (
            <span>No suggestions available</span>
          )}
        </div>
      )}
    </>
  );
};

export default AutoComplete;
