import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { TrackexContext } from "../../contexts/trackexContext";

const FiltersContainer = styled.div`
  width: 20%;
`;

const Filters = ({ filterByCategory, filterByType }) => {
  const { categories, types } = useContext(TrackexContext);

  const [categoriesFilter, setCategoriesFilter] = useState(
    Object.keys(categories).reduce((acc, category) => {
      acc[category] = { label: categories[category], checked: false };
      return acc;
    }, {})
  );
  // {
  //   eating_out: { label: 'label1', checked: true},
  //   clothes: { label: 'label1', checked: false},
  // }

  const [typesFilter, setTypesFilter] = useState(
    Object.keys(types).reduce((acc, type) => {
      acc[type] = { label: types[type], checked: false };
      return acc;
    }, {})
  );

  // {
  //   income: { label: 'Income', checked: false},
  //   expense: { label: 'Expense', checked: false},
  // }

  useEffect(() => {
    // console.log("useEffect filterByCategory");
    filterByCategory(categoriesFilter);
  }, [categoriesFilter]);

  useEffect(() => {
    filterByType(typesFilter);
  }, [typesFilter]);
  return (
    <FiltersContainer>
      <h2>Filters</h2>
      <h3>Category</h3>
      {categoriesFilter &&
        Object.keys(categoriesFilter).map((category) => {
          return (
            <FormControlLabel
              control={
                <Checkbox checked={categoriesFilter[category].checked} />
              }
              name={category}
              label={categoriesFilter[category].label}
              onChange={(e) => {
                const newCategoriesState = {
                  ...categoriesFilter,
                  [category]: {
                    label: categoriesFilter[category].label,
                    checked: e.target.checked,
                  },
                };
                // console.log(newCategoriesState);
                setCategoriesFilter(newCategoriesState);
              }}
            />
          );
        })}
      <h3>Types</h3>
      {typesFilter &&
        Object.keys(typesFilter).map((type) => {
          return (
            <FormControlLabel
              name={type}
              label={typesFilter[type].label}
              control={<Checkbox checked={typesFilter[type].checked} />}
              onChange={(e) => {
                setTypesFilter({
                  ...typesFilter,
                  [type]: {
                    ...typesFilter[type],
                    checked: e.target.checked,
                  },
                });
              }}
            />
          );
        })}
    </FiltersContainer>
  );
};

export { Filters };
