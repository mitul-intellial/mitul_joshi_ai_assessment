// Data
const rootCausesData = [
    { 
        cause: 'Incomplete Customer Data', 
        count: 156, 
        percent: 18, 
        trend: 12, 
        cost: 8.20,
        subcategories: [
            { name: 'Missing Phone', count: 78, percent: 50 },
            { name: 'Missing Email', count: 45, percent: 29 },
            { name: 'Invalid Address', count: 33, percent: 21 }
        ],
        channels: [
            { name: 'WhatsApp', count: 89, percent: 57 },
            { name: 'Website', count: 42, percent: 27 },
            { name: 'Amazon', count: 25, percent: 16 }
        ]
    },
    { 
        cause: 'SKU Not in System', 
        count: 142, 
        percent: 16, 
        trend: -5, 
        cost: 15.30,
        subcategories: [
            { name: 'New SKU not synced', count: 65, percent: 46 },
            { name: 'Discontinued SKU ordered', count: 48, percent: 34 },
            { name: 'SKU mismatch', count: 29, percent: 20 }
        ],
        channels: [
            { name: 'Amazon', count: 78, percent: 55 },
            { name: 'Website', count: 42, percent: 30 },
            { name: 'WhatsApp', count: 22, percent: 15 }
        ]
    },
    { 
        cause: 'Warehouse Stock Mismatch', 
        count: 128, 
        percent: 15, 
        trend: 8, 
        cost: 22.10,
        subcategories: [
            { name: 'Physical count mismatch', count: 62, percent: 48 },
            { name: 'Location error', count: 41, percent: 32 },
            { name: 'Reserved but not available', count: 25, percent: 20 }
        ],
        channels: [
            { name: 'Website', count: 58, percent: 45 },
            { name: 'Amazon', count: 45, percent: 35 },
            { name: 'WhatsApp', count: 25, percent: 20 }
        ]
    },
    { 
        cause: 'Pricing Discrepancy', 
        count: 98, 
        percent: 11, 
        trend: 0, 
        cost: 6.50,
        subcategories: [
            { name: 'Channel price mismatch', count: 45, percent: 46 },
            { name: 'Promo code error', count: 32, percent: 33 },
            { name: 'Currency conversion issue', count: 21, percent: 21 }
        ],
        channels: [
            { name: 'Amazon', count: 52, percent: 53 },
            { name: 'Website', count: 31, percent: 32 },
            { name: 'WhatsApp', count: 15, percent: 15 }
        ]
    },
    { 
        cause: 'Address Validation Failed', 
        count: 87, 
        percent: 10, 
        trend: -3, 
        cost: 4.20,
        subcategories: [
            { name: 'Incomplete address', count: 48, percent: 55 },
            { name: 'Invalid pincode', count: 25, percent: 29 },
            { name: 'Special characters', count: 14, percent: 16 }
        ],
        channels: [
            { name: 'WhatsApp', count: 45, percent: 52 },
            { name: 'Website', count: 28, percent: 32 },
            { name: 'Amazon', count: 14, percent: 16 }
        ]
    }
];

// Chart data
const volumeChartData = {
    labels: ['Missing Info', 'SKU Issues', 'Stock Mismatch', 'Pricing', 'Address'],
    datasets: [{
        label: 'Exception Count',
        data: [156, 142, 128, 98, 87],
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1
    }]
};

const trendChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Exceptions',
        data: [45, 52, 38, 61, 55, 48, 42],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
    }]
};

// Global variables
let selectedRowIndex = null;
let volumeChart = null;
let trendChart = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    populateRootCauseTable();
    initializeCharts();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically switch content panels
            console.log('Switched to tab:', this.dataset.tab);
        });
    });
}

// Populate root cause table
function populateRootCauseTable() {
    const tbody = document.getElementById('rootCauseTable');
    tbody.innerHTML = '';
    
    rootCausesData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index;
        
        // Determine trend icon and class
        let trendIcon, trendClass, trendText;
        if (item.trend > 0) {
            trendIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
            </svg>`;
            trendClass = 'up';
            trendText = `+${item.trend}%`;
        } else if (item.trend < 0) {
            trendIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>`;
            trendClass = 'down';
            trendText = `${item.trend}%`;
        } else {
            trendIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
            </svg>`;
            trendClass = 'neutral';
            trendText = '0%';
        }
        
        row.innerHTML = `
            <td>${item.cause}</td>
            <td><strong>${item.count}</strong></td>
            <td>${item.percent}%</td>
            <td>
                <div class="trend-indicator ${trendClass}">
                    ${trendIcon}
                    <span>${trendText}</span>
                </div>
            </td>
            <td><strong>$${item.cost.toFixed(2)}</strong></td>
            <td>
                <button class="btn-analyze" onclick="event.stopPropagation()">Analyze</button>
            </td>
        `;
        
        row.addEventListener('click', function() {
            selectRow(index);
        });
        
        tbody.appendChild(row);
    });
}

// Select row and show drilldown
function selectRow(index) {
    // Remove previous selection
    const allRows = document.querySelectorAll('#rootCauseTable tr');
    allRows.forEach(row => row.classList.remove('selected'));
    
    // Add selection to clicked row
    const selectedRow = document.querySelector(`#rootCauseTable tr[data-index="${index}"]`);
    selectedRow.classList.add('selected');
    
    // Update selected index
    selectedRowIndex = index;
    
    // Show drilldown panel
    showDrilldown(rootCausesData[index]);
}

// Show drilldown details
function showDrilldown(data) {
    const panel = document.getElementById('drilldownPanel');
    const title = document.getElementById('drilldownTitle');
    const subcategoriesList = document.getElementById('subcategoriesList');
    const channelsList = document.getElementById('channelsList');
    
    // Set title
    title.textContent = `Selected: ${data.cause} (${data.count} occurrences)`;
    
    // Populate subcategories
    subcategoriesList.innerHTML = '';
    data.subcategories.forEach(sub => {
        const li = document.createElement('li');
        li.textContent = `• ${sub.name}: ${sub.count} (${sub.percent}%)`;
        subcategoriesList.appendChild(li);
    });
    
    // Populate channels
    channelsList.innerHTML = '';
    data.channels.forEach(channel => {
        const li = document.createElement('li');
        li.textContent = `• ${channel.name}: ${channel.count} (${channel.percent}%)`;
        channelsList.appendChild(li);
    });
    
    // Show panel
    panel.style.display = 'block';
}

// Initialize charts
function initializeCharts() {
    // Volume Chart
    const volumeCtx = document.getElementById('volumeChart').getContext('2d');
    volumeChart = new Chart(volumeCtx, {
        type: 'bar',
        data: volumeChartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
    
    // Trend Chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: trendChartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Date range change handler
document.getElementById('dateRange')?.addEventListener('change', function(e) {
    console.log('Date range changed to:', e.target.value);
    // Here you would typically reload data based on new date range
});

// Export functionality
document.querySelector('.btn-primary')?.addEventListener('click', function() {
    console.log('Exporting data...');
    alert('Export functionality would download CSV/PDF report');
});

// Filter functionality
document.querySelector('.btn-secondary')?.addEventListener('click', function() {
    console.log('Opening filters...');
    alert('Filter panel would open here');
});

// Investigate buttons
document.querySelectorAll('.btn-investigate').forEach(button => {
    button.addEventListener('click', function() {
        const pattern = this.previousElementSibling.textContent;
        console.log('Investigating pattern:', pattern);
        alert('Investigation panel would open for: ' + pattern.substring(0, 50) + '...');
    });
});