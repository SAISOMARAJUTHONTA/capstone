 const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });
function addSignupInfo() {
        const mail = document.querySelector(".signup .email").value;
        const password = document.querySelector(".signup-box .password").value;


            // Create an object with user signup data
            const userData = {
                name: name,
                email: mail,
                password: password 
            };

            // Send the user signup data to the backend using a POST request
            //alert(userData.name);
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }
                return response.json();
            })
            .then(data => {
                // Handle success response
                alert("Signup successful!");
                // Optionally, clear form fields or perform any other actions
                document.querySelector('.signup-box .email').value = '';
                document.querySelector('.signup-box .password').value = '';
                window.location.href = `/dashboard?username=${encodeURIComponent(userData.email)}`;
            })
            .catch(error => {
                // Handle error response
                console.error("Error adding user:", error);
                alert("Error during signup, please try again.");
            });
        }
    


    document.querySelector('.signup-box .clkbtn').addEventListener('click', addSignupInfo);

    function addLoginInfo() {
        const email = document.querySelector(".login-box .email").value;
        const password = document.querySelector(".login-box .password").value;

        // Send the user login data to the backend using a POST request
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = `/dashboard?username=${encodeURIComponent(data.username)}`;; // Redirect to the dashboard
        })
        .catch(error => {
            // Handle login error
            //console.error("Error during login:", error);
            alert("Seems like you are not a user please signup first");
            document.querySelector(".slider").classList.add("moveslider");
            document.querySelector(".form-section").classList.add("form-section-move");
            

        });
    }
    document.querySelector('.login-box .clkbtn').addEventListener('click', addLoginInfo);