import { useState } from "react";

function SearchBar({ setUsername }) {

  const [input, setInput] = useState("");

  const handleSearch = () => {
    setUsername(input);
  };

  return (

    <div className="flex justify-center gap-3 text-center">

      <input
        type="text"
        placeholder="Enter GitHub username..."
        className="bg-purple-100 px-4 py-3 rounded-lg text-black w-64"
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>

    </div>

  );
}

export default SearchBar;