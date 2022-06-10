import styled from "styled-components";
import CoffeeShopCard from "../CoffeeShopCard";
import { MenuContainer, MenuTitle } from "./MenuShared";

const CoffeeShopsGrid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, minmax(480px, 1fr));
  gap: 30px;
  row-gap: 50px;
  column-gap: 30px;
`;

function CoffeeShops({ shops, title }) {
  return (
    <MenuContainer>
      {title && <MenuTitle>{title}</MenuTitle>}
      <CoffeeShopsGrid>
        {shops?.map((coffeeShop) => (
          <CoffeeShopCard key={coffeeShop.id} coffeeShop={coffeeShop} />
        ))}
      </CoffeeShopsGrid>
    </MenuContainer>
  );
}

export default CoffeeShops;
