import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../auth/AuthContext';
import { fetchDataWithToken } from '../helpers/apiData';
import { useForm } from '../hooks/useForm';
import { useLimit } from '../hooks/useLimit';
import '../../App.css';
import { Button, Input } from '@material-ui/core';
import { BsSearch } from 'react-icons/bs';
export const NavbarSecundary = ({ setLimit, statistic }) => {
  const [search, onSearch] = useForm();
  const [count, increase, decrease] = useLimit(10);

  useEffect(() => {
    setLimit(count);
  }, [count]);

  const {
    user: { token },
    setDataCoviFilter,
    dataCoviFilter,
    setLoad,
    isLoad,
  } = useContext(AuthContext);

  const handleFindByCountry = async (e) => {
    console.log('prueba');
    e.preventDefault();

    const filterByCountry = statistic.filter((v) => {
      return v.country
        .toLocaleLowerCase()
        .includes(search.search === undefined ? search.search : search.search.toLocaleLowerCase());
    });

    setDataCoviFilter(filterByCountry);
  };

  const handleSynchronize = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const data = await fetchDataWithToken('/', token, 'POST');
      setDataCoviFilter(data.data.statisticBD);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      return Swal.fire('Error connection', 'Failed to synchronize information', 'error');
    }
  };

  return (
    <nav className="bd-subnavbar py-2 ">
      <div className="d-flex align-items-md-center bd-subnavbar-content">
        <form className="bd-search position-relative me-auto">
          <div className="bd-search">
            <Input
              type="search"
              onChange={onSearch}
              name="search"
              disabled={isLoad}
              placeholder="Filter"
              className="input"
            />
            <Button onClick={handleFindByCountry}>
              <BsSearch />
            </Button>
          </div>

          <Button onClick={handleSynchronize} disabled={isLoad} title="Sync up">
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </form>
        <Button variant="outlined" color="secondary" onClick={decrease} disabled={isLoad}>
          Previous
        </Button>

        <label
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded="false"
          className="custom-input-pagination"
          name="search"
          onChange={onSearch}
          placeholder="10"
          type="search"
        >
          {count}
        </label>

        <Button variant="outlined" color="secondary" onClick={increase} disabled={isLoad}>
          Next
        </Button>
      </div>
    </nav>
  );
};
