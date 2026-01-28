/* =======================
   GLOBAL STATE
======================= */
let activityCount = 0;
let aiActionsCount = 89;
let activeCustomers = 1247;
let ruleStates = {1: true, 2: true, 3: true};
let notifications = [];
let notificationCount = 5;

// NEW: Email Campaign State
let emailCampaigns = [];
let emailTemplates = {
    discount: {
        name: '🎁 Discount Offer',
        subject: 'Special Discount Just For You!',
        preview: `<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #764ba2;">Exclusive Discount Inside!</h2>
            <p>We noticed you've been browsing our store. Here's a special <strong>15% discount</strong> just for you!</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #764ba2; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">Shop Now</a>
        </div>`
    },
    'abandoned-cart': {
        name: '🛒 Abandoned Cart',
        subject: 'You left something behind...',
        preview: `<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #764ba2;">Your cart is waiting!</h2>
            <p>Don't miss out on the items you selected. Complete your purchase and get <strong>FREE SHIPPING</strong>!</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #764ba2; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">Complete Purchase</a>
        </div>`
    },
    welcome: {
        name: '👋 Welcome Email',
        subject: 'Welcome to Our Store!',
        preview: `<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #764ba2;">Welcome Aboard! 🎉</h2>
            <p>We're thrilled to have you! Get started with a <strong>10% discount</strong> on your first purchase.</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #764ba2; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">Start Shopping</a>
        </div>`
    },
    winback: {
        name: '💌 Win-Back Campaign',
        subject: 'We Miss You! Come Back for 20% OFF',
        preview: `<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #764ba2;">We Miss You! 💙</h2>
            <p>It's been a while! Here's <strong>20% OFF</strong> to welcome you back.</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #764ba2; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">Come Back</a>
        </div>`
    },
    'product-launch': {
        name: '🚀 Product Launch',
        subject: 'NEW: Product You\'ll Love!',
        preview: `<div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #764ba2;">🚀 New Product Alert!</h2>
            <p>Be the first to get our brand new product with <strong>early bird pricing</strong>!</p>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #764ba2; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">Shop New Arrivals</a>
        </div>`
    }
};

// NEW: Integration State
let integrations = [
    {
        id: 1,
        platform: 'shopify',
        name: 'Shopify Store',
        status: 'connected',
        lastSync: '2 min ago',
        icon: '🛍️'
    },
    {
        id: 2,
        platform: 'mailchimp',
        name: 'Mailchimp',
        status: 'connected',
        lastSync: '15 min ago',
        icon: '📧'
    }
];

let syncLogs = [];

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
   SECTION NAVIGATION
======================= */
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load section-specific data
    if (sectionName === 'email-campaigns') {
        loadEmailCampaigns();
        loadEmailTemplates();
    } else if (sectionName === 'integrations') {
        loadIntegrations();
        loadSyncLogs();
    }
}

/* =======================
   EMAIL CAMPAIGN MANAGER
======================= */
function openEmailBuilder() {
    document.getElementById('emailBuilderModal').classList.add('show');
}

function previewTemplate() {
    const templateType = document.getElementById('emailTemplate').value;
    const previewDiv = document.getElementById('emailPreview');
    
    if (templateType && emailTemplates[templateType]) {
        previewDiv.innerHTML = emailTemplates[templateType].preview;
        document.getElementById('emailSubject').value = emailTemplates[templateType].subject;
    } else {
        previewDiv.innerHTML = '<p style="color: #999;">Select a template to preview</p>';
    }
}

function createEmailCampaign(event) {
    event.preventDefault();
    
    const campaignName = document.getElementById('campaignName').value;
    const template = document.getElementById('emailTemplate').value;
    const subject = document.getElementById('emailSubject').value;
    const audience = document.getElementById('targetAudience').value;
    
    const newCampaign = {
        id: Date.now(),
        name: campaignName,
        template: emailTemplates[template].name,
        subject: subject,
        audience: audience,
        status: 'active',
        sent: 0,
        opened: 0,
        clicked: 0,
        revenue: 0,
        createdAt: new Date().toLocaleString()
    };
    
    emailCampaigns.unshift(newCampaign);
    
    addNotification({
        icon: '📧',
        title: 'Campaign Created!',
        text: `"${campaignName}" is now live and sending emails`
    });
    
    closeModal('emailBuilderModal');
    loadEmailCampaigns();
    
    // Simulate campaign activity
    setTimeout(() => {
        simulateCampaignActivity(newCampaign.id);
    }, 3000);
    
    event.target.reset();
}

function simulateCampaignActivity(campaignId) {
    const campaign = emailCampaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    campaign.sent = Math.floor(Math.random() * 500) + 100;
    campaign.opened = Math.floor(campaign.sent * (Math.random() * 0.3 + 0.2));
    campaign.clicked = Math.floor(campaign.opened * (Math.random() * 0.3 + 0.1));
    campaign.revenue = campaign.clicked * (Math.random() * 50 + 20);
    
    loadEmailCampaigns();
    updateEmailStats();
}

