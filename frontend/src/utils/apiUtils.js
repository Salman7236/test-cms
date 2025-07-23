export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userTypeId");
  const userLevel = localStorage.getItem("userLevel");
  // const categoryId = localStorage.getItem("categoryId"); // if applicable

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "x-user-id": userId,
    "x-user-level": userLevel,
    // ...(categoryId && { "x-user-category": categoryId }),
  };
};
