// Test data - run this in browser console to add sample orders
function addSampleOrders() {
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
        },
        {
            id: "ORD-003",
            customerName: "Thabo Nkosi",
            customerEmail: "thabo@example.com",
            customerPhone: "+27 555 123 456",
            date: new Date(Date.now() - 172800000).toISOString(),
            items: [
                { name: "Bang Danger T-shirt", size: "XL", color: "White", qty: 3, price: 500 }
            ],
            total: 1500,
            status: "shipped",
            shippingAddress: "789 Long St, Durban, KwaZulu-Natal"
        }
    ];
    
    localStorage.setItem('bangFashionOrders', JSON.stringify(sampleOrders));
    alert('Sample orders added! Refresh the page to see them.');
    location.reload();
}

// Run this in console: addSampleOrders()
