var myUsername = document.getElementById('exampleInputUsername');
var myPassword = document.getElementById('exampleInputPassword1');
var letter = document.getElementById('letter');
var capital = document.getElementById('capital');
var number = document.getElementById('number');
var length = document.getElementById('length');
var lowerCaseLetters = /[a-z]/g;
var upperCaseLetters = /[A-Z]/g;
var numbers = /[0-9]/g;
if (localStorage.getItem('user')) {
  document.querySelector('#sub').disabled = true;
  document.querySelector('#nextpage').disabled = false;
} else {
  document.querySelector('#nextpage').disabled = true;
  document.querySelector('#sub').disabled = false;
}
// document.querySelector('#nextpage').disabled = false;
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#myPassword');
togglePassword.addEventListener('click', function (e) {
  const type =
    myPassword.getAttribute('type') === 'password' ? 'text' : 'password';
  myPassword.setAttribute('type', type);
  this.classList.toggle('glyphicon-eye-close');
});
document.querySelector('#forpass').addEventListener('click', function () {
  localStorage.removeItem('pass');
  document.querySelector('#message').style.display = 'none';
  document.querySelector('#message1').style.display = 'none';
  document.querySelector('#errmessage1').textContent =
    'KINDLY SIGN UP WITH NEW PASSWORD';
  document.querySelector('#errmessage').style.display = 'block';

  myPassword.value = '';
  document.querySelector('#nextpage').disabled = true;
  document.querySelector('#sub').disabled = false;
});
document.querySelector('#reset').addEventListener('click', function () {
  localStorage.removeItem('pass');
  localStorage.removeItem('user');
  localStorage.removeItem('notes');
  myPassword.value = '';
  myUsername.value = '';
  location.replace('passwordgen.html');
});

document.querySelector('#sub').addEventListener('click', function () {
  if (myUsername.value.length == 0) {
    alert('user field is empty');
    let temp = prompt('enter user name');
    myUsername.value = temp;
  }
  if (
    myPassword.value.match(lowerCaseLetters) &&
    myPassword.value.match(upperCaseLetters) &&
    myPassword.value.match(numbers) &&
    myPassword.value.length >= 8
  ) {
    localStorage.setItem('user', myUsername.value);
    localStorage.setItem('pass', myPassword.value);

    document.querySelector('#message').style.display = 'none';
    document.querySelector('#message1').style.display = 'block';
    document.querySelector('#errmessage').style.display = 'none';
    document.querySelector('#message1').textContent =
      'CREDENTIALS SAVED SUCCESSFULLY';
    document.querySelector('#message1').style.color = 'green';
    console.log('passsuccess');
    myPassword.value = '';
    myUsername.value = '';
    document.querySelector('#sub').disabled = true;
    document.querySelector('#nextpage').disabled = false;
  } else {
    if (myPassword.value.match(lowerCaseLetters)) {
      letter.classList.remove('invalid');
      letter.classList.add('valid');
    } else {
      letter.classList.remove('valid');
      letter.classList.add('invalid');
    }
    if (myPassword.value.match(upperCaseLetters)) {
      capital.classList.remove('invalid');
      capital.classList.add('valid');
    } else {
      capital.classList.remove('valid');
      capital.classList.add('invalid');
    }
    if (myPassword.value.match(numbers)) {
      number.classList.remove('invalid');
      number.classList.add('valid');
    } else {
      number.classList.remove('valid');
      number.classList.add('invalid');
    }
    if (myPassword.value.length >= 8) {
      length.classList.remove('invalid');
      length.classList.add('valid');
    } else {
      length.classList.remove('valid');
      length.classList.add('invalid');
    }
    document.querySelector('#message').style.display = 'block';
    document.querySelector('#message1').style.display = 'none';
    document.querySelector('#errmessage1').textContent =
      'SET A STRONG PASSWORD!';

    document.querySelector('#errmessage').style.display = 'block';
  }
});
document.querySelector('#nextpage').addEventListener('click', function () {
  if (
    myUsername.value == localStorage.getItem('user') &&
    myPassword.value == localStorage.getItem('pass')
  ) {
    location.replace('index.html');
  } else {
    document.querySelector('#errmessage1').textContent =
      'INVALID USER OR PASSWORD';
    document.querySelector('#errmessage').style.display = 'block';
    document.querySelector('#message').style.display = 'none';
    document.querySelector('#message1').style.display = 'none';
  }
});
