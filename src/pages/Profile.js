import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  console.log('location object:', location);
  return ( <>
    <h1>Profile</h1>
  </> );
}

export default Profile;