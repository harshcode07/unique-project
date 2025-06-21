// Kirana Store Data
const kiranaStores = [
    {
        id: 1,
        name: "Rahul Kirana Store",
        image: "https://source.unsplash.com/random/600x400/?grocery,store",
        rating: 4.5,
        ratingCount: 120,
        description: "Complete grocery store with fresh vegetables and fruits",
        deliveryTime: "15-20",
        distance: 0.5,
        location: { lat: 19.0760, lng: 72.8777 },
        address: "123 Main Road, Andheri East, Mumbai",
        products: [
            { id: 101, name: "Potato (1 kg)", price: 25, category: "vegetables", image: "https://source.unsplash.com/random/300x300/?potato" },
            { id: 102, name: "Tomato (1 kg)", price: 30, category: "vegetables", image: "https://source.unsplash.com/random/300x300/?tomato" },
            { id: 103, name: "Onion (1 kg)", price: 35, category: "vegetables", image: "https://source.unsplash.com/random/300x300/?onion" },
            { id: 104, name: "Milk (1L)", price: 50, category: "dairy", image: "https://source.unsplash.com/random/300x300/?milk" },
            { id: 105, name: "Bread", price: 35, category: "dairy", image: "https://source.unsplash.com/random/300x300/?bread" },
            { id: 106, name: "Eggs (Dozen)", price: 60, category: "dairy", image: "https://source.unsplash.com/random/300x300/?eggs" }
        ]
    },
    {
        id: 2,
        name: "Fresh Mart",
        image: "https://source.unsplash.com/random/600x400/?supermarket",
        rating: 4.2,
        ratingCount: 85,
        description: "Fresh fruits and vegetables with daily essentials",
        deliveryTime: "20-25",
        distance: 1.2,
        location: { lat: 19.0860, lng: 72.8677 },
        address: "456 Linking Road, Bandra West, Mumbai",
        products: [
            { id: 201, name: "Apple (1 kg)", price: 120, category: "fruits", image: "https://source.unsplash.com/random/300x300/?apple" },
            { id: 202, name: "Banana (Dozen)", price: 40, category: "fruits", image: "https://source.unsplash.com/random/300x300/?banana" },
            { id: 203, name: "Orange (1 kg)", price: 80, category: "fruits", image: "https://source.unsplash.com/random/300x300/?orange" },
            { id: 204, name: "Chips Packet", price: 20, category: "snacks", image: "https://source.unsplash.com/random/300x300/?chips" },
            { id: 205, name: "Biscuits", price: 25, category: "snacks", image: "https://source.unsplash.com/random/300x300/?biscuits" }
        ]
    },
    {
        id: 3,
        name: "Daily Needs",
        image: "https://source.unsplash.com/random/600x400/?grocery,shop",
        rating: 4.0,
        ratingCount: 65,
        description: "All your daily needs under one roof",
        deliveryTime: "25-30",
        distance: 1.8,
        location: { lat: 19.0660, lng: 72.8877 },
        address: "789 SV Road, Santacruz West, Mumbai",
        products: [
            { id: 301, name: "Rice (1 kg)", price: 50, category: "household", image: "https://source.unsplash.com/random/300x300/?rice" },
            { id: 302, name: "Wheat Flour (1 kg)", price: 40, category: "household", image: "https://source.unsplash.com/random/300x300/?flour" },
            { id: 303, name: "Sugar (1 kg)", price: 45, category: "household", image: "https://source.unsplash.com/random/300x300/?sugar" },
            { id: 304, name: "Tea Powder", price: 60, category: "beverages", image: "https://source.unsplash.com/random/300x300/?tea" },
            { id: 305, name: "Coffee Powder", price: 80, category: "beverages", image: "https://source.unsplash.com/random/300x300/?coffee" }
        ]
    },
    {
        id: 4,
        name: "Super Save",
        image: "https://source.unsplash.com/random/600x400/?grocery,market",
        rating: 4.7,
        ratingCount: 150,
        description: "Discount grocery store with best prices",
        deliveryTime: "30-35",
        distance: 2.5,
        location: { lat: 19.0560, lng: 72.8977 },
        address: "321 MG Road, Goregaon East, Mumbai",
        products: [
            { id: 401, name: "Cooking Oil (1L)", price: 180, category: "household", image: "https://source.unsplash.com/random/300x300/?oil" },
            { id: 402, name: "Salt (1 kg)", price: 20, category: "household", image: "https://source.unsplash.com/random/300x300/?salt" },
            { id: 403, name: "Cola (1L)", price: 60, category: "beverages", image: "https://source.unsplash.com/random/300x300/?cola" },
            { id: 404, name: "Juice (1L)", price: 90, category: "beverages", image: "https://source.unsplash.com/random/300x300/?juice" }
        ]
    }
];

// DOM Elements
const root = document.getElementById('root');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocation = document.getElementById('currentLocation');
const changeLocation = document.getElementById('changeLocation');
const loading = document.getElementById('loading');
const locationPrompt = document.getElementById('locationPrompt');
const enableLocation = document.getElementById('enableLocation');
const manualLocation = document.getElementById('manualLocation');
const storeCount = document.getElementById('storeCount');
const countSpan = document.getElementById('count');
const deliveryTime = document.getElementById('deliveryTime');
const noResults = document.getElementById('noResults');
const storeModal = document.getElementById('storeModal');
const closeModal = document.querySelectorAll('.close-modal');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const locationModal = document.getElementById('locationModal');
const confirmLocation = document.getElementById('confirmLocation');
const orderConfirmation = document.getElementById('orderConfirmation');
const categoryBtns = document.querySelectorAll('.category-btn');

