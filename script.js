
/* =======================
   GLOBAL STATE
======================= */
let activityCount = 0;
let aiActionsCount = 89;
let activeCustomers = 1247;
let ruleStates = {1: true, 2: true, 3: true};
let notifications = [];
let notificationCount = 5;

/* =======================
   MOCK ANALYTICS DATA
======================= */
const ruleAnalytics = {
    1: {
        name: 'Product View Discount Rule',
        triggered: 156,
        conversions: 100,
        conversionRate: 64,
        revenue: 12500,
        roi: 320,
        bestTime: '7–9 PM',
        bestDay: 'Friday',
        dailyData: [
            { day: 'Mon', triggers: 20 },
            { day: 'Tue', triggers: 25 },
            { day: 'Wed', triggers: 30 },
            { day: 'Thu', triggers: 28 },
            { day: 'Fri', triggers: 35 },
            { day: 'Sat', triggers: 18 },
            { day: 'Sun', triggers: 10 }
        ]
    },
    2: {
        name: 'Cart Abandonment Rule',
        triggered: 98,
        conversions: 51,
        conversionRate: 52,
        revenue: 8200,
        roi: 280,
        bestTime: '8–10 PM',
        bestDay: 'Saturday',
        dailyData: [
            { day: 'Mon', triggers: 12 },
            { day: 'Tue', triggers: 14 },
            { day: 'Wed', triggers: 16 },
            { day: 'Thu', triggers: 15 },
            { day: 'Fri', triggers: 20 },
            { day: 'Sat', triggers: 14 },
            { day: 'Sun', triggers: 7 }
        ]
    },
    3: {
        name: 'Customer Reactivation Rule',
        triggered: 43,
        conversions: 16,
        conversionRate: 38,
        revenue: 4100,
        roi: 210,
        bestTime: '6–8 PM',
        bestDay: 'Sunday',
        dailyData: [
            { day: 'Mon', triggers: 5 },
            { day: 'Tue', triggers: 6 },
            { day: 'Wed', triggers: 7 },
            { day: 'Thu', triggers: 6 },
            { day: 'Fri', triggers: 8 },
            { day: 'Sat', triggers: 7 },
            { day: 'Sun', triggers: 4 }
        ]
    }
};

/* =======================
   CUSTOMER BEHAVIORS
======================= */
 const customerBehaviors = [
            {
                icon: '👁️',
                title: 'High Intent Detected',
                description: 'viewed "Wireless Headphones Pro" 3 times in 10 minutes',
                action: '✉️ 10% DISCOUNT SENT'
            },
            {
                icon: '🛒',
                title: 'Cart Abandonment Risk',
                description: 'added $250 to cart, inactive for 15 minutes',
                action: '⏰ REMINDER SCHEDULED'
            },
            {
                icon: '🎯',
                title: 'Purchase Pattern Match',
                description: 'behavior matches high-value segment (85% confidence)',
                action: '🎁 VIP OFFER TRIGGERED'
            },
            {
                icon: '⚠️',
                title: 'Churn Risk Identified',
                description: "hasn't visited in 30 days (prev. 2x/week shopper)",
                action: '💌 RE-ENGAGEMENT EMAIL'
            },
            {
                icon: '🔥',
                title: 'Hot Product Alert',
                description: 'viewed trending item "Smart Watch X" after 5 similar searches',
                action: '🚀 LIMITED OFFER SENT'
            },
            {
                icon: '💎',
                title: 'Premium Customer Detected',
                description: 'lifetime value $2,500+, browsing luxury category',
                action: '👑 EXCLUSIVE ACCESS GRANTED'
            },
            {
                icon: '📱',
                title: 'Mobile Checkout Issue',
                description: 'attempted checkout 2x, payment form errors detected',
                action: '🆘 SUPPORT CHAT INITIATED'
            },
            {
                icon: '🎁',
                title: 'Birthday Detected',
                description: 'customer birthday in 3 days, loyal for 2 years',
                action: '🎂 BIRTHDAY GIFT SENT'
            }
        ];


/* =======================
   NOTIFICATIONS
======================= */
function toggleNotifications(event) {
    event.stopPropagation();
    document.getElementById('notificationDropdown').classList.toggle('show');
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = '';

    notifications.forEach(n => {
        const item = document.createElement('div');
        item.className = 'notification-item unread';
        item.innerHTML = `
            <div style="display:flex;">
                <div class="notification-icon">${n.icon}</div>
                <div class="notification-content">
                    <div class="notification-title">${n.title}</div>
                    <div class="notification-text">${n.text}</div>
                    <div class="notification-time">Just now</div>
                </div>
            </div>
        `;
        list.appendChild(item);
    });

    document.getElementById('notificationCount').textContent = notifications.length;
}

function addNotification(notification) {
    notifications.unshift(notification);
    renderNotifications();
}

function clearAllNotifications() {
    notifications = [];
    renderNotifications();
}

