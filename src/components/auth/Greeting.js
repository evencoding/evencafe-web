import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Welcome = styled.div`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
`;

const HaveFun = styled.div`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.7;
  line-height: 20px;
  margin-bottom: -10px;
`;

function Greeting({ hello, haveFun }) {
  return (
    <Container>
      <Welcome>{hello}</Welcome>
      {haveFun ? <HaveFun>{haveFun}</HaveFun> : null}
    </Container>
  );
}

export default Greeting;
