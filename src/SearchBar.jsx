import React from 'react';

     const SearchBar = ({ searchTerm, onSearchChange }) => {
       return (
         <input
           type="text"
           value={searchTerm}
           onChange={(e) => onSearchChange(e.target.value)}
           placeholder="Search articles..."
           className="p-2 border border-gray-300 rounded w-full"
         />
       );
     };

     export default SearchBar;