import './App.css';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';

function App() {
  const clientID = "133911177352-p8vtu5c3aflp0uolu9im1enrp2vek3bl.apps.googleusercontent.com"
  const [user, setUser] = useState({}); 

  const onSuccess = (response) => {
    console.log(response)
    console.log(response.profileObj)
    setUser(response.profileObj);
    document.getElementsByClassName("btn").hidden = true;
  }
  const onFailure = (response) => {
    console.log("Something went wrong");
  }
  const handleLogout  = () => {
    setUser({}); 
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="center">
      <h1>Login</h1>
    
      <div className='btn'>

        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue  with Google"
          cookiePolicy={"single_host_origin"}
        />

      </div>

      <div className={user ? "profile" : "hidden"}>
        <img alt="profile" src={user.imageUrl} />
        <h3>{user.name}</h3>
  
      </div>



    </div>
  );
}

export default App;
