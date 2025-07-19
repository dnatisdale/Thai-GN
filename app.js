// 👇 REPLACE YOUR EXISTING SUBMIT HANDLER WITH THIS
document.getElementById('urlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let url = document.getElementById('urlInput').value.trim();
  
  // Auto-add https:// if missing protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Validate URL (simple check)
  if (!url.includes('.') || url.split('.').length < 2) {
    alert("Please enter a valid URL (e.g., example.com)");
    return;
  }
  
  // Add to list and save (keep your existing code below)
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  document.getElementById('urlList').appendChild(listItem);
  e.target.reset();
  
  // If you have localStorage saving, keep that code here
});
  listItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  document.getElementById('urlList').appendChild(listItem);
  e.target.reset();
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