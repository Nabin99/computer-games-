// DOM Elements
const updateButton = document.querySelector(".btn.btn-rounded");
const countryInput = document.querySelector("#country");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const displayNameInput = document.querySelector("#display-name");
const emailInput = document.querySelector("#email");
const oldPasswordInput = document.querySelector(
  'input[placeholder="Old Password"]'
);
const newPasswordInput = document.querySelector(
  'input[placeholder="New Password"]'
);

// Simulated API URL
const API_URL = "http://localhost:3000/api/users/profile/"; // Replace with your backend API URL

// Function to Fetch Existing Profile Data
async function fetchProfileData() {
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const response = await fetch(`${API_URL}${user.userId}`);
    if (!response.ok) throw new Error("Failed to fetch profile data");

    const data = await response.json();
    console.log(data);
    populateProfileFields(data);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

// Populate Input Fields with Fetched Data
function populateProfileFields(data) {
  countryInput.value = data.country || "";
  firstNameInput.value = data.firstName || "";
  lastNameInput.value = data.lastName || "";
  displayNameInput.value = data.displayName || "";
  emailInput.value = data.email || "";
}

// Function to Update Profile
async function updateProfile() {
  // Collect Data
  const profileData = {
    country: countryInput.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    displayName: displayNameInput.value,
    email: emailInput.value,
    oldPassword: oldPasswordInput.value,
    newPassword: newPasswordInput.value,
  };

  let user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    let response = await fetch(`${API_URL}update/${user.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const result = await response.json();
    // response = await response.json();
    // console.log(response);

    if (!result.message) throw new Error("Failed to update profile");

    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
}

// Attach Event Listeners
updateButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateProfile();
});

// Fetch Profile Data on Page Load
fetchProfileData();
