import  { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import PropTypes from 'prop-types'; 

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = (inputValue) => {
   
    return fetch(
      `${GEO_API_URL}?minpopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        
        return {
            options:response.data.map((city)=>{
                return {
                    value : `${city.latitude} ${city.longitude}` ,
                    label : `${city.name}, ${city.countryCode}`,
                }
            })
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <AsyncPaginate
      placeholder="search for city "
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired, 
}

export default Search;
