let cart = JSON.parse(localStorage.getItem("cart")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || [
    { rating: 5, text: "Best bread I've ever had!" },
    { rating: 4, text: "Super fresh and tasty." },
    { rating: 5, text: "Loved the custom bread!" }
];

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
}

function addCustomBread() {
    let boxes = document.querySelectorAll(".custom-card input[type='checkbox']");
    let selected = [];

    boxes.forEach(box => {
        if (box.checked) {
            selected.push(box.value);
        }
    });

    if (selected.length === 0) {
        alert("Please select at least one add-in.");
        return;
    }

    let price = 13 + selected.length * 2;
    let name = "Custom Bread (" + selected.join(", ") + ")";

    cart.push({ name, price });

    boxes.forEach(box => box.checked = false);

    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let items = document.getElementById("cart-items");
    let count = document.getElementById("cart-count");
    let totalText = document.getElementById("total");

    items.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        items.innerHTML += `
            <p>
                ${item.name} - $${item.price}
                <button onclick="removeItem(${index})">Remove</button>
            </p>
        `;
    });

    if (cart.length > 0) {
        total += 0;
    }

    count.innerText = cart.length;
    totalText.innerText = "Total: $" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function checkout() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    if (name === "" || address === "") {
        alert("Please fill out your name and address.");
        return;
    }

    alert("Order placed! Thank you, " + name + ".");

    cart = [];
    saveCart();

    document.getElementById("name").value = "";
    document.getElementById("address").value = "";

    toggleCart();
}

function addReview() {
    let input = document.getElementById("review-input");
    let rating = document.getElementById("rating").value;

    if (input.value.trim() === "") {
        alert("Please write a review.");
        return;
    }

    reviews.push({
        rating: Number(rating),
        text: input.value
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    input.value = "";

    displayReviews();
}

function removeReview(index) {
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
}

function displayReviews() {
    let box = document.getElementById("reviews");
    box.innerHTML = "";

    reviews.forEach((review, index) => {
        box.innerHTML += `
            <p>
                ${"⭐".repeat(review.rating)} "${review.text}"
                <br>
                <button onclick="removeReview(${index})">Remove Review</button>
            </p>
        `;
    });
}

function scrollToMenu() {
    document.getElementById("menu").scrollIntoView();
}

updateCart();
displayReviews();