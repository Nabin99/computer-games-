document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/users";
  const resetForm = document.getElementById("resetForm");
  const emailInput = document.getElementById("email");

  // Event Listener for Form Submission
  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = emailInput.value.trim();

    // Validate Email
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Simulate API Call
      const response = await fetch(API_URL + "/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Password reset link sent to your email!");
        resetForm.reset(); // Clear the form
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Reset request failed:", err);
      alert("Something went wrong. Please try again later.");
    }
  });

  // Email Validation Function
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
