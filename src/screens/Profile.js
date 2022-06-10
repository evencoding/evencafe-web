import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CoffeeShops from "../components/Home/CoffeeShops";
import useUser from "../components/hooks/useUser";
import routes from "../routes";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfo from "../components/UserInfo";

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
  const { data: loggedInUser } = useUser();
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
      <UserInfo data={data} />
      <CoffeeShops
        shops={data?.seeProfile?.user?.shops}
        title={`${username} 이(가) 등록한 카페`}
      />
    </ProfileContainer>
  );
}

export default Profile;
