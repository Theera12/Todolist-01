function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <>
      <div>
        <label>Search Todos:</label>
        <input
          type="text"
          value={queryString}
          onChange={(event) => setQueryString(event.target.value)}
        ></input>
        <button type="button" onClick={() => setQueryString('')}>
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
