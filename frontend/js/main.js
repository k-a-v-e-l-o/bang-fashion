// Complete product data with ALL images from each folder
const productsData = {
    bang_bb_dress: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.35 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.35.jpeg"
        ]
    },
    bang_bb_sweater: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.44 (3).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.45 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.45 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.45 (3).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.45.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.46 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.46 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.46 (3).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.46.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.47 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.47.jpeg"
        ]
    },
    bang_bb_t_shirt: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.37.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.38 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.38 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.38.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.39.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.40.jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.45 (4).jpeg"
        ]
    },
    bang_care: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.40 (1).jpeg"
        ]
    },
    bang_danger_2pc_set: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.47 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.43.47 (3).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.20.jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.25 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.25 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.25.jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.26 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.26 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.26.jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.27.jpeg"
        ]
    },
    bang_danger_t_shirt: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.34 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.34 (2).jpeg"
        ]
    },
    bang_essence: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.43 (2).jpeg"
        ]
    },
    bang_is_valuable: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.43.35 (1).jpeg"
        ]
    },
    bang_is_valuable_2: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.32 (1).jpeg"
        ]
    },
    bang_root_2pc: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.24.jpeg"
        ]
    },
    bang_root_hoodie: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.23 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.23 (2).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.23 (3).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.23.jpeg"
        ]
    },
    bang_root_t_shirt: {
        images: [
            "WhatsApp Image 2026-05-04 at 12.44.30 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.31 (1).jpeg",
            "WhatsApp Image 2026-05-04 at 12.44.31.jpeg"
        ]
    }
};

// Products with main images
const products = [
    { id: 1, name: "Bang BB Dress", price: 500, category: "dress", folder: "bang_bb_dress", image: "WhatsApp Image 2026-05-04 at 12.44.35.jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Beige","Orange"] },
    { id: 2, name: "Bang BB Sweater", price: 650, category: "sweater", folder: "bang_bb_sweater", image: "WhatsApp Image 2026-05-04 at 12.43.44 (3).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Brown","Blue"] },
    { id: 3, name: "Bang BB T-shirt", price: 400, category: "tshirt", folder: "bang_bb_t_shirt", image: "WhatsApp Image 2026-05-04 at 12.43.37.jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Brown","Green"] },
    { id: 4, name: "Bang-Care", price: 500, category: "tshirt", folder: "bang_care", image: "WhatsApp Image 2026-05-04 at 12.43.40 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey"] },
    { id: 5, name: "Bang Danger 2pc Set", price: 1000, category: "set", folder: "bang_danger_2pc_set", image: "WhatsApp Image 2026-05-04 at 12.43.47 (2).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey","Green","Brown"] },
    { id: 6, name: "Bang Danger T-shirt", price: 500, category: "tshirt", folder: "bang_danger_t_shirt", image: "WhatsApp Image 2026-05-04 at 12.44.34 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White"] },
    { id: 7, name: "Bang Essence", price: 500, category: "tshirt", folder: "bang_essence", image: "WhatsApp Image 2026-05-04 at 12.43.43 (2).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey"] },
    { id: 8, name: "Bang Is Valuable", price: 450, category: "tshirt", folder: "bang_is_valuable", image: "WhatsApp Image 2026-05-04 at 12.43.35 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White"] },
    { id: 9, name: "Bang Is Valuable 2.0", price: 500, category: "tshirt", folder: "bang_is_valuable_2", image: "WhatsApp Image 2026-05-04 at 12.44.32 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey"] },
    { id: 10, name: "Bang Root 2pc Set", price: 1000, category: "set", folder: "bang_root_2pc", image: "WhatsApp Image 2026-05-04 at 12.44.24.jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey"] },
    { id: 11, name: "Bang Root Hoodie", price: 700, category: "hoodie", folder: "bang_root_hoodie", image: "WhatsApp Image 2026-05-04 at 12.44.23 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White","Grey","Green","Brown","Blue"] },
    { id: 12, name: "Bang Root T-shirt", price: 500, category: "tshirt", folder: "bang_root_t_shirt", image: "WhatsApp Image 2026-05-04 at 12.44.30 (1).jpeg", sizes: ["S","M","L","XL","XXL"], colors: ["Black","White"] }
];

