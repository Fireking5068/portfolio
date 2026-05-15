let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD NORMAL ITEM */
function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
}

/* ADD CUSTOM BREAD */
function addCustomBread() {
    let checkboxes = document.querySelectorAll(".product input[type=checkbox]");
    let selected = [];

    checkboxes.forEach(box => {
        if (box.checked) selected.push(box.value);
    });

    let name = "Custom Bread (" + selected.join(", ") + ")";
    let price = 12 + (selected.length * 2);

    cart.push({ name, price });
    saveCart();
}

/* SAVE */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

/* UPDATE DISPLAY */
function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <p>
                ${item.name} - $${item.price}
                <button onclick="removeItem(${index})">❌</button>
            </p>
        `;
        total += item.price;
    });

    if (cart.length > 0) total += 0;

    cartCount.innerText = cart.length;
    document.getElementById("total").innerText = "Total: $" + total;
}

/* REMOVE */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

/* CLEAR */
function clearCart() {
    cart = [];
    saveCart();
}

/* LOAD */
updateCart();