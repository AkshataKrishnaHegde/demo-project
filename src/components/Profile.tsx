const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
  
    return (
      <div>
        <h2>Profile</h2>
        {user ? (
          <>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>No user data</p>
        )}
      </div>
    );
  };
  
  export default Profile;
  