let cart = [];
let currentUser = null;
let currentFilter = 'all';
let currentSearch = '';
let currentLightboxImages = [];
let currentImageIndex = 0;
let currentLightboxFolder = '';

// User management
function loadUser() {
    const savedUser = localStorage.getItem('bangFashionUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateProfileUI();
    }
}

function saveUser(user) {
    localStorage.setItem('bangFashionUser', JSON.stringify(user));
    currentUser = user;
    updateProfileUI();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('bangFashionUser');
    updateProfileUI();
    showNotification('Logged out successfully');
}

function updateProfileUI() {
    const profileIcon = document.getElementById('profile-icon');
    if (currentUser) {
        profileIcon.innerHTML = `
            <div class="logged-in-user">
                <i class="fas fa-user-circle"></i>
                <span>${currentUser.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down"></i>
                <div class="user-dropdown">
                    <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.onclick = (e) => { e.preventDefault(); logout(); };
    } else {
        profileIcon.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>Account</span>
        `;
    }
}

function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    let filtered = products.filter(p => currentFilter === 'all' || p.category === currentFilter);
    if (currentSearch) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch.toLowerCase()));
    }
    
    grid.innerHTML = filtered.map(p => {
        const imgPath = `images/bb_pictures/${p.folder}/${p.image}`;
        const hasMultiple = productsData[p.folder] && productsData[p.folder].images.length > 1;
        const imageCount = productsData[p.folder] ? productsData[p.folder].images.length : 1;
        
        return `
        <div class="product-card">
            <img class="product-image" 
                 src="${imgPath}" 
                 alt="${p.name}"
                 onclick="openLightbox('${p.folder}')"
                 onerror="this.onerror=null; this.src='https://placehold.co/400x400/3e2723/d4b895?text=${encodeURIComponent(p.name)}'">
            ${hasMultiple ? `<div class="image-badge"><i class="fas fa-images"></i> ${imageCount} photos</div>` : ''}
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-price">ZAR ${p.price}</div>
                <div class="size-selector">
                    <label>SIZE</label>
                    <div class="size-buttons">
                        ${p.sizes.map(size => `<button class="size-btn">${size}</button>`).join('')}
                    </div>
                </div>
                <div class="color-selector">
                    <label>COLOR</label>
                    <div class="color-buttons">
                        ${p.colors.map(color => `<button class="color-btn">${color}</button>`).join('')}
                    </div>
                </div>
                <div class="quantity-selector">
                    <button class="qty-minus">−</button>
                    <span class="qty-value">1</span>
                    <button class="qty-plus">+</button>
                </div>
                <button class="add-to-cart" 
                        data-name="${p.name}" 
                        data-price="${p.price}" 
                        data-folder="${p.folder}" 
                        data-image="${p.image}">
                    ADD TO BAG
                </button>
            </div>
        </div>`;
    }).join('');
    
    attachEvents();
}

function openLightbox(folder) {
    if (productsData[folder] && productsData[folder].images.length > 0) {
        currentLightboxImages = productsData[folder].images;
    } else {
        const product = products.find(p => p.folder === folder);
        currentLightboxImages = [product.image];
    }
    currentLightboxFolder = folder;
    currentImageIndex = 0;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    img.src = `images/bb_pictures/${currentLightboxFolder}/${currentLightboxImages[currentImageIndex]}`;
    document.getElementById('img-counter').innerHTML = `${currentImageIndex + 1} / ${currentLightboxImages.length}`;
    document.getElementById('thumbnail-strip').innerHTML = currentLightboxImages.map((src, i) => 
        `<img class="thumbnail ${i === currentImageIndex ? 'active' : ''}" 
              src="images/bb_pictures/${currentLightboxFolder}/${src}" 
              onclick="changeImage(${i})">`
    ).join('');
}

