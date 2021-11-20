// This form logic is for sign-up because there is a login AND signup together
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    // Add await to help make it async
    const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
              username,
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' }
          //by using  async/await we don't need to chain ().then().catch()
    //   }).then((response) => {console.log(response)})
      });
      //check response status: instead of catch()
      if (response.ok){
        document.location.replace('/');
    } else {
    alert(response.statusText);
    }
  }
}

async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);