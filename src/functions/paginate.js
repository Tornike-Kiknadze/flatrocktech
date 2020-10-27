import React from "react";
import _ from "lodash";

const Paginate = (items, pageNumber, pageSize) => {
  const startingIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startingIndex).take(pageSize).value();
};

export default Paginate;
