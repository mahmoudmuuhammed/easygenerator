import { useEffect, useState } from "react";
import { profile } from "../services/users";
import { User } from "../models/users";
import { LocalStorage } from "../../../shared/services/local-storage";

function Dashboard() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch the user profile
    const fetchUserProfile = async () => {
      try {
        const token: { oauth_token: string } = LocalStorage.getItem("token"); // You might retrieve this from localStorage or context

        const response = await profile(token.oauth_token);

        setUserProfile(response); // Set the fetched profile data
        setLoading(false); // Update the loading state
      } catch (error) {
        setError("Failed to fetch user profile");
        setLoading(false);
      }
    };

    fetchUserProfile(); // Fetch the profile when the component is mounted
  }, []);

  // Show loading or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Display the username once the user profile has been loaded */}
      {userProfile && <h1>Welcome to our app {userProfile?.name}</h1>}
    </div>
  );
}

export default Dashboard;
