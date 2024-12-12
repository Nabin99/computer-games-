// DOM Elements
const signInButton = document.querySelector(".btn.btn-rounded");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const rememberMeCheckbox = document.querySelector("#remember-me");

// Mock API Endpoint (replace with your backend API)
const API_URL = "http://localhost:3000/api/users/login";

// Validate Email Format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Display Error Message
function displayError(message) {
  alert(message); // Replace with custom error UI if needed
}

// Handle Sign In
async function handleSignIn(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const rememberMe = rememberMeCheckbox.checked;

  // Input Validation
  if (!email || !password) {
    return displayError("Email and Password are required.");
  }

  if (!isValidEmail(email)) {
    return displayError("Please enter a valid email address.");
  }

  try {
    // API Request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to sign in.");
    }

    // Handle Successful Sign In
    const data = await response.json();
    alert("Sign In successful! Redirecting...");
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "/"; // Replace with the desired redirect URL
  } catch (error) {
    console.error("Error signing in:", error);
    displayError(error.message);
  }
}

// Event Listener
signInButton.addEventListener("click", handleSignIn);
