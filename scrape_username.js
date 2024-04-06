const elements = document.querySelectorAll('a.hoverable.url');

// Initialize a Set to hold unique usernames
const usernames = new Set();

// Iterate over each element
elements.forEach(element => {
  // Get the href attribute
  const href = element.getAttribute('href');
  // Extract the username part from the href
  // Assuming the href always starts with "/", remove it and get what's after it
  const username = href.substring(1);
  // Add the username to the Set to ensure uniqueness
  usernames.add(username);
});

// Convert Set to Array to work with its elements
const usernamesArray = Array.from(usernames);

// Create CSV content
let csvContent = "data:text/csv;charset=utf-8,";
usernamesArray.forEach(username => {
  csvContent += username + "\r\n"; // Add each username on a new line
});

// Encode the CSV content so it can be used as a URI
const encodedUri = encodeURI(csvContent);

// Create a temporary link to trigger the download
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "usernames.csv");
document.body.appendChild(link); // Required for Firefox

// Trigger the download
link.click();

// Remove the link after download
document.body.removeChild(link);
