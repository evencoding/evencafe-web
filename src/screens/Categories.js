import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Category from "../components/Home/Category";
import CoffeeShops from "../components/Home/CoffeeShops";

const SEECATEGORIES_QUERY = gql`
  query seeCategories($page: Int!) {
    seeCategories(page: $page) {
      categories {
        id
        name
      }
      totalCategories
    }
  }
`;
const SEECATEGORY_QUERY = gql`
  query seeCategory($name: String!, $page: Int!) {
    seeCategory(name: $name, page: $page) {
      totalPages
      totalShops
      shops {
        id
        name
        bio
        adress
        avatar
        followers
        categories {
          id
          name
        }
        user {
          username
          avatarURL
        }
      }
    }
  }
`;

const CategoriesContainer = styled.div`
  margin-top: ${(props) => props.theme.subHeaderMT};
`;

function Categories() {
  const { name } = useParams();
  let selected = null;
  const { data: categoryData, loading: categoryLoading } = useQuery(
    SEECATEGORIES_QUERY,
    {
      variables: {
        page: 1,
      },
    }
  );
  if (name === undefined) {
    selected = categoryData?.seeCategories?.categories[0]?.name;
  } else {
    selected = "#" + name;
  }
  const { data: shopData, loading: shopLoading } = useQuery(SEECATEGORY_QUERY, {
    variables: {
      name: selected,
      page: 1,
    },
  });
  return (
    <CategoriesContainer>
      <Category
        selected={selected}
        title="Category"
        categoryData={categoryData}
        totalCategories={categoryData?.seeCategories?.totalCategories}
      />
      <CoffeeShops shops={shopData?.seeCategory?.shops} />
    </CategoriesContainer>
  );
}

export default Categories;
