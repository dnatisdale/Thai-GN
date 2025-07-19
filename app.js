// URL Form Handler
document.getElementById('urlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let url = document.getElementById('urlInput').value.trim();
  
  // Auto-add https:// if missing protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Validate URL
  try {
    new URL(url); // Throws error if invalid
    addUrlToList(url);
    saveURL(url);
    e.target.reset();
  } catch (err) {
    alert("Please enter a valid URL (e.g., example.com)");
    return;
  }
});

// Search Functionality
document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#urlList li').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// Storage Functions
function saveURL(url) {
  const urls = JSON.parse(localStorage.getItem('urls') || '[]');
  urls.push(url);
  localStorage.setItem('urls', JSON.stringify(urls));
}

function addUrlToList(url) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  document.getElementById('urlList').appendChild(listItem);
}

// Initialize on Load
window.addEventListener('load', () => {
  const savedUrls = JSON.parse(localStorage.getItem('urls') || '[]');
  savedUrls.forEach(url => addUrlToList(url));
});

// Error Handling (optional)
window.addEventListener('error', (e) => {
  console.error('Error:', e.message);
  // Remove or replace the fetch call if you don't have a backend
});