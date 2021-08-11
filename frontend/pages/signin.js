import styled from 'styled-components';
import RequestReset from '../components/RequesteReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;
/* eslint-disable react/display-name */
export default function SignInPage() {
  return (
    <GridStyles>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}
