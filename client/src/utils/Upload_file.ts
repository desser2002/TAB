export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://localhost:3000/api/files/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
  
    const result = await response.json();
    return `${result.filePath}`;
  };
  