function changeImage(i) { currentImageIndex = i; updateLightbox(); }
function nextImage() { if (currentImageIndex < currentLightboxImages.length - 1) { currentImageIndex++; updateLightbox(); } }
function prevImage() { if (currentImageIndex > 0) { currentImageIndex--; updateLightbox(); } }

function attachEvents() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.onclick = function() {
            this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        };
    });
    
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.onclick = function() {
            this.parentElement.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        };
    });
    
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.onclick = function() {
            let span = this.parentElement.querySelector('.qty-value');
            span.textContent = parseInt(span.textContent) + 1;
        };
    });
    
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.onclick = function() {
            let span = this.parentElement.querySelector('.qty-value');
            let val = parseInt(span.textContent);
            if (val > 1) span.textContent = val - 1;
        };
    });
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = function() {
            let card = this.closest('.product-card');
            let size = card.querySelector('.size-btn.active')?.textContent || 'M';
            let color = card.querySelector('.color-btn.active')?.textContent || 'Black';
            let qty = parseInt(card.querySelector('.qty-value').textContent);
            
            cart.push({
                name: this.dataset.name,
                price: parseInt(this.dataset.price),
                size: size,
                color: color,
                qty: qty,
                folder: this.dataset.folder,
                image: this.dataset.image
            });
            updateCart();
            showNotification(`✓ ${this.dataset.name} added to bag`);
        };
    });
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3e2723;
        color: #d4b895;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

function updateCart() {
    let count = cart.reduce((s, i) => s + i.qty, 0);
    let total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    document.getElementById('cart-count').innerHTML = count;
    document.getElementById('cart-total').innerHTML = `ZAR ${total}`;
    
    let itemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p class="empty-cart">Your bag is empty 🛍️</p>';
    } else {
        itemsDiv.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <img src="images/bb_pictures/${item.folder}/${item.image}" 
                     onerror="this.src='https://placehold.co/70x70/3e2723/d4b895?text=item'">
                <div style="flex:1">
                    <strong>${item.name}</strong><br>
                    <small>Size: ${item.size} | Color: ${item.color}</small><br>
                    Qty: ${item.qty} | ZAR ${item.price * item.qty}<br>
                    <button onclick="removeItem(${i})" style="background:none;border:none;color:#d4b895;cursor:pointer;">✕ Remove</button>
                </div>
            </div>
        `).join('');
    }
}

function removeItem(i) { cart.splice(i, 1); updateCart(); }
function openCart() { document.getElementById('cart-sidebar').classList.add('open'); document.getElementById('cart-overlay').classList.add('active'); }
function closeCart() { document.getElementById('cart-sidebar').classList.remove('open'); document.getElementById('cart-overlay').classList.remove('active'); }

// Auth functions
function openAuth() { document.getElementById('auth-modal').style.display = 'block'; }
function closeAuth() { document.getElementById('auth-modal').style.display = 'none'; }

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedUsers = JSON.parse(localStorage.getItem('bangFashionUsers') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        saveUser({ name: user.name, email: user.email, phone: user.phone });
        showNotification(`Welcome back, ${user.name}!`);
        closeAuth();
    } else {
        showNotification('Invalid email or password');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    
    if (password !== confirm) { showNotification('Passwords do not match'); return; }
    if (password.length < 6) { showNotification('Password must be at least 6 characters'); return; }
    
    const storedUsers = JSON.parse(localStorage.getItem('bangFashionUsers') || '[]');
    if (storedUsers.find(u => u.email === email)) { showNotification('Email already registered'); return; }
    
    storedUsers.push({ name, email, phone, password });
    localStorage.setItem('bangFashionUsers', JSON.stringify(storedUsers));
    saveUser({ name, email, phone });
    showNotification(`Welcome to Bang Fashion, ${name}!`);
    closeAuth();
}

// Checkout functions
function openCheckout() {
    if (cart.length === 0) { showNotification('Your cart is empty!'); return; }
    if (!currentUser) { showNotification('Please login to checkout'); openAuth(); return; }
    
    const checkoutItems = document.getElementById('checkout-items');
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.size}, ${item.color}) x${item.qty}</span>
            <span>ZAR ${item.price * item.qty}</span>
        </div>
    `).join('');
    document.getElementById('checkout-total').textContent = `ZAR ${total}`;
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

function placeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    
    if (!name || !email || !phone || !address || !city || !province) {
        showNotification('Please fill in all fields');
        return;
    }
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const orderSummary = cart.map(item => `${item.name} (${item.size}, ${item.color}) x${item.qty} = ZAR ${item.price * item.qty}`).join('\n');
    
    alert(`✅ ORDER PLACED SUCCESSFULLY!\n\nThank you ${currentUser.name}!\n\nOrder Details:\n${orderSummary}\n\nTotal: ZAR ${total}\n\nShipping to:\n${address}, ${city}, ${province}`);
    
    cart = [];
    updateCart();
    closeCheckout();
    closeCart();
    document.getElementById('checkout-form').reset();
    showNotification('Order placed successfully! 🎉');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    displayProducts();
    
    document.getElementById('cart-icon').onclick = openCart;
    document.getElementById('close-cart').onclick = closeCart;
    document.getElementById('cart-overlay').onclick = closeCart;
    document.getElementById('profile-icon').onclick = openAuth;
    document.querySelector('.checkout-btn').onclick = openCheckout;
    document.getElementById('hero-shop-btn').onclick = () => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('about-link').onclick = (e) => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); };
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            displayProducts();
        };
    });
    
    document.getElementById('search-input').oninput = function() { currentSearch = this.value; displayProducts(); };
    
    // Auth modal
    document.querySelector('.close-auth').onclick = closeAuth;
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.onclick = function() {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
            document.getElementById(`${this.dataset.tab}-form`).classList.add('active');
        };
    });
    document.querySelectorAll('.switch-auth').forEach(link => {
        link.onclick = function() {
            const isLogin = this.textContent.includes('Login');
            document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === (isLogin ? 'login' : 'register')));
            document.querySelectorAll('.auth-form').forEach(form => form.classList.toggle('active', form.id === `${isLogin ? 'login' : 'register'}-form`));
        };
    });
    
    document.getElementById('login-form').onsubmit = handleLogin;
    document.getElementById('register-form').onsubmit = handleRegister;
    
    // Privacy modal
    let privacyModal = document.getElementById('privacy-modal');
    document.getElementById('privacy-link').onclick = (e) => { e.preventDefault(); privacyModal.style.display = 'block'; };
    document.querySelector('.close-modal').onclick = () => privacyModal.style.display = 'none';
    
    // Checkout modal
    document.querySelector('.close-checkout').onclick = closeCheckout;
    document.getElementById('checkout-modal').onclick = (e) => { if (e.target === document.getElementById('checkout-modal')) closeCheckout(); };
    document.getElementById('checkout-form').onsubmit = placeOrder;
    
    // Lightbox
    let lightbox = document.getElementById('lightbox');
    document.querySelector('.close-lightbox').onclick = () => lightbox.classList.remove('active');
    document.getElementById('prev-img').onclick = prevImage;
    document.getElementById('next-img').onclick = nextImage;
    window.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); };
});