function loadEmailCampaigns() {
    const container = document.getElementById('campaignsContainer');
    
    if (emailCampaigns.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 3em; margin-bottom: 10px;">📭</div>
                <h3>No campaigns yet</h3>
                <p>Create your first email campaign to start engaging customers</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = emailCampaigns.map(campaign => `
        <div class="campaign-card">
            <div class="campaign-header">
                <div>
                    <h3>${campaign.name}</h3>
                    <p class="campaign-meta">${campaign.template} • ${campaign.audience}</p>
                </div>
                <span class="campaign-status ${campaign.status}">${campaign.status.toUpperCase()}</span>
            </div>
            <div class="campaign-stats">
                <div class="stat-item">
                    <div class="stat-label">Sent</div>
                    <div class="stat-number">${campaign.sent.toLocaleString()}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Opened</div>
                    <div class="stat-number">${campaign.opened.toLocaleString()}</div>
                    <div class="stat-percent">${campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Clicked</div>
                    <div class="stat-number">${campaign.clicked.toLocaleString()}</div>
                    <div class="stat-percent">${campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Revenue</div>
                    <div class="stat-number">$${campaign.revenue.toFixed(0)}</div>
                </div>
            </div>
            <div class="campaign-actions">
                <button class="btn-small btn-primary" onclick="viewCampaignDetails(${campaign.id})">📊 View Details</button>
                <button class="btn-small btn-danger" onclick="pauseCampaign(${campaign.id})">${campaign.status === 'active' ? '⏸️ Pause' : '▶️ Resume'}</button>
            </div>
        </div>
    `).join('');
}

function loadEmailTemplates() {
    const grid = document.getElementById('templatesGrid');
    
    grid.innerHTML = Object.entries(emailTemplates).map(([key, template]) => `
        <div class="template-card" onclick="selectTemplate('${key}')">
            <div class="template-icon">${template.name.split(' ')[0]}</div>
            <h4>${template.name}</h4>
            <p>${template.subject}</p>
            <button class="btn-small btn-success">Use Template</button>
        </div>
    `).join('');
}

function selectTemplate(templateKey) {
    openEmailBuilder();
    setTimeout(() => {
        document.getElementById('emailTemplate').value = templateKey;
        previewTemplate();
    }, 100);
}

function updateEmailStats() {
    const totalSent = emailCampaigns.reduce((sum, c) => sum + c.sent, 0);
    const totalOpened = emailCampaigns.reduce((sum, c) => sum + c.opened, 0);
    const totalClicked = emailCampaigns.reduce((sum, c) => sum + c.clicked, 0);
    const totalRevenue = emailCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    
    document.getElementById('emailsSent').textContent = totalSent.toLocaleString();
    document.getElementById('openRate').textContent = totalSent > 0 ? `${((totalOpened / totalSent) * 100).toFixed(1)}%` : '0%';
    document.getElementById('clickRate').textContent = totalOpened > 0 ? `${((totalClicked / totalOpened) * 100).toFixed(1)}%` : '0%';
    document.getElementById('emailRevenue').textContent = `$${totalRevenue.toFixed(0).toLocaleString()}`;
}

function pauseCampaign(campaignId) {
    const campaign = emailCampaigns.find(c => c.id === campaignId);
    if (campaign) {
        campaign.status = campaign.status === 'active' ? 'paused' : 'active';
        loadEmailCampaigns();
        
        addNotification({
            icon: campaign.status === 'active' ? '▶️' : '⏸️',
            title: `Campaign ${campaign.status === 'active' ? 'Resumed' : 'Paused'}`,
            text: `"${campaign.name}" is now ${campaign.status}`
        });
    }
}

function viewCampaignDetails(campaignId) {
    const campaign = emailCampaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    alert(`Campaign Details:\n\nName: ${campaign.name}\nTemplate: ${campaign.template}\nAudience: ${campaign.audience}\nStatus: ${campaign.status}\n\nSent: ${campaign.sent}\nOpened: ${campaign.opened} (${((campaign.opened / campaign.sent) * 100).toFixed(1)}%)\nClicked: ${campaign.clicked} (${((campaign.clicked / campaign.opened) * 100).toFixed(1)}%)\nRevenue: $${campaign.revenue.toFixed(2)}`);
}

/* =======================
   INTEGRATION HUB
======================= */
function openIntegrationSetup() {
    document.getElementById('integrationModal').classList.add('show');
}

function updateIntegrationFields() {
    const platform = document.getElementById('integrationPlatform').value;
    const urlField = document.getElementById('integrationUrl');
    
    if (platform === 'shopify' || platform === 'woocommerce') {
        urlField.parentElement.style.display = 'block';
        urlField.required = true;
    } else {
        urlField.parentElement.style.display = 'none';
        urlField.required = false;
    }
}

function addIntegration(event) {
    event.preventDefault();
    
    const platform = document.getElementById('integrationPlatform').value;
    const key = document.getElementById('integrationKey').value;
    const url = document.getElementById('integrationUrl').value;
    
    const platformNames = {
        shopify: 'Shopify Store',
        woocommerce: 'WooCommerce',
        mailchimp: 'Mailchimp',
        sendgrid: 'SendGrid',
        stripe: 'Stripe',
        paypal: 'PayPal'
    };
    
    const platformIcons = {
        shopify: '🛍️',
        woocommerce: '🛒',
        mailchimp: '📧',
        sendgrid: '✉️',
        stripe: '💳',
        paypal: '💰'
    };
    
    const newIntegration = {
        id: Date.now(),
        platform: platform,
        name: platformNames[platform],
        icon: platformIcons[platform],
        status: 'connected',
        lastSync: 'Just now',
        url: url || null
    };
    
    integrations.push(newIntegration);
    
    addSyncLog({
        integration: platformNames[platform],
        action: 'Connected',
        status: 'success',
        time: 'Just now'
    });
    
    addNotification({
        icon: platformIcons[platform],
        title: 'Integration Connected!',
        text: `${platformNames[platform]} is now syncing with SEIP`
    });
    
    closeModal('integrationModal');
    loadIntegrations();
    
    event.target.reset();
}

function loadIntegrations() {
    const grid = document.getElementById('integrationsGrid');
    
    grid.innerHTML = integrations.map(integration => `
        <div class="integration-card ${integration.status}">
            <div class="integration-header">
                <div class="integration-icon-large">${integration.icon}</div>
                <span class="integration-status">
                    <span class="status-dot ${integration.status}"></span>
                    ${integration.status.toUpperCase()}
                </span>
            </div>
            <h3>${integration.name}</h3>
            <p class="integration-meta">Last sync: ${integration.lastSync}</p>
            <div class="integration-actions">
                <button class="btn-small btn-primary" onclick="syncIntegration(${integration.id})">🔄 Sync Now</button>
                <button class="btn-small btn-danger" onclick="removeIntegration(${integration.id})">❌ Remove</button>
            </div>
        </div>
    `).join('');
}

function syncIntegration(integrationId) {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;
    
    integration.lastSync = 'Syncing...';
    loadIntegrations();
    
    setTimeout(() => {
        integration.lastSync = 'Just now';
        loadIntegrations();
        
        addSyncLog({
            integration: integration.name,
            action: 'Data Synced',
            status: 'success',
            time: 'Just now'
        });
        
        addNotification({
            icon: '✅',
            title: 'Sync Complete',
            text: `${integration.name} data successfully synced`
        });
    }, 2000);
}

function removeIntegration(integrationId) {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;
    
    if (confirm(`Are you sure you want to remove ${integration.name}?`)) {
        integrations = integrations.filter(i => i.id !== integrationId);
        
        addSyncLog({
            integration: integration.name,
            action: 'Disconnected',
            status: 'warning',
            time: 'Just now'
        });
        
        loadIntegrations();
    }
}

function loadSyncLogs() {
    const container = document.getElementById('syncLogs');
    
    if (syncLogs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 2em; margin-bottom: 10px;">📋</div>
                <p>No sync activity yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = syncLogs.slice(0, 10).map(log => `
        <div class="log-item">
            <span class="log-status ${log.status}"></span>
            <div class="log-content">
                <strong>${log.integration}</strong> • ${log.action}
            </div>
            <div class="log-time">${log.time}</div>
        </div>
    `).join('');
}

function addSyncLog(log) {
    syncLogs.unshift(log);
    if (syncLogs.length > 50) {
        syncLogs = syncLogs.slice(0, 50);
    }
    loadSyncLogs();
}

/* =======================
   NOTIFICATIONS
======================= */
function toggleNotifications(event) {
    event.stopPropagation();
    document.getElementById('notificationDropdown').classList.toggle('show');
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    
    if (notifications.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No notifications</p></div>';
        document.getElementById('notificationCount').textContent = '0';
        return;
    }
    
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
    if (notifications.length > 20) {
        notifications = notifications.slice(0, 20);
    }
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
        <div class="rule-toggle active" onclick="toggleRule(${newRuleId}, event)"></div>
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
    
    closeModal('ruleModal');
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

/* =======================
   INITIALIZATION
======================= */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with some sample data
    updateEmailStats();
    loadIntegrations();
    
    // Add some initial sync logs
    addSyncLog({
        integration: 'Shopify Store',
        action: 'Products Synced',
        status: 'success',
        time: '5 min ago'
    });
    
    addSyncLog({
        integration: 'Mailchimp',
        action: 'Contacts Updated',
        status: 'success',
        time: '15 min ago'
    });
});