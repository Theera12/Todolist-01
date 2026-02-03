import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { RiSortAlphabetAsc } from 'react-icons/ri';
import { HiOutlineSortDescending } from 'react-icons/hi';
import { RiDeleteBinFill } from 'react-icons/ri';
import searchicon from '../assets/search.png';
const Wrapper = styled.div`
  padding-top: 10px;
  display: flex;

  justify-content: sapce-between;
  input {
    width: 100%;
    background-image: url(${searchicon});
    background-repeat: no-repeat;
    background-position: right center;
    height: 30px;
    padding-right: 13px;
    border: 1px solid grey;
    border-radius: 10%;
    font-style: italic;
  }
  input:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.94);
  }
  input:focus {
    outline: none;
  }
`;
const StyledForm = styled.form`
  margin-top: 5px;
  display: flex;
  gap: 10px;
  select {
    padding: 10px;
    border: 1px solid grey;
    border-radius: 4px;
    font-style: italic;
    color: grey;
  }
  select:focus {
    outline: none;
  }
  select:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.94);
  }
`;
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
      <Wrapper>
        <input
          type="text"
          value={localQueryString}
          onChange={(event) => setLocalQueryString(event.target.value)}
          placeholder="Search..."
        ></input>

        <button type="button" onClick={() => setLocalQueryString('')}>
          <RiDeleteBinFill />
        </button>
      </Wrapper>

      <StyledForm onSubmit={(event) => event.preventRefresh()}>
        <label>
          <RiSortAlphabetAsc />
        </label>
        <select
          onChange={(event) => setSortField(event.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time Added</option>
        </select>
        <label>
          <HiOutlineSortDescending />
        </label>
        <select
          onChange={(event) => setSortDirection(event.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </StyledForm>
    </>
  );
}
export default TodosViewForm;
