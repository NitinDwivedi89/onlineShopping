// document.addEventListener("DOMContentLoaded", begin);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function userWelcome(name) {
    console.log(name);
    var elem = document.querySelector("#userAccount");
    elem.innerHTML = "Hi " + name + "!";
    closePop();

    var elem = document.querySelector(".rightHead");
    // elem.style.margin = "-12%";
    $('#signUpClick').css('display', 'none');
    var par = document.querySelector(".rightMaster");

    let nm = document.createElement('span');
    nm.innerHTML = '<a href="/onlineShopping/addProduct.html"><li><i class="fas fa-user"></i> ' + capitalizeFirstLetter(localStorage.username) + '  </li></a>';
    nm.id = "username";
    par.appendChild(nm);

    let lnk = document.createElement('a');
    lnk.setAttribute('href', '/cart.html');


    let v = document.createElement("li");
    v.id = "userCart";
    v.innerHTML = 'Cart';
    lnk.appendChild(v);
    par.appendChild(lnk);

    updateCart();
    var outButton = document.createElement("li");
    outButton.id = "logOut";
    outButton.innerHTML = "Logout";
    par.appendChild(outButton);

    document.querySelector("#logOut").addEventListener("click", logOut);
}

function closePop() {
    var blur = document.querySelector(".blur");
    blur.style.display = "none";

    var show = document.querySelector("#signUp");
    show.style.display = "none";
}

function showForm() {
    document.querySelector("#signUpForm").style.display = "block";
    var btns = document.querySelectorAll(".ctdsign");
    this.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    this.style.color = "#fff";
}

function logOut() {
    localStorage.removeItem('loggedIn');
    localStorage.username = "";
    window.location = "index.html";

    var par = document.querySelector(".rightMaster");
    var child = document.querySelector("#logOut");
    par.removeChild(child);

    var elem = document.querySelector(".rightHead");
    elem.style.width = "24%";
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
}

function fetchProducts() {
    var parDiv = document.querySelector("#newItems");
    var productRef = firebase.database().ref('products/');
    // var ul = document.createElement("ul");
    // ul.className = "childUL";    
    // console.log(productRef);

    productRef.on('value', (newValue) => {
        // console.log("newValue is",newValue);
        var count = 0;
        var object = newValue.val();
        // console.log(object);

        // console.log("Object is ",object);

        for (let key in object) {

            // console.log(object[key]);
            var obj = object[key];
            console.log(obj);
            //create elements and add classes to them
            var product = document.createElement("div");
            product.className = "product";
            product.setAttribute('id', obj.name);

            var productImage = document.createElement("div");
            productImage.className = "productImage"


            product.appendChild(productImage);

            var img = document.createElement("img");
            img.setAttribute("src", obj.url);
            productImage.appendChild(img);

            var sellDetails = document.createElement("div");
            sellDetails.classList = "sellDetails";
            product.appendChild(sellDetails);

            var head = document.createElement("h2");
            head.classList = "productName";
            head.innerHTML = obj.proname;

            // function getRandomColor() {
            //     var letters = '0123456789ABCDEF';
            //     var color = '#';
            //     for (var i = 0; i < 6; i++) {
            //       color += letters[Math.floor(Math.random() * 16)];
            //     }
            //     return color;
            // }

            // var color = getRandomColor();
            // // console.log(color);
            // head.style.color = color;
            sellDetails.appendChild(head);


            var price = document.createElement("span");
            price.classList = "proPrice";
            price.innerHTML = "₹" + obj.price;
            sellDetails.appendChild(price);

            var discount = document.createElement("span");
            discount.classList = "proDiscount";
            discount.innerHTML = obj.discount + "% off";
            sellDetails.appendChild(discount);

            parDiv.appendChild(product);


            // var catg = obj.category;
            // console.log(catg);

            // var li = document.createElement("li");
            // li.className = "childLI";
            // li.innerHTML = obj.name;
            // ul.appendChild(li);

            // if (catg == "men") {
            //     var parUL = document.querySelector("#catMen");
            //     parUL.appendChild("li");
            // }
            // else if (catg == "women") {
            //     var parUL = document.querySelector("#catMen");
            //     parUL.appendChild("li");
            // }
            // else if (catg == "electronics") {
            //     var parUL = document.querySelector("#catElectronics");
            //     parUL.appendChild("ul");
            // }
            // else if (catg == "kids") {
            //     var parUL = document.querySelector("#catKid");
            //     parUL.appendChild("li");
            // }
            // else if (catg == "sports") {
            //     var parUL = document.querySelector("#catSports");
            //     parUL.appendChild("li");
            // }
            // console.log(product);

            // console.log(object[key].name);
        }

        // $('#newItems').each(function() {
        //     // $(this).attr('id', count);
        //     console.log($(this));
        //     // count++;
        // })
    })
}

