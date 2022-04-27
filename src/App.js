
import { useMoralis, useEffct } from "react-moralis";
import styles from "./Styles.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Wrapper = styled.div`

  height: 100vh;
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
  justofy-content: center;
 
`

export const FormWraper = styled.div`

  margin: 0 auto;
  background: White;
  border-radius: 20px;
`

export const FormContainer = styled.div`

  padding: 20px;
`
export default function App() {

  const { authenticate, 
    authError, 
    isAuthenticating, 
    isAuthenticated, 
    account, 
    logout 
  } = useMoralis();

 

  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(email)
  }, [email])
  
  const handleCustomLogin = async () => {
    await authenticate({
      provider: "magicLink",
      email: email,
      apiKey: "pk_live_CEC575BEFD08F0C1",
      chainId: "1",
      network: "mainnet"
    });
  };

  if(isAuthenticated) return (
    <Wrapper className={styles.card}>
    
      <FormWraper>
        <p style={{"textAlign": "center", "fontSize": "20px"}}>Logout</p>
      {isAuthenticating && <p>Authenticating</p>}
      {authError && (
        <div>{JSON.stringify(authError.message)}</div>
      )}
       <FormContainer>
        <button style={{"display": "block", "marginTop": "25px"}} onClick={() => logout()}>
          Logout
        </button>
        {isAuthenticated && < div>{account}</div>}
        </FormContainer>
      </FormWraper>
     
    </Wrapper>

  )

  else return (
    <Wrapper className={styles.card}>
     
      <FormWraper>

        <p style={{"textAlign": "center", "fontSize": "20px"}}>Login with Fortmatic</p>
      {isAuthenticating && <p>Authenticating</p>}
      {authError && (
        <div>{JSON.stringify(authError.message)}</div>
      )}
      <FormContainer style={{"display": "block"}}>
        <input
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button style={{"display": "block", "marginTop": "25px"}} onClick={handleCustomLogin}>
          Login with Magic Link
        </button>
        {isAuthenticated && < div>{account}</div>}
        </FormContainer>
      </FormWraper>
    </Wrapper>
  );
}