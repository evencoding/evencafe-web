import styled from "styled-components";
import { useHistory } from "react-router";
import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer, MenuTitle } from "./MenuShared";

const CategoryList = styled.div`
  font-size: 16px;
`;
const DisplayCategory = styled.div`
  display: flex;
  align-items: center;
`;
const CategoryGrid = styled.div`
  margin-top: 10px;
  /* display: grid;
  grid-template-columns: repeat(9, auto);
  justify-items: center; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-row-gap: 15px;
`;
const CategoryName = styled.span`
  display: block;
  text-align: center;
  background-color: ${(props) =>
    props.selected ? props.theme.categoryBg : "null"};
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

function Category({
  categoryData,
  totalCategories,
  title,
  selected,
  shopCategory,
}) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const showCategory = () => {
    if (shopCategory) {
      return shopCategory?.seeCoffeeShop?.categories?.map((category) => (
        <React.Fragment key={category?.id}>
          <CategoryName
            shop={true}
            onClick={() =>
              history.push(`/categories/${category?.name?.split("#")[1]}`)
            }
          >
            {category?.name}
          </CategoryName>
        </React.Fragment>
      ));
    } else if (totalCategories > 8 && !pathname.startsWith("/categories")) {
      return categoryData?.seeCategories?.categories
        ?.slice(0, 8)
        .map((category) => (
          <React.Fragment key={category?.id}>
            <CategoryName
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
        {pathname.startsWith("/categories") ? (
          <CategoryGrid>{showCategory()}</CategoryGrid>
        ) : (
          <DisplayCategory>
            {showCategory()}
            {pathname.startsWith("/shop") ? null : (
              <Link to={`/categories`}>
                <MoreCategory>더보기...</MoreCategory>
              </Link>
            )}
          </DisplayCategory>
        )}
      </CategoryList>
    </MenuContainer>
  );
}

export default Category;
