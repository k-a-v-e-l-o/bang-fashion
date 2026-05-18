// Load and display orders from localStorage
let currentOrderId = null;

// Sample initial orders if none exist
function initializeSampleOrders() {
    const existingOrders = localStorage.getItem('bangFashionOrders');
    if (!existingOrders || JSON.parse(existingOrders).length === 0) {
        const sampleOrders = [
            {
                id: "ORD-001",
                customerName: "John Doe",
                customerEmail: "john@example.com",
                customerPhone: "+27 123 456 789",
                date: new Date().toISOString(),
                items: [
                    { name: "Bang BB T-shirt", size: "L", color: "Black", qty: 2, price: 400 }
                ],
                total: 800,
                status: "pending",
                shippingAddress: "123 Main St, Johannesburg, Gauteng"
            },
            {
                id: "ORD-002",
                customerName: "Jane Smith",
                customerEmail: "jane@example.com",
                customerPhone: "+27 987 654 321",
                date: new Date(Date.now() - 86400000).toISOString(),
                items: [
                    { name: "Bang BB Dress", size: "M", color: "White", qty: 1, price: 500 },
                    { name: "Bang Root Hoodie", size: "L", color: "Black", qty: 1, price: 700 }
                ],
                total: 1200,
                status: "processing",
                shippingAddress: "456 Oak Ave, Cape Town, Western Cape"
            }
        ];
        localStorage.setItem('bangFashionOrders', JSON.stringify(sampleOrders));
    }
}

function loadAndDisplayOrders() {
    const orders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
    const statusFilter = document.getElementById('status-filter')?.value || 'all';
    const searchTerm = document.getElementById('search-order')?.value.toLowerCase() || '';
    
    console.log('Loading orders:', orders.length);
    console.log('Filter:', statusFilter, 'Search:', searchTerm);
    
    let filteredOrders = orders;
    
    if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
    }
    
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(o => 
            o.id.toLowerCase().includes(searchTerm) || 
            o.customerName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Update stats
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    
    const pendingEl = document.getElementById('pending-count');
    const processingEl = document.getElementById('processing-count');
    const shippedEl = document.getElementById('shipped-count');
    const deliveredEl = document.getElementById('delivered-count');
    const revenueEl = document.getElementById('total-revenue');
    const badgeEl = document.getElementById('pending-orders-badge');
    
    if (pendingEl) pendingEl.textContent = pending;
    if (processingEl) processingEl.textContent = processing;
    if (shippedEl) shippedEl.textContent = shipped;
    if (deliveredEl) deliveredEl.textContent = delivered;
    if (revenueEl) revenueEl.textContent = `ZAR ${totalRevenue}`;
    if (badgeEl) badgeEl.textContent = pending;
    
    // Display orders in table
    const tbody = document.getElementById('orders-list');
    if (!tbody) return;
    
    if (filteredOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No orders found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredOrders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName}<br><small>${order.customerEmail}</small></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.length} items</td>
            <td><strong>ZAR ${order.total}</strong></td>
            <td><span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

function viewOrder(orderId) {
    currentOrderId = orderId;
    const orders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const detailsHtml = `
        <div class="order-details-item">
            <strong>Order ID:</strong> ${order.id}
        </div>
        <div class="order-details-item">
            <strong>Customer:</strong> ${order.customerName}<br>
            <strong>Email:</strong> ${order.customerEmail}<br>
            <strong>Phone:</strong> ${order.customerPhone || 'N/A'}
        </div>
        <div class="order-details-item">
            <strong>Shipping Address:</strong><br>
            ${order.shippingAddress}
        </div>
        <div class="order-details-item">
            <strong>Order Date:</strong> ${new Date(order.date).toLocaleString()}
        </div>
        <div class="order-details-item">
            <strong>Items:</strong><br>
            ${order.items.map(item => `
                • ${item.name} - Size: ${item.size}, Color: ${item.color}, Qty: ${item.qty} - ZAR ${item.price * item.qty}<br>
            `).join('')}
        </div>
        <div class="order-details-item">
            <strong>Total Amount:</strong> ZAR ${order.total}
        </div>
        <div class="order-details-item">
            <strong>Current Status:</strong> 
            <span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span>
        </div>
    `;
    
    const detailsDiv = document.getElementById('order-details');
    const statusSelect = document.getElementById('update-status');
    
    if (detailsDiv) detailsDiv.innerHTML = detailsHtml;
    if (statusSelect) statusSelect.value = order.status;
    
    const modal = document.getElementById('order-modal');
    if (modal) modal.style.display = 'block';
}

