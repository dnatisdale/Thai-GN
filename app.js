document.getElementById('urlForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const url = e.target.querySelector('input').value;
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${url}">${url}</a>`;
  document.getElementById('urlList').appendChild(listItem);
  e.target.reset();
});