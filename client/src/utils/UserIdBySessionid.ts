export const fetchUserIdBySessionId = async (sessionId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/session-user/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch user ID");
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };
  