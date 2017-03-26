(function() {

    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            }; 
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            }; 
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    const submitNewLocationBtn = document.querySelector('.js-submit');
    if (submitNewLocationBtn !== null) {
        GET('/api/user/1/location').then((data) => {
            console.log(data);
        });

       submitNewLocationBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const lat = parseFloat(document.querySelector('.js-lat').value, 10);
            const lng = parseFloat(document.querySelector('.js-lng').value, 10);

            console.log(lat, lng);

            if (isNaN(lat) || isNaN(lng)) {
                console.log('here!')
                return;
            }

            POST('/api/user/1/location', {
                lat,
                lng,
            }).then((data) => {
                console.log(data);
            });
        }); 
    }

    const submitSignUpBtn = document.querySelector('.js-signup');
    if (submitSignUpBtn !== null) {
        submitSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.querySelector('.js-name').value;
            const email = document.querySelector('.js-email').value;
            const password = document.querySelector('.js-pw').value;

            POST('/auth/signup', {
                name,
                email,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });
        });
    }

    const loginSignUpBtn = document.querySelector('.js-login');
    if (loginSignUpBtn !== null) {
        loginSignUpBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const email = document.querySelector('.js-email').value;
            const password = document.querySelector('.js-pw').value;

            POST('/auth/login', {
                email,
                password,
            }).then((data) => {
                console.log(data)
                if (data.success) {
                //     window.location.href = '/login.html'
                }
            });
        });
    }
    
})();
