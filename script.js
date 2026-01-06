  let activityCount = 0;
        let aiActionsCount = 89;
        let activeCustomers = 1247;
        let ruleStates = {1: true, 2: true, 3: true};

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

        function simulateCustomerBehavior() {
            const behavior = customerBehaviors[Math.floor(Math.random() * customerBehaviors.length)];
            const customerId = Math.floor(Math.random() * 9000) + 1000;
            
            const activityFeed = document.getElementById('activityFeed');
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <div class="activity-icon">${behavior.icon}</div>
                <div class="activity-content">
                    <div class="activity-title">${behavior.title}</div>
                    <div class="activity-description">Customer #${customerId} ${behavior.description}</div>
                    <div class="activity-time">Just now</div>
                </div>
                <div class="activity-action">${behavior.action}</div>
            `;
            
            activityFeed.insertBefore(newActivity, activityFeed.firstChild);
            
            // Update metrics
            aiActionsCount++;
            document.getElementById('aiActions').textContent = aiActionsCount;
            
            // Animate metric
            const aiActionsElement = document.getElementById('aiActions');
            aiActionsElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                aiActionsElement.style.transform = 'scale(1)';
            }, 200);

            // Update active customers randomly
            activeCustomers += Math.floor(Math.random() * 10) - 3;
            document.getElementById('activeCustomers').textContent = activeCustomers.toLocaleString();
        }

        function toggleRule(ruleId) {
            ruleStates[ruleId] = !ruleStates[ruleId];
            const ruleElement = document.querySelector(`[data-rule-id="${ruleId}"]`);
            const toggle = ruleElement.querySelector('.rule-toggle');
            const statusElement = ruleElement.querySelector('.stat span:nth-child(2)');
            const pulseElement = ruleElement.querySelector('.pulse');
            
            if (ruleStates[ruleId]) {
                toggle.classList.add('active');
                statusElement.textContent = 'ACTIVE';
                statusElement.className = 'status-active';
                pulseElement.style.display = 'inline-block';
            } else {
                toggle.classList.remove('active');
                statusElement.textContent = 'INACTIVE';
                statusElement.className = 'status-inactive';
                pulseElement.style.display = 'none';
            }
        }

        function openRuleBuilder() {
            document.getElementById('ruleModal').classList.add('show');
        }

        function closeModal() {
            document.getElementById('ruleModal').classList.remove('show');
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

        function clearActivities() {
            const activityFeed = document.getElementById('activityFeed');
            activityFeed.innerHTML = '<div class="activity-item"><div class="activity-icon">✨</div><div class="activity-content"><div class="activity-title">Activity Feed Cleared</div><div class="activity-description">Ready for new customer interactions</div></div></div>';
        }

        // Auto-simulate customer behavior every 8 seconds
        setInterval(() => {
            if (Math.random() > 0.3) {
                simulateCustomerBehavior();
            }
        }, 8000);

        // Close modal when clicking outside
        document.getElementById('ruleModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Randomly update metrics
        setInterval(() => {
            const conversionChange = (Math.random() * 2 - 1).toFixed(1);
            const currentConversion = parseFloat(document.getElementById('conversionLift').textContent);
            const newConversion = (currentConversion + parseFloat(conversionChange)).toFixed(0);
            document.getElementById('conversionLift').textContent = `+${newConversion}%`;
        }, 15000);