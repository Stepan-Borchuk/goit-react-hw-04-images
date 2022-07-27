import React, { Component } from 'react';
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

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSearchSubmit}>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
          <Button type="submit">
            <BsSearch
              style={{ width: '20px', height: '20px', color: 'blue' }}
            />
            <Label>Search</Label>
          </Button>
        </SearchForm>
      </Searchbar>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
