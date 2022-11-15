import React, { useState, useEffect } from 'react';

// Components
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

// Client
import { client } from 'client';

// queyr
import { feedQuery, searchQuery } from 'utils/data';

const Search = ({ searchTerm }) => {

  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
  
      client.fetch(query)
      .then((data) => {
        setLoading(false);
        setPins(data);
      });
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setLoading(false);
        setPins(data);
      });
    }


  }, [searchTerm]);

  return (
    <div>
      {
        loading && (
          <Spinner message="Searching for pins..." />
        )
      }
      {
        pins?.length !== 0 && (
          <MasonryLayout pins={pins} />
        )
      }
      {
        pins?.length === 0 && searchTerm !== '' && !loading && (
          <div className="text-xl text-center mt-10 dark:text-white">
            No Pins Found!
          </div>
        )
      }
    </div>
  )
}

export default Search;