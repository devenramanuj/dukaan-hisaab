// ===== Sidebar Navigation =====
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
const iframe = document.getElementById('frame');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        iframe.src = this.getAttribute('href');
    });
});

// ===== Customers Page =====
function addCustomer(name, phone, address) {
    let customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const id = Date.now();
    customers.push({id, name, phone, address, balance: 0});
    localStorage.setItem('customers', JSON.stringify(customers));
    return id;
}

function getCustomers() {
    return JSON.parse(localStorage.getItem('customers') || '[]');
}

function deleteCustomer(id) {
    let customers = getCustomers();
    customers = customers.filter(c => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(customers));
}

// ===== Billing Page =====
function saveInvoice(invoice) {
    let invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Update customer balance
    if(invoice.customerId) {
        let customers = getCustomers();
        let customer = customers.find(c => c.id === invoice.customerId);
        if(customer){
            customer.balance += invoice.total;
            localStorage.setItem('customers', JSON.stringify(customers));
        }
    }
}

// ===== Ledger Page =====
function addLedgerEntry(entry) {
    let ledger = JSON.parse(localStorage.getItem('ledger') || '[]');
    ledger.push(entry);
    localStorage.setItem('ledger', JSON.stringify(ledger));
}

function getLedger() {
    return JSON.parse(localStorage.getItem('ledger') || '[]');
}
