import { SearchIcon } from "lucide-react";
import { SearchField } from "@heroui/react";
import { useState, useEffect } from "react";
import type { FunctionComponent } from "react";
import { useSearchParams } from "react-router";

export const SearchBar: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== query) {
        setSearchParams(
          (prev) => {
            if (inputValue) {
              prev.set("q", inputValue);
            } else {
              prev.delete("q");
            }
            return prev;
          },
          { replace: true },
        );
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, query, setSearchParams]);

  return (
    <section className="px-4 pt-4 container-lg">
      <SearchField className="w-full" aria-label="Search galleries">
        <SearchField.Group>
          <SearchField.SearchIcon>
            <SearchIcon />
          </SearchField.SearchIcon>
          <SearchField.Input
            autoComplete="off"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </section>
  );
};
