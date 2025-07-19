// ======================
// MAIN URL FORM HANDLER
// ======================
document.getElementById('urlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const urlInput = document.getElementById('urlInput');
  const categorySelect = document.getElementById('category');
  const url = urlInput.value.trim();
  const category = categorySelect.value;
  
  // Auto-add https:// if missing
  let processedUrl = url;
  if (!/^https?:\/\//i.test(url)) {
    processedUrl = 'https://' + url;
  }

  // Validate URL
  try {
    new URL(processedUrl); // Throws if invalid
    addUrlToList(processedUrl, category);
    saveURL(processedUrl, category);
    urlInput.value = ''; // Clear input
    generateQR(processedUrl); // Auto-generate QR
  } catch (err) {
    alert("Please enter a valid URL (e.g., example.com)");
  }
});

// ======================
// SEARCH FUNCTIONALITY
// ======================
document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#urlList li').forEach(item => {
    const matchesText = item.textContent.toLowerCase().includes(term);
    const matchesCategory = item.dataset.category === e.target.value;
    item.style.display = (matchesText || matchesCategory) ? '' : 'none';
  });
});

// ======================
// STORAGE MANAGEMENT
// ======================
function saveURL(url, category) {
  const savedData = JSON.parse(localStorage.getItem('urlLibrary') || '[]');
  savedData.push({ url, category, timestamp: new Date().getTime() });
  localStorage.setItem('urlLibrary', JSON.stringify(savedData));
}

// ======================
// DISPLAY FUNCTIONS
// ======================
function addUrlToList(url, category) {
  const listItem = document.createElement('li');
  listItem.dataset.category = category;
  
  listItem.innerHTML = `
    <span class="category-badge" style="background: ${getCategoryColor(category)}">
      ${category}
    </span>
    <a href="${url}" target="_blank">${url}</a>
    <button class="qr-btn" data-url="${url}">QR Code</button>
  `;
  
  document.getElementById('urlList').appendChild(listItem);
  
  // Add QR button event
  listItem.querySelector('.qr-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    generateQR(e.target.dataset.url);
  });
}

// ======================
// QR CODE GENERATION
// ======================
function generateQR(url) {
  const qrContainer = document.getElementById('qrCode');
  qrContainer.innerHTML = '';
  
  // Using QRCode.js (include this library in your HTML)
  new QRCode(qrContainer, {
    text: url,
    width: 150,
    height: 150,
    colorDark: "#1abc9c",
    colorLight: "#ffffff",
  });
  
  // Auto-hide after 30 seconds
  setTimeout(() => qrContainer.innerHTML = '', 30000);
}

// ======================
// CATEGORY MANAGEMENT
// ======================
function getCategoryColor(category) {
  const colors = {
    work: '#3498db',
    personal: '#9b59b6',
    general: '#1abc9c'
  };
  return colors[category] || '#95a5a6';
}

// ======================
// INITIALIZATION
// ======================
window.addEventListener('load', () => {
  const savedData = JSON.parse(localStorage.getItem('urlLibrary') || []);
  
  // Load saved URLs
  savedData.forEach(item => {
    addUrlToList(item.url, item.category);
  });

  // Error handling
  window.addEventListener('error', (e) => {
    console.error('App Error:', e.message);
  });
});