function updateOrderStatus() {
    const newStatus = document.getElementById('update-status').value;
    const orders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === currentOrderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        orders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('bangFashionOrders', JSON.stringify(orders));
        
        // Add to activity log
        const activities = JSON.parse(localStorage.getItem('bangFashionActivities') || '[]');
        activities.unshift({
            message: `Order ${currentOrderId} status changed to ${newStatus.toUpperCase()}`,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('bangFashionActivities', JSON.stringify(activities.slice(0, 20)));
        
        // Refresh the display
        loadAndDisplayOrders();
        loadAnalytics();
        
        alert(`✅ Order ${currentOrderId} status updated to ${newStatus.toUpperCase()}`);
        
        const modal = document.getElementById('order-modal');
        if (modal) modal.style.display = 'none';
    }
}

function loadCustomers() {
    const users = JSON.parse(localStorage.getItem('bangFashionUsers') || '[]');
    const container = document.getElementById('customers-list');
    
    if (!container) return;
    
    if (users.length === 0) {
        container.innerHTML = '<p>No registered customers yet. Customers need to create an account.</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Registered On</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone || 'N/A'}</td>
                        <td>${new Date(user.registeredAt || Date.now()).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadAnalytics() {
    const orders = JSON.parse(localStorage.getItem('bangFashionOrders') || '[]');
    const users = JSON.parse(localStorage.getItem('bangFashionUsers') || '[]');
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const activities = JSON.parse(localStorage.getItem('bangFashionActivities') || '[]');
    
    const totalOrdersEl = document.getElementById('total-orders');
    const totalCustomersEl = document.getElementById('total-customers');
    const analyticsRevenueEl = document.getElementById('analytics-revenue');
    const activityContainer = document.getElementById('recent-activity-list');
    
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (totalCustomersEl) totalCustomersEl.textContent = users.length;
    if (analyticsRevenueEl) analyticsRevenueEl.textContent = `ZAR ${totalRevenue}`;
    
    if (activityContainer) {
        if (activities.length === 0) {
            activityContainer.innerHTML = '<p>No recent activity</p>';
        } else {
            activityContainer.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <i class="fas fa-bell"></i>
                    <span>${activity.message}</span>
                    <small>${new Date(activity.timestamp).toLocaleString()}</small>
                </div>
            `).join('');
        }
    }
}

function refreshAll() {
    console.log('Refreshing all data...');
    loadAndDisplayOrders();
    loadCustomers();
    loadAnalytics();
    showNotification('Dashboard refreshed!');
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3e2723;
        color: #d4b895;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: fadeInOut 2s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.page-content').forEach(content => content.classList.remove('active'));
            const pageElement = document.getElementById(`${page}-page`);
            if (pageElement) pageElement.classList.add('active');
            
            const titles = {
                orders: { title: 'Orders Management', subtitle: 'Manage and track customer orders' },
                customers: { title: 'Customer Management', subtitle: 'View registered customers' },
                analytics: { title: 'Analytics', subtitle: 'Store performance and insights' }
            };
            
            const titleEl = document.getElementById('page-title');
            const subtitleEl = document.getElementById('page-subtitle');
            
            if (titleEl) titleEl.textContent = titles[page].title;
            if (subtitleEl) subtitleEl.textContent = titles[page].subtitle;
            
            if (page === 'customers') loadCustomers();
            if (page === 'analytics') loadAnalytics();
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin panel initializing...');
    
    // Initialize sample data if needed
    initializeSampleOrders();
    
    // Load all data
    loadAndDisplayOrders();
    loadCustomers();
    loadAnalytics();
    initNavigation();
    
    // Set up event listeners
    const statusFilter = document.getElementById('status-filter');
    const searchOrder = document.getElementById('search-order');
    const refreshBtn = document.getElementById('refresh-orders');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            console.log('Filter changed:', statusFilter.value);
            loadAndDisplayOrders();
        });
    }
    
    if (searchOrder) {
        searchOrder.addEventListener('input', () => {
            console.log('Search:', searchOrder.value);
            loadAndDisplayOrders();
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            console.log('Refresh button clicked');
            refreshAll();
        });
    }
    
    // Modal close
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-modal');
    const updateBtn = document.getElementById('update-order-btn');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }
    
    if (updateBtn) {
        updateBtn.onclick = updateOrderStatus;
    }
    
    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target === modal) {
            if (modal) modal.style.display = 'none';
        }
    };
    
    console.log('Admin panel ready');
});

// Make functions global for onclick handlers
window.viewOrder = viewOrder;
window.updateOrderStatus = updateOrderStatus;
window.refreshAll = refreshAll;
