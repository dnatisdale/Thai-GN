document.getElementById('urlForm').addEventListener('submit', function(e) {
  document.getElementById('urlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let url = e.target.querySelector('input').value.trim();
  
  // Auto-add https:// if missing
  if (!url.match(/^https?:\/\//)) {
    url = 'https://' + url;
  }
  
  // Validate URL format
  try {
    new URL(url); // Throws error if invalid
    addUrlToList(url);
    saveURL(url); // From your localStorage function
    e.target.reset();
  } catch (err) {
    alert("Please enter a valid URL (e.g., example.com or https://example.com)");
  }
});e.preventDefault();
  const url = e.target.querySelector('input').value;
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${url}">${url}</a>`;
  document.getElementById('urlList').appendChild(listItem);
  e.target.reset();
  document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#urlList li').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
  // Save to localStorage
function saveURL(url) {
  const urls = JSON.parse(localStorage.getItem('urls') || '[]');
  urls.push(url);
  localStorage.setItem('urls', JSON.stringify(urls));
  window.addEventListener('error', (e) => {
  fetch('/log-error', { method: 'POST', body: e.message });
});
}

// Load on startup
window.addEventListener('load', () => {
  const savedUrls = JSON.parse(localStorage.getItem('urls') || '[]');
  savedUrls.forEach(url => addUrlToList(url));
});
});