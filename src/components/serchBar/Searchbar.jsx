import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Searchbar,
  SearchForm,
  Button,
  Label,
  Input,
} from './SearchBar.styled';

import { BsSearch } from 'react-icons/bs';

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }

    onSubmit(searchQuery);

    setSearchQuery('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSearchSubmit}>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleNameChange}
        />
        <Button type="submit">
          <BsSearch style={{ width: '20px', height: '20px', color: 'blue' }} />
          <Label>Search</Label>
        </Button>
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