function updateCart() {
    let a = document.querySelector('#userCart');
    let c = JSON.parse(localStorage.getItem('users'));
    for(let i in c) {
        if(c[i]['username'] == localStorage.username) {
            c = c[i]['items'].length;
            break;
        }
    }
    if (typeof(c) === typeof(1)) {
        a.innerText = 'Cart' + '(' + c + ')';
    }
}

function updateCount(obj) {
    if (!localStorage.getItem('users')) {
        let users = [{'username': 'god', 'items' : []}];
        localStorage.setItem('users', JSON.stringify(users));
    }
    // console.log(obj);
    // let u = '';
    // let c = [];
    console.log(localStorage.getItem('users'));
    let c = JSON.parse(localStorage.getItem('users'));
    console.log(c);
    console.log(localStorage.username);
    for(let i in c) {
        console.log(c[i]['username']);
        if(c[i]['username'] == localStorage.username) {
            var u = c[i]['username'];
            console.log('mil ga');
            break;
        }
    }
    // let u = c[localStorage.username];
    console.log(u);
    console.log(c);
    console.log(typeof(c));
    if (u == undefined) {
        let objkt = {username: localStorage.username, items:[obj.name]};
        c.push(objkt);
        localStorage.setItem('users', JSON.stringify(c));
        updateCart();
    } else {
        for(let i in c) {
            if(c[i]['username'] == localStorage.username) {
                c[i]['items'].push(obj.name);
            }
        }
        console.log('undefined hai');
        // let objkt = {'username': 'god', 'items': [obj.name] };

        // c.push(objkt);
        // c = [...new Set(c)];
        localStorage.setItem('users', JSON.stringify(c));
        updateCart();
    }
}

$(document).ready(() => {
    if (localStorage.getItem('username') != undefined) {
        userWelcome(localStorage.getItem('username'));
    }
    document.querySelector("#cross").addEventListener("click", closePop);

    fetchProducts();


    // document.querySelector("#adminSubmit").addEventListener("click", fetchAdminData);
    // document.querySelector("#userSubmit").addEventListener("click", fetchUserData);
    // document.querySelector("#loginSubmit").addEventListener("click", loginData);
    // document.querySelector("#logOption").addEventListener("click", toggleUpIn);
    // document.querySelector("#signOption").addEventListener("click", toggleInUp);
    // document.querySelector("#userCart").addEventListener("click", userCart);

    $('#logOption').click(() => {
        // var log = document.querySelector("#LogIn");
        // var ll = document.querySelector('#logOption');
        // var hide = document.querySelector(".signOption");
        // var show = document.querySelector("#signOption");
        // var head = document.querySelector("#signUpHead");
        // var 
        $('#logOption').css('display', 'none');
        $('.signOption').css('display', 'none');
        $('#signUpHead').css('display', 'none');
        $('#LogIn').css('display', 'block');
        $('#signOption').css('display', 'block');
        $('#signUpForm').css('display', 'none');
        $('#signUpForm2').css('display', 'none');


        // head.style.display = "none";
        // hide.style.display = "none";
        // log.style.display = "block";
        // show.style.display = "block";
        // ll.style.display = "none";
    })

    $('#signOption').click(() => {
        let sn = document.querySelector('#signOption');
        var log = document.querySelector("#LogIn");
        var show = document.querySelector(".signOption");
        var head = document.querySelector("#signUpHead");
        var login = document.querySelector("#logOption");
        show.style.display = "block";
        login.style.display = "block";
        log.style.display = "none";
        head.style.display = "block";
        sn.style.display = "none";
    })

    $('#userCart').click(() => {
        if (localStorage.username === undefined || localStorage.username === "") {
            show();
        }
    })

    function addScroll() {
        // var div = document.querySelector("")
    }

    $('#signUpClick').click(() => {
        var blur = document.querySelector(".blur");
        blur.style.display = "block";

        var show = document.querySelector("#signUp");
        console.log("inside show");
        if (show.style.display === "none") {
            show.style.display = "block";
            console.log("show called");
        } else {
            show.style.display = "none";
            console.log("not show");
        }
        var modal = document.querySelector("#signUp");
        window.onclick = function (event) {
            if (event.target == HTMLBodyElement) {
                modal.style.display = "none";
            }
        }
    })

    // function show() {
    //     // var body = document.querySelector("body");
    //     // console.log(body);
    //     // var notblur = document.querySelector("#signUp");
    //     // if (body.className == "") {
    //     //     body.className+="filterBlur";
    //     // }
    //     // else {
    //     //     body.className = "";
    //     // }

    //     var blur = document.querySelector(".blur");
    //     blur.style.display = "block";

    //     var show = document.querySelector("#signUp");
    //     console.log("inside show");
    //     if (show.style.display === "none") {
    //         show.style.display = "block";
    //         console.log("show called");
    //     } else {
    //         show.style.display = "none";
    //         console.log("not show");
    //     }
    //     var modal = document.querySelector("#signUp");
    //     window.onclick = function (event) {
    //         if (event.target == HTMLBodyElement) {
    //             modal.style.display = "none";
    //         }
    //     }
    // }

    $('#adminSignUp').click(() => {
        var user = document.querySelector("#userSignUp");
        user.style.backgroundColor = "rgba(255, 255, 255,0.9)";
        user.style.color = "#000";

        var admin = document.querySelector("#adminSignUp");
        admin.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        admin.style.color = "#fff";

        var userForm = document.querySelector("#signUpForm2");
        userForm.style.display = "none";

        var adminForm = document.querySelector("#signUpForm");
        adminForm.style.display = "block";
    })

    $('#userSignUp').click(() => {
        var admin = document.querySelector("#adminSignUp");
        admin.style.backgroundColor = "rgba(255, 255, 255,0.9)";
        admin.style.color = "#000";

        var user = document.querySelector("#userSignUp");
        user.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
        user.style.color = "#fff";

        var adminForm = document.querySelector("#signUpForm");
        adminForm.style.display = "none";

        var userForm = document.querySelector("#signUpForm2");
        userForm.style.display = "block";
    })



    $('#adminSubmit').click(() => {
        var adminName = document.querySelector("#adminfName").value;
        var adminEmail = document.querySelector("#adminEmail").value;
        var adminPass = document.querySelector("#adminPass").value;
        var adminPassConf = document.querySelector("#adminPassConf").value;
        console.log(adminName, adminEmail, adminPass, adminPassConf);
        var newAdminData = new newAdmin(adminName, adminEmail, adminPass);
        localStorage.setItem('isAdmin', true);
        localStorage.setItem('username', 'adminName');
        adminControl.addDetails(newAdminData);
    })

    $('#userSubmit').click(() => {
        var userName = document.querySelector("#userfName").value;
        var userPass = document.querySelector("#userPass").value;
        var userEmail = document.querySelector("#userEmail").value;
        var userPassConf = document.querySelector("#userPassConf").value;
        var userDOB = document.querySelector("#userDOB").value;
        var userAdd = document.querySelector("#userAddress").value;
        console.log(userName, userEmail, userPass, userPassConf);
        var newUserData = new newUser(userName, userPass, userEmail, userDOB, userAdd);
        userControl.addDetails(newUserData);
    })

    $('#loginSubmit').click(() => {
        var email = document.querySelector("#loginEmail").value;
        var pass = document.querySelector("#loginPass").value;
        var user = new ourUser(email, pass);
        console.log(email, pass);
        adminControl.checkAdmin(user);
        userControl.checkUser(user);
    })

    $('.productImage').click(function () {
        alert();
    })

})

