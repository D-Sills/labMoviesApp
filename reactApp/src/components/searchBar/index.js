import React, { useContext } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

import "./Search.scss";

const Search = () => {
    const { handleSubmit, handleChange, openModal } = useContext();

    return (
        <Form inline className="mt-1" onSubmit={handleSubmit}>
        <FormControl
            onChange={handleChange}
            type="text"
            placeholder="Search Movies Here"
            className="mr-sm-2"
            onClick={openModal
        }
        
        //   value={movies}
        //   name="movies"
        />
        <Button variant="danger" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
        </Button>
        </Form>
    );
};

export default Search;