// State
let currentStores = [];
let userLocation = null;
let cart = [];
let selectedStore = null;
let map;
let marker;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Check if location is already set in localStorage
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
        userLocation = JSON.parse(savedLocation);
        currentLocation.textContent = userLocation.address || "Location set";
        loadStores();
    } else {
        // Show location prompt
        loading.classList.add('hidden');
        locationPrompt.classList.remove('hidden');
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }

    // Event listeners
    enableLocation.addEventListener('click', getUserLocation);
    manualLocation.addEventListener('click', () => {
        locationPrompt.classList.add('hidden');
        locationModal.classList.remove('hidden');
        initMap();
    });

    changeLocation.addEventListener('click', () => {
        locationModal.classList.remove('hidden');
        initMap();
    });

    confirmLocation.addEventListener('click', confirmUserLocation);

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    closeModal.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        });
    });

    cartBtn.addEventListener('click', () => {
        renderCart();
        cartModal.classList.remove('hidden');
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterStoresByCategory(btn.dataset.category);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
});

// Initialize Google Map
function initMap() {
    const defaultLocation = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation || defaultLocation,
        zoom: 14
    });

    marker = new google.maps.Marker({
        position: userLocation || defaultLocation,
        map: map,
        draggable: true
    });

    // Add click listener to update marker position
    map.addListener('click', (e) => {
        marker.setPosition(e.latLng);
    });

    // Initialize places autocomplete
    const input = document.getElementById('locationSearch');
    const autocomplete = new google.maps.places.Autocomplete(input);
    
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
        }
    });
}

// Get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Reverse geocode to get address
                                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: userLocation }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        userLocation.address = results[0].formatted_address;
                        localStorage.setItem('userLocation', JSON.stringify(userLocation));
                        currentLocation.textContent = userLocation.address;
                        locationPrompt.classList.add('hidden');
                        loadStores();
                    } else {
                        alert("Could not determine address. Try again.");
                    }
                });
            },
            (error) => {
                alert("Location access denied.");
                locationPrompt.classList.add('hidden');
                locationModal.classList.remove('hidden');
                initMap();
            }
        );
    } else {
        alert("Geolocation not supported.");
    }
}

// Confirm user-selected location from map
function confirmUserLocation() {
    const pos = marker.getPosition();
    userLocation = {
        lat: pos.lat(),
        lng: pos.lng()
    };

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: userLocation }, (results, status) => {
        if (status === "OK" && results[0]) {
            userLocation.address = results[0].formatted_address;
            localStorage.setItem('userLocation', JSON.stringify(userLocation));
            currentLocation.textContent = userLocation.address;
            locationModal.classList.add('hidden');
            loadStores();
        } else {
            alert("Could not get address. Please try again.");
        }
    });
}

// Load stores based on user location
function loadStores() {
    currentStores = kiranaStores.sort((a, b) => a.distance - b.distance);
    renderStores(currentStores);
}

// Render store cards
function renderStores(stores) {
    root.innerHTML = "";
    countSpan.textContent = stores.length;
    storeCount.classList.remove('hidden');
    noResults.classList.toggle('hidden', stores.length > 0);

    stores.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.innerHTML = `
            <img src="${store.image}" alt="${store.name}" />
            <h3>${store.name}</h3>
            <p>${store.description}</p>
            <p><strong>${store.rating}⭐ (${store.ratingCount})</strong></p>
            <p>📍 ${store.address}</p>
            <p>⏱ Delivery: ${store.deliveryTime} min</p>
            <button onclick="viewStore(${store.id})">View Products</button>
        `;
        root.appendChild(storeCard);
    });
}

// View selected store's products
function viewStore(storeId) {
    selectedStore = kiranaStores.find(store => store.id === storeId);
    const modalContent = document.getElementById('storeProducts');
    modalContent.innerHTML = `<h2>${selectedStore.name}</h2>`;
    selectedStore.products.forEach(product => {
        const prod = document.createElement('div');
        prod.className = 'product';
        prod.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.name}</p>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        modalContent.appendChild(prod);
    });
    storeModal.classList.remove('hidden');
}

// Add product to cart
function addToCart(productId) {
    const product = selectedStore.products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Render cart modal
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        total += item.price * item.quantity;
        cartItems.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `<strong>Total: ₹${total}</strong>`;
    cartItems.appendChild(totalDiv);

    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = "Place Order";
    checkoutBtn.onclick = () => {
        alert("Order placed successfully!");
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        cartModal.classList.add('hidden');
    };
    cartItems.appendChild(checkoutBtn);
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = kiranaStores.filter(store =>
        store.name.toLowerCase().includes(query) ||
        store.products.some(p => p.name.toLowerCase().includes(query))
    );
    renderStores(filtered);
}

// Filter stores by product category
function filterStoresByCategory(category) {
    const filtered = kiranaStores.filter(store =>
        store.products.some(p => p.category === category)
    );
    renderStores(filtered);
}