$(document).on('click', '.product', function () {
    console.log($(this).attr('id'));
    showElement($(this).attr('id'));
})

function showElement(id) {
    var parDiv = document.querySelector("body");
    var productRef = firebase.database().ref('products/' + id);

    productRef.on('value', (newValue) => {
        var object = newValue.val();
        console.log(object);

        $('.showProduct').remove();

        var obj = object;
        var product = document.createElement("div");
        product.className = "showProduct";

        var span = document.createElement('span');
        span.innerHTML = '&#10006;';
        span.setAttribute('id', 'cross2');
        product.appendChild(span);

        var productImage = document.createElement("div");
        productImage.className = "showProductImage"

        product.appendChild(productImage);

        var img = document.createElement("img");
        img.setAttribute("src", obj.url);
        productImage.appendChild(img);

        var sellDetails = document.createElement("div");
        sellDetails.classList = "sellDetails";
        product.appendChild(sellDetails);

        var head = document.createElement("h2");
        head.classList = "productName";
        head.innerHTML = obj.proname;

        sellDetails.appendChild(head);

        var price = document.createElement("span");
        price.classList = "proPrice";
        price.innerHTML = "₹" + obj.price;
        sellDetails.appendChild(price);

        var discount = document.createElement("span");
        discount.classList = "proDiscount";
        discount.innerHTML = obj.discount + "% off";
        sellDetails.appendChild(discount);


        var buts = document.createElement('div');
        buts.classList = 'showImageBut';
        product.appendChild(buts);

        var buy = document.createElement('button');
        buy.classList = 'buyNow submit';
        buy.innerText = 'Check Now';
        buts.appendChild(buy);

        var addToCart = document.createElement('button');
        addToCart.classList = 'addcart submit';
        addToCart.innerText = 'Add To Cart';
        buts.appendChild(addToCart);

        parDiv.appendChild(product);

        document.querySelector('#cross2').addEventListener('click', function () {
            var show = document.querySelector(".showProduct");
            show.style.display = "none";
        })

        document.querySelector('.addcart').addEventListener('click', function () {
            updateCount(object);
        })

    })
}