/* =======================
   SIMULATION
======================= */
function simulateCustomerBehavior() {
    const behavior = customerBehaviors[Math.floor(Math.random() * customerBehaviors.length)];
    const customerId = Math.floor(Math.random() * 9000) + 1000;

    const feed = document.getElementById('activityFeed');
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
        <div class="activity-icon">${behavior.icon}</div>
        <div class="activity-content">
            <div class="activity-title">${behavior.title}</div>
            <div class="activity-description">Customer #${customerId} ${behavior.description}</div>
            <div class="activity-time">Just now</div>
        </div>
        <div class="activity-action">${behavior.action}</div>
    `;
    feed.prepend(item);

    aiActionsCount++;
    document.getElementById('aiActions').textContent = aiActionsCount;

    activeCustomers += Math.floor(Math.random() * 6) - 2;
    document.getElementById('activeCustomers').textContent = activeCustomers.toLocaleString();

    if (behavior.notification) addNotification(behavior.notification);

       // ===== FIX: Add a notification for every behavior =====
    addNotification({
        icon: behavior.icon,
        title: behavior.title,
        text: `Customer #${customerId} ${behavior.description}`
    });
}
  function createRule(event) {
            event.preventDefault();
            
            const triggerType = document.getElementById('triggerType').value;
            const threshold = document.getElementById('threshold').value;
            const actionType = document.getElementById('actionType').value;
            
            const triggerIcons = {
                views: '👁️',
                cart: '🛒',
                time: '⏱️',
                inactivity: '📅'
            };
            
            const actionTexts = {
                discount: 'Send discount code',
                email: 'Send reminder email',
                offer: 'Send special offer',
                notification: 'Send push notification'
            };
            
            const rulesContainer = document.getElementById('rulesContainer');
            const newRuleId = Date.now();
            const newRule = document.createElement('div');
            newRule.className = 'rule-item';
            newRule.setAttribute('data-rule-id', newRuleId);
            newRule.innerHTML = `
                <div class="rule-toggle active" onclick="toggleRule(${newRuleId})"></div>
                <div class="rule-trigger">${triggerIcons[triggerType]} TRIGGER: ${triggerType.charAt(0).toUpperCase() + triggerType.slice(1)} - ${threshold}</div>
                <div class="rule-arrow">↓</div>
                <div class="rule-action">ACTION: ${actionTexts[actionType]}</div>
                <div class="rule-stats">
                    <div class="stat"><span class="pulse"></span> <span class="status-active">ACTIVE</span></div>
                    <div class="stat">📊 Triggered <span class="rule-count">0</span> times today</div>
                    <div class="stat">✅ 0% conversion rate</div>
                </div>
            `;
            
            rulesContainer.appendChild(newRule);
            ruleStates[newRuleId] = true;
            
            closeModal();
            event.target.reset();
        }

/* =======================
   RULE TOGGLE
======================= */
function toggleRule(ruleId, event) {
    event.stopPropagation();
    ruleStates[ruleId] = !ruleStates[ruleId];
    const rule = document.querySelector(`[data-rule-id="${ruleId}"]`);
    const toggle = rule.querySelector('.rule-toggle');
    const status = rule.querySelector('.status-active, .status-inactive');
    const pulse = rule.querySelector('.pulse');

    if (ruleStates[ruleId]) {
        toggle.classList.add('active');
        status.textContent = 'ACTIVE';
        status.className = 'status-active';
        pulse.style.display = 'inline-block';
    } else {
        toggle.classList.remove('active');
        status.textContent = 'INACTIVE';
        status.className = 'status-inactive';
        pulse.style.display = 'none';
    }
}

/* =======================
   MODALS
======================= */
function openRuleBuilder() {
    document.getElementById('ruleModal').classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

/* =======================
   ANALYTICS
======================= */
function openAnalytics(ruleId, event) {
    event.stopPropagation();
    const analytics = ruleAnalytics[ruleId];
    if (!analytics) return alert('No analytics available');

    document.getElementById('analyticsTitle').textContent =
        `Performance Analytics - ${analytics.name}`;

    document.getElementById('analyticsContent').innerHTML = `
        <div class="analytics-grid">
            <div class="analytics-card"><div class="analytics-label">Triggered</div><div class="analytics-value">${analytics.triggered}</div></div>
            <div class="analytics-card"><div class="analytics-label">Conversions</div><div class="analytics-value">${analytics.conversions}</div></div>
            <div class="analytics-card"><div class="analytics-label">Conversion Rate</div><div class="analytics-value">${analytics.conversionRate}%</div></div>
            <div class="analytics-card"><div class="analytics-label">Revenue</div><div class="analytics-value">$${analytics.revenue.toLocaleString()}</div></div>
            <div class="analytics-card"><div class="analytics-label">ROI</div><div class="analytics-value">${analytics.roi}%</div></div>
            <div class="analytics-card"><div class="analytics-label">Best Time</div><div class="analytics-value">${analytics.bestTime}</div></div>
        </div>
    `;

    document.getElementById('analyticsModal').classList.add('show');
}

   // Auto-simulate customer behavior every 8 seconds
        setInterval(() => {
            if (Math.random() > 0.3) {
                simulateCustomerBehavior();
            }
        }, 8000);


/* =======================
   CLEAR FEED
======================= */
function clearActivities() {
    document.getElementById('activityFeed').innerHTML =
        `<div class="activity-item">
            <div class="activity-icon">✨</div>
            <div class="activity-content">
                <div class="activity-title">Feed Cleared</div>
                <div class="activity-description">Ready for new activity</div>
            </div>
        </div>`;
}

