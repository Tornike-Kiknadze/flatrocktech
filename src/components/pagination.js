import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { items, pageSize, currentPage, changePage, handlePageSize } = props;
  const pages = Math.ceil(items / pageSize);
  if (pages === 1) return null;
  const pagesArray = _.range(1, pages + 1);

  return (
    <nav className="nav-pag">
      <div className="nav-select">
        <p>Records on page</p>
        <select onChange={handlePageSize} value={pageSize}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <ul class="pagination">
        {" "}
        {pagesArray.map((item) => (
          <React.Fragment>
            <li
              key={item}
              class={item === currentPage ? "page-item active" : "page-item"}
            >
              <a class="page-link" onClick={() => changePage(item)}>
                {item}
              </a>
            </li>{" "}
          </React.Fragment>
        ))}
        {/*    
        <li class="page-item">
          <a class="page-link">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            Next
          </a>
        </li> */}{" "}
      </ul>
    </nav>
  );
};

export default Pagination;
