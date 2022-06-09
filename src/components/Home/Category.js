import styled from "styled-components";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
import { MenuContainer, MenuTitle } from "./MenuShared";

const CategoryList = styled.div`
  display: block;
  font-size: 16px;
  div {
    display: flex;
    align-items: center;
  }
  span {
    background-color: ${(props) => props.theme.categoryBg};
    color: ${(props) => props.theme.categoryColor};
    padding: 6px 10px;
    border-radius: 10px;
    margin-right: 10px;
    font-weight: 900;
    box-shadow: 0px 0px 12px 0px ${(props) => props.theme.categoryColor};
    cursor: pointer;
  }
`;
const MoreCategory = styled.span`
  display: block;
  text-align: center;
  padding: 6px 10px;
`;

function Category({ categoryData, totalCategories, title }) {
  const history = useHistory();
  const [seeMore, setSeeMore] = useState(false);
  return (
    <MenuContainer>
      <MenuTitle>{title}</MenuTitle>
      <CategoryList>
        <div>
          {totalCategories > 8
            ? categoryData?.seeCategories?.categories
                ?.slice(0, 8)
                .map((category) => (
                  <React.Fragment key={category.id}>
                    <span
                      onClick={() =>
                        history.push(
                          `/search/category?name=${category.name.split("#")[1]}`
                        )
                      }
                    >
                      {category.name}
                    </span>
                  </React.Fragment>
                ))
            : categoryData?.seeCategories?.categories?.map((category) => (
                <React.Fragment key={category.id}>
                  <span
                    onClick={() =>
                      history.push(
                        `/search/category?name=${category.name.split("#")[1]}`
                      )
                    }
                  >
                    {category.name}
                  </span>
                </React.Fragment>
              ))}
          <Link to={routes.category}>
            <MoreCategory>더보기...</MoreCategory>
          </Link>
        </div>
      </CategoryList>
    </MenuContainer>
  );
}

export default Category;
