export const deleteAdminById = async (adminId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admins/delete/${adminId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  };
  