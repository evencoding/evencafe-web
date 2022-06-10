import styled from "styled-components";
import { useHistory } from "react-router";
import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer, MenuTitle } from "./MenuShared";

const CategoryList = styled.div`
  display: block;
  font-size: 16px;
  div {
    display: flex;
    align-items: center;
  }
`;
const CategoryName = styled.span`
  background-color: ${(props) =>
    props.selected ? props.theme.categoryBg : null};
  color: ${(props) => props.theme.categoryColor};
  padding: 6px 10px;
  border-radius: 10px;
  margin-right: 10px;
  font-weight: 900;
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.categoryColor};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;
const MoreCategory = styled(CategoryName)`
  display: block;
  text-align: center;
  padding: 6px 10px;
`;

function Category({ categoryData, totalCategories, title, selected }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const showCategory = () => {
    if (totalCategories > 8 && !pathname.startsWith("/categories")) {
      return categoryData?.seeCategories?.categories
        ?.slice(0, 8)
        .map((category) => (
          <React.Fragment key={category?.id}>
            <CategoryName
              selected={true}
              onClick={() =>
                history.push(`/categories/${category?.name?.split("#")[1]}`)
              }
            >
              {category?.name}
            </CategoryName>
          </React.Fragment>
        ));
    } else {
      return categoryData?.seeCategories?.categories?.map((category) => (
        <React.Fragment key={category?.id}>
          <CategoryName
            selected={selected === category?.name ? true : false}
            onClick={() =>
              history.push(`/categories/${category?.name?.split("#")[1]}`)
            }
          >
            {category?.name}
          </CategoryName>
        </React.Fragment>
      ));
    }
  };
  return (
    <MenuContainer>
      <MenuTitle>{title}</MenuTitle>
      <CategoryList>
        <div>
          {showCategory()}
          {pathname.startsWith("/categories") ? null : (
            <Link to={`/categories`}>
              <MoreCategory>더보기...</MoreCategory>
            </Link>
          )}
        </div>
      </CategoryList>
    </MenuContainer>
  );
}

export default Category;
