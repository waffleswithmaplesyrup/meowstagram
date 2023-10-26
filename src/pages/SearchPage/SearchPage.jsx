import { useState } from "react";

export default function SearchPage () {
  const [results, setResults] = useState([]);

  return (
    <div className="w-100 text-center py-5">
      <SearchBar />  
      {
        results.length === 0 ? 
        "No search results" :
        results?.map(result => <SearchCard key={result} result={result}/>)
      }
    </div>
  );
}

function SearchBar () {
  return (
    <>
      <input placeholder="Search"/>
      <hr />
    </> 
  );
}

function SearchCard ({ result }) {

  return (
    <div>
      <img src='' alt='profile pic' />
      <p>username</p>
      <p>number of followers</p>
    </div>
  );
}