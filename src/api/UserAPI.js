import axios from "axios";
import { useEffect, useState } from "react";

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfor, setUserInfor] = useState({});
  const [Expense, setExpense] = useState([]); // Separate state for Expense

  useEffect(() => {
    if (token) {
      console.log(token);
      const getUser = async () => {
        try {
          // Fetch user information
          const res = await axios.get("http://localhost:5000/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          setIsAdmin(res.data.role === 1);
          setUserInfor(res.data);

          // Initialize Expense from fetched user data
          setExpense(res.data.Expense || []);
        } catch (error) {
          console.error("Error fetching user information:", error);
          alert(error.response?.data?.msg || "Failed to fetch user information");
        }
      };
      getUser();
    }
  }, [token]);

  const updateUserExpense = async (updatedExpense) => {
    try {
      const email = userInfor.email;
      setExpense(updatedExpense); // Update Expense state
      await axios.put("http://localhost:5000/user/updateUser", { email, Expense: updatedExpense }); // Sync with server
    } catch (error) {
      console.error("Error updating Expense:", error);
      alert("Failed to update Expense.");
    }
  };

  const addExpense = async (product) => {
    if (!isLogged) return alert("Please login to add products to your Expense.");

    const existingProduct = Expense.find((item) => item._id === product._id);
    let updatedExpense;

    if (existingProduct) {
      // Increase quantity if product already exists
      updatedExpense = Expense.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new product to the Expense
      updatedExpense = [...Expense, { ...product, quantity: 1 }];
    }

    await updateUserExpense(updatedExpense);
  };

  const removeExpense = async (product) => {
    if (!isLogged) return alert("Please login to remove products from your Expense.");
    if (!product || !product._id) return alert("Invalid product. Please try again.");

    const productIndex = Expense.findIndex((item) => item._id === product._id);

    if (productIndex === -1) {
      return alert("This product is not in your Expense.");
    }

    const updatedExpense = [...Expense];
    if (updatedExpense[productIndex].quantity > 1) {
      updatedExpense[productIndex].quantity -= 1; // Decrease quantity
    } else {
      updatedExpense.splice(productIndex, 1); // Remove product if quantity is 1
    }

    await updateUserExpense(updatedExpense);
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    userInfor: [userInfor, setUserInfor],
    Expense: [Expense, setExpense],
    addExpense,
    removeExpense,
  };
}
