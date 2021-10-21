console.log('register...');

window.onload = () => {
  const signUpForm = document.querySelector('#sign-up-form');
  signUpForm.addEventListener('submit', handleRegister);

  function handleRegister(e) {
    e.preventDefault();
    console.log('submit sign up form...');
  }
}