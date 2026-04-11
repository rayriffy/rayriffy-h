import { SearchIcon } from "lucide-react";
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
      <label className="input w-full">
        <SearchIcon className="h-[1em] opacity-50" />
        <input
          type="search"
          className="grow"
          autoComplete="off"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
    </section>
  );
};
