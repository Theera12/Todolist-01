import { useState, useEffect } from 'react';
function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  useEffect(() => {
    //ensures that setQueryString is only called only when localQueryString remain unchanged for 500 ms
    const debounce = setTimeout(() => setQueryString(localQueryString), 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);
  return (
    <>
      <div>
        <label>Search Todos </label>
        <input
          type="text"
          value={localQueryString}
          onChange={(event) => setLocalQueryString(event.target.value)}
        ></input>
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <form onSubmit={(event) => event.preventRefresh()}>
        <label>Sort By</label>
        <select
          onChange={(event) => setSortField(event.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time Added</option>
        </select>
        <label> Direction</label>
        <select
          onChange={(event) => setSortDirection(event.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
    </>
  );
}
export default TodosViewForm;
