export const fetchUsername = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/user-login/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch user ID");
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };
  