window.openLightbox = openLightbox;
window.changeImage = changeImage;
window.removeItem = removeItem;
window.prevImage = prevImage;
window.nextImage = nextImage;
// Add this to the placeOrder function - replace the existing placeOrder
window.placeOrderOriginal = placeOrder;
window.placeOrder = function(event) {
    event.preventDefault();
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    
    if (!name || !email || !phone || !address || !city || !province) {
        showNotification('Please fill in all fields');
        return;
    }
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    // Save order to localStorage for admin
    const orderData = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: `${address}, ${city}, ${province}`,
        items: cart.map(item => ({
            name: item.name,
            size: item.size,
            color: item.color,
            qty: item.qty,
            price: item.price
        })),
        total: total
    };
    
    // Dispatch event for admin panel
    if (window.addOrderFromCheckout) {
        window.addOrderFromCheckout(orderData);
    } else {
        // Save to localStorage directly
        const existingOrders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
        const newOrder = {
            id: `ORD-${String(existingOrders.length + 1).padStart(3, '0')}`,
            ...orderData,
            status: 'pending',
            date: new Date().toISOString()
        };
        existingOrders.unshift(newOrder);
        localStorage.setItem('bangFashionOrders', JSON.stringify(existingOrders));
    }
    
    const orderSummary = cart.map(item => 
        `${item.name} (${item.size}, ${item.color}) x${item.qty} = ZAR ${item.price * item.qty}`
    ).join('\n');
    
    alert(`✅ ORDER PLACED SUCCESSFULLY!\n\nThank you ${name}!\n\nOrder Details:\n${orderSummary}\n\nTotal: ZAR ${total}\n\nShipping to:\n${address}, ${city}, ${province}\n\nThe admin will process your order shortly.`);
    
    cart = [];
    updateCart();
    closeCheckout();
    closeCart();
    document.getElementById('checkout-form').reset();
    showNotification('Order placed successfully! 🎉');
};

// Replace the function
document.getElementById('checkout-form').onsubmit = window.placeOrder;
// Override the placeOrder function to save to localStorage properly
window.originalPlaceOrder = window.placeOrder || function() {};

function saveOrderToLocalStorage(orderData) {
    const existingOrders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
    const newOrderId = `ORD-${String(existingOrders.length + 1).padStart(3, '0')}`;
    
    const newOrder = {
        id: newOrderId,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items,
        total: orderData.total,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    existingOrders.unshift(newOrder);
    localStorage.setItem('bangFashionOrders', JSON.stringify(existingOrders));
    
    // Add activity log
    const activities = JSON.parse(localStorage.getItem('bangFashionActivities') || '[]');
    activities.unshift({
        message: `New order ${newOrderId} received from ${orderData.customerName}`,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('bangFashionActivities', JSON.stringify(activities.slice(0, 20)));
    
    return newOrderId;
}

// Replace the placeOrder function
window.placeOrder = function(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('full-name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const province = document.getElementById('province')?.value;
    
    if (!name || !email || !phone || !address || !city || !province) {
        showNotification('Please fill in all fields');
        return false;
    }
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    const orderData = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: `${address}, ${city}, ${province}`,
        items: cart.map(item => ({
            name: item.name,
            size: item.size,
            color: item.color,
            qty: item.qty,
            price: item.price
        })),
        total: total
    };
    
    const orderId = saveOrderToLocalStorage(orderData);
    
    const orderSummary = cart.map(item => 
        `${item.name} (${item.size}, ${item.color}) x${item.qty} = ZAR ${item.price * item.qty}`
    ).join('\n');
    
    alert(`✅ ORDER PLACED SUCCESSFULLY!\n\nOrder ID: ${orderId}\n\nThank you ${name}!\n\nOrder Details:\n${orderSummary}\n\nTotal: ZAR ${total}\n\nShipping to:\n${address}, ${city}, ${province}\n\nThe admin will process your order shortly.`);
    
    cart = [];
    updateCart();
    if (typeof closeCheckout === 'function') closeCheckout();
    if (typeof closeCart === 'function') closeCart();
    
    const form = document.getElementById('checkout-form');
    if (form) form.reset();
    
    showNotification(`Order ${orderId} placed successfully! 🎉`);
    
    return false;
};

// Re-attach form submit handler
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.onsubmit = window.placeOrder;
    }
});
// Dark Mode Toggle
function initDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    
    // Check for saved preference
    const savedMode = localStorage.getItem('bangDarkMode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('bangDarkMode', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            showNotification('Dark mode activated 🌙');
        } else {
            localStorage.setItem('bangDarkMode', 'light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            showNotification('Light mode activated ☀️');
        }
    });
}

// Call initDarkMode when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
