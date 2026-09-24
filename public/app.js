function showMessage(msg) {
  document.getElementById('message').innerHTML = msg;
}

function loadProduct() {
  const id = window.location.hash.substring(1);
  fetch('/products/' + id)
    .then((r) => r.json())
    .then((p) => {
      document.getElementById('product').innerHTML = '<h2>' + p.name + '</h2><p>' + p.description + '</p>';
    });
}

function saveToken(token) {
  localStorage.setItem('token', token);
  document.cookie = 'token=' + token;
}

loadProduct();
