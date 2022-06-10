import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import CoffeeShops from "../components/Home/CoffeeShops";
import routes from "../routes";
// 내가 만든 커피숍
// add createCoffeeShop
// /shop/:id show the user a form to edit a shop, or a button to delete the shop.

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String) {
    seeProfile(username: $username) {
      user {
        id
        email
        name
        username
        avatarURL
        githubUsername
        shops {
          id
          name
          bio
          adress
          avatar
          followers
          user {
            username
          }
          categories {
            id
            name
          }
          photos {
            url
          }
        }
      }
    }
  }
`;

const ProfileContainer = styled.div`
  margin-top: ${(props) => props.theme.subHeaderMT};
`;

function Profile() {
  const { username } = useParams();
  const { loggedInUser } = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  return (
    <ProfileContainer>
      {loggedInUser?.me ? (
        <Link to={routes.createCoffeeShop}>
          <div>카페 등록하기</div>
        </Link>
      ) : null}
      <CoffeeShops
        shops={data?.seeProfile?.user?.shops}
        title={`${username} 이(가) 등록한 카페`}
      />
    </ProfileContainer>
  );
}

export default Profile;
