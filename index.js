// Retrieve entries from localStorage
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};

// Initialize userEntries array
let userEntries = retrieveEntries();

// Display entries in the HTML table
const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries.map((entry) => {
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

    return `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
  }).join("\n");

  const table = `<table class="table-auto w-full">
    <tr>
      <th class="px-4 py-2">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Date of Birth</th>
      <th class="px-4 py-2">Accepted Terms?</th>
    </tr>
    ${tableEntries}
  </table>`;

  // Use consistent variable naming (userEntries vs user-entries)
  let userEntriesContainer = document.getElementById("user-entries");
  userEntriesContainer.innerHTML = table;
};

// Save user form data to localStorage
const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  // Add entry to userEntries array
  userEntries.push(entry);

  // Save userEntries to localStorage
  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  // Display updated entries in the HTML table
  displayEntries();
};

// Add event listener to the user form
let userForm = document.getElementById("user-form");
userForm.addEventListener("submit", saveUserForm);

// Initial display of entries on page load
displayEntries();
