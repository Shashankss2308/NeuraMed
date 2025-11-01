// NeuraMate - Complete Website JavaScript

class NeuraMateApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.onlineCount = 12;
        this.wellnessPoints = 0;
        this.streakDays = 0;
        this.plantsGrown = 0;
        
        this.initializeEventListeners();
        this.initializeFAQ();
        this.initializeGardenGame();
        this.initializeNavigation();
        this.initializeAnimations();
        this.simulateOnlineUsers();
    }

    initializeEventListeners() {
        // Chat functionality
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Wellness Hub tab functionality
        this.initializeWellnessTabs();

        // Mood slider functionality
        this.initializeMoodSlider();

        // Journal tags functionality
        this.initializeJournalTags();

        // Habit checkboxes functionality
        this.initializeHabitCheckboxes();

        // Breathing exercises functionality
        this.initializeBreathingExercises();

        // Affirmation tags functionality
        this.initializeAffirmationTags();

        // Garden Game functionality
        this.initializeGardenGame();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }
    }

    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    initializeGardenGame() {
        // Plant watering functionality
        const plantPlots = document.querySelectorAll('.plant-plot');
        plantPlots.forEach((plot, index) => {
            plot.addEventListener('click', () => {
                this.waterPlant(plot, index);
            });
        });

        // Daily activities
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach(item => {
            item.addEventListener('click', () => {
                this.completeActivity(item);
            });
        });

        // Update progress stats
        this.updateProgressStats();
    }

    initializeNavigation() {
        // Update active navigation link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });

        // Mobile menu toggle (if needed)
        this.createMobileMenu();
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .testimonial-card, .feature-item, .value-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Chat functionality
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getAIResponse(message);
            this.addMessage(response, 'ai');
        }, 1500 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        if (sender === 'ai') {
            messageDiv.classList.add('yuvaa-message');
        }

        const avatar = sender === 'user' ? 'You' : 'Y';
        const username = sender === 'user' ? 'You' : 'Yuvaa';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="username">${username}</span>
                </div>
                <div class="message-text">${this.escapeHtml(text)}</div>
            </div>
        `;

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">Y</div>
            <div class="message-content">
                <div class="message-text">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm Yuvaa, your AI wellness companion. I'm here to support you on your mental health journey. How are you feeling today?";
        }
        
        if (message.includes('anxious') || message.includes('anxiety')) {
            return "I understand that anxiety can be overwhelming. You're not alone in this. Would you like to try some breathing exercises or would you prefer to connect with a professional therapist?";
        }
        
        if (message.includes('sad') || message.includes('depressed')) {
            return "I'm sorry you're feeling this way. Depression is really tough, but you're taking a great step by reaching out. Have you considered joining one of our anonymous support groups?";
        }
        
        if (message.includes('stress') || message.includes('stressed')) {
            return "Stress can be really challenging to manage. I'd recommend trying our mental health assessment to get personalized insights, or you could try some mindfulness exercises in our wellness hub.";
        }
        
        if (message.includes('help') || message.includes('support')) {
            return "I'm here to help! You can access professional therapy, join anonymous group chats, or take our mental health assessment. What type of support would be most helpful for you right now?";
        }
        
        if (message.includes('thank')) {
            return "You're very welcome! Remember, seeking help is a sign of strength. I'm always here when you need support. 💙";
        }
        
        // Default responses
        const responses = [
            "Thank you for sharing that with me. I'm here to listen and support you. How can I help you feel better today?",
            "I appreciate you opening up to me. Your feelings are valid and important. Would you like to explore some coping strategies together?",
            "I hear you, and I want you to know that you're not alone in this. Many people find it helpful to connect with others who understand their experiences.",
            "That sounds really difficult. I'm glad you're reaching out for support. Have you tried any of our wellness activities like the garden game or mood tracking?",
            "Thank you for trusting me with your thoughts. Remember, it's okay to not be okay sometimes. What would be most helpful for you right now?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Garden game functionality
    waterPlant(plot, index) {
        if (plot.classList.contains('watered')) return;
        
        plot.classList.add('watered');
        plot.style.background = '#f0fdf4';
        plot.style.borderColor = '#10b981';
        
        // Add water animation
        plot.innerHTML = '<i class="fas fa-tint" style="color: #0ea5e9;"></i>';
        
        setTimeout(() => {
            plot.innerHTML = '<i class="fas fa-seedling" style="color: #10b981;"></i>';
        }, 1000);
        
        // Update stats
        this.wellnessPoints += 5;
        this.plantsGrown++;
        this.updateProgressStats();
        
        // Show notification
        this.showNotification('Plant watered! +5 wellness points');
    }

    completeActivity(item) {
        if (item.classList.contains('completed')) return;
        
        item.classList.add('completed');
        item.style.background = '#f0fdf4';
        item.style.border = '1px solid #10b981';
        
        // Get points from the activity
        const pointsElement = item.querySelector('.points');
        const points = parseInt(pointsElement.textContent.replace('+', ''));
        
        this.wellnessPoints += points;
        this.updateProgressStats();
        
        // Show notification
        this.showNotification(`Activity completed! +${points} wellness points`);
    }

    updateProgressStats() {
        // Update wellness points
        const wellnessPointsEl = document.querySelector('.stat-value.green');
        if (wellnessPointsEl) {
            wellnessPointsEl.textContent = this.wellnessPoints;
        }
        
        // Update plants grown
        const plantsGrownEl = document.querySelectorAll('.stat-value.green')[1];
        if (plantsGrownEl) {
            plantsGrownEl.textContent = this.plantsGrown;
        }
        
        // Update streak days
        const streakDaysEl = document.querySelector('.stat-value.orange');
        if (streakDaysEl) {
            streakDaysEl.textContent = this.streakDays;
        }
    }

    // FAQ functionality
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Contact form handling
    handleContactForm() {
        const form = document.querySelector('.contact-form form');
        const formData = new FormData(form);
        
        // Simulate form submission
        this.showNotification('Message sent! We\'ll get back to you within 24 hours.');
        form.reset();
    }

    // Wellness Hub Tab Functionality
    initializeWellnessTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Mood Slider Functionality
    initializeMoodSlider() {
        const moodSlider = document.getElementById('moodSlider');
        const currentMoodValue = document.getElementById('currentMoodValue');
        const moodEmoji = document.querySelector('.mood-emoji');

        if (moodSlider && currentMoodValue && moodEmoji) {
            moodSlider.addEventListener('input', () => {
                const value = moodSlider.value;
                currentMoodValue.textContent = value;
                
                // Update emoji based on mood value
                const emojis = ['😢', '😔', '😐', '🙂', '😊', '😄', '😁', '🤩', '🥳', '🎉'];
                const emojiIndex = Math.min(Math.floor((value - 1) * 0.9), emojis.length - 1);
                moodEmoji.textContent = emojis[emojiIndex];
            });
        }
    }

    // Journal Tags Functionality
    initializeJournalTags() {
        const tagButtons = document.querySelectorAll('.tag-btn');
        
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });
    }

    // Habit Checkboxes Functionality
    initializeHabitCheckboxes() {
        const habitCheckboxes = document.querySelectorAll('.habit-checkbox input[type="checkbox"]');
        
        habitCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const habitItem = checkbox.closest('.habit-item');
                const habitStreak = habitItem.querySelector('.habit-streak');
                
                if (checkbox.checked) {
                    // Increment streak
                    let currentStreak = parseInt(habitStreak.textContent);
                    habitStreak.textContent = currentStreak + 1;
                    
                    // Add visual feedback
                    habitItem.style.background = '#f0fdf4';
                    setTimeout(() => {
                        habitItem.style.background = 'transparent';
                    }, 1000);
                    
                    this.showNotification('Great job! Keep up the good work!');
                }
            });
        });
    }

    // Breathing Exercises Functionality
    initializeBreathingExercises() {
        const breatheBtn = document.getElementById('breatheBtn');
        const breathingOptions = document.querySelectorAll('.breathing-option');
        const breathingPattern = document.querySelector('.breathing-pattern');
        
        // Breathing pattern options
        const patterns = {
            '4-7-8': { name: '4-7-8 Breathing Pattern', duration: 4 },
            'box': { name: 'Box Breathing Pattern', duration: 4 },
            'quick': { name: 'Quick Calm Pattern', duration: 2 }
        };

        // Breathing option selection
        breathingOptions.forEach(option => {
            option.addEventListener('click', () => {
                breathingOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                const pattern = option.getAttribute('data-pattern');
                if (breathingPattern) {
                    breathingPattern.textContent = patterns[pattern].name;
                }
            });
        });

        // Breathing animation
        if (breatheBtn) {
            breatheBtn.addEventListener('click', () => {
                this.startBreathingAnimation(breatheBtn);
            });
        }
    }

    startBreathingAnimation(button) {
        if (button.classList.contains('breathing')) {
            // Stop breathing
            button.classList.remove('breathing');
            button.textContent = 'Breathe';
            return;
        }

        // Start breathing
        button.classList.add('breathing');
        button.textContent = 'Breathe In';
        
        let cycle = 0;
        const maxCycles = 3;
        
        const breathingCycle = () => {
            if (cycle >= maxCycles) {
                button.classList.remove('breathing');
                button.textContent = 'Breathe';
                this.showNotification('Breathing session completed!');
                return;
            }
            
            setTimeout(() => {
                button.textContent = 'Hold';
            }, 2000);
            
            setTimeout(() => {
                button.textContent = 'Breathe Out';
            }, 4000);
            
            setTimeout(() => {
                button.textContent = 'Breathe In';
                cycle++;
                if (cycle < maxCycles) {
                    breathingCycle();
                }
            }, 6000);
        };
        
        breathingCycle();
    }

    // Affirmation Tags Functionality
    initializeAffirmationTags() {
        const affirmationTags = document.querySelectorAll('.affirmation-tag');
        
        affirmationTags.forEach(tag => {
            tag.addEventListener('click', () => {
                affirmationTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });
    }

    // Garden Game Functionality
    initializeGardenGame() {
        this.gardenData = {
            wellnessPoints: 0,
            streakDays: 0,
            plantsGrown: 0,
            plantGrowth: {
                1: 0,   // Empty
                2: 0,   // Empty
                3: 0,   // Empty
                4: 0,   // Empty
                5: 0,   // Empty
                6: 0,   // Empty
                7: 0,   // Empty
                8: 0,   // Empty
                9: 0,   // Empty
                10: 0,  // Empty
                11: 0,  // Empty
                12: 0   // Empty
            },
            completedActivities: new Set(),
            achievements: {
                'green-thumb': false,  // Locked
                'garden-master': false, // Locked
                'streak-warrior': false // Locked
            }
        };

        this.initializePlantPlots();
        this.initializeDailyActivities();
        this.initializeAchievements();
        this.updateGardenStats();
    }

    initializePlantPlots() {
        const plantPlots = document.querySelectorAll('.plant-plot');
        
        plantPlots.forEach(plot => {
            plot.addEventListener('click', () => {
                const plotNumber = parseInt(plot.getAttribute('data-plot'));
                this.waterPlant(plotNumber, plot);
            });
        });
    }

    waterPlant(plotNumber, plotElement) {
        if (this.gardenData.plantGrowth[plotNumber] >= 100) {
            this.showNotification('This plant is already fully grown!');
            return;
        }

        // Increase growth by 25% each watering
        this.gardenData.plantGrowth[plotNumber] = Math.min(
            this.gardenData.plantGrowth[plotNumber] + 25, 
            100
        );

        // Update visual appearance
        this.updatePlantAppearance(plotNumber, plotElement);
        
        // Add wellness points
        this.gardenData.wellnessPoints += 5;
        this.updateGardenStats();

        // Check for achievements
        this.checkAchievements();

        this.showNotification(`Plant watered! Growth: ${this.gardenData.plantGrowth[plotNumber]}%`);
    }

    updatePlantAppearance(plotNumber, plotElement) {
        const growth = this.gardenData.plantGrowth[plotNumber];
        
        if (growth >= 100) {
            plotElement.classList.remove('empty');
            plotElement.classList.add('grown');
            plotElement.innerHTML = `
                <i class="fas fa-tree"></i>
                <span class="growth-percentage">100%</span>
            `;
            this.gardenData.plantsGrown++;
        } else if (growth >= 75) {
            plotElement.innerHTML = `
                <i class="fas fa-seedling" style="color: #10b981; font-size: 20px;"></i>
                <span class="growth-percentage">${growth}%</span>
            `;
        } else if (growth >= 50) {
            plotElement.innerHTML = `
                <i class="fas fa-seedling" style="color: #10b981; font-size: 18px;"></i>
                <span class="growth-percentage">${growth}%</span>
            `;
        } else if (growth >= 25) {
            plotElement.innerHTML = `
                <i class="fas fa-seedling" style="color: #10b981; font-size: 16px;"></i>
                <span class="growth-percentage">${growth}%</span>
            `;
        } else {
            plotElement.innerHTML = `
                <i class="fas fa-seedling"></i>
                <span class="growth-percentage">${growth}%</span>
            `;
        }
    }

    initializeDailyActivities() {
        const activityItems = document.querySelectorAll('.activity-item');
        
        activityItems.forEach(item => {
            item.addEventListener('click', () => {
                const activity = item.getAttribute('data-activity');
                const points = parseInt(item.getAttribute('data-points'));
                
                if (this.gardenData.completedActivities.has(activity)) {
                    this.showNotification('You\'ve already completed this activity today!');
                    return;
                }

                // Mark as completed
                this.gardenData.completedActivities.add(activity);
                item.classList.add('completed');
                
                // Add points
                this.gardenData.wellnessPoints += points;
                this.gardenData.streakDays++;
                
                this.updateGardenStats();
                this.checkAchievements();
                
                this.showNotification(`Activity completed! +${points} wellness points`);
            });
        });
    }

    initializeAchievements() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach(card => {
            const achievement = card.getAttribute('data-achievement');
            
            if (this.gardenData.achievements[achievement]) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
            }
        });
    }

    checkAchievements() {
        // Check Green Thumb achievement (plant first seed)
        if (this.gardenData.plantsGrown >= 1 && !this.gardenData.achievements['green-thumb']) {
            this.gardenData.achievements['green-thumb'] = true;
            this.unlockAchievement('green-thumb', 'Green Thumb');
        }

        // Check Garden Master achievement
        if (this.gardenData.plantsGrown >= 5 && !this.gardenData.achievements['garden-master']) {
            this.gardenData.achievements['garden-master'] = true;
            this.unlockAchievement('garden-master', 'Garden Master');
        }

        // Check Streak Warrior achievement
        if (this.gardenData.streakDays >= 7 && !this.gardenData.achievements['streak-warrior']) {
            this.gardenData.achievements['streak-warrior'] = true;
            this.unlockAchievement('streak-warrior', 'Streak Warrior');
        }
    }

    unlockAchievement(achievementId, achievementName) {
        const achievementCard = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (achievementCard) {
            achievementCard.classList.remove('locked');
            achievementCard.classList.add('unlocked');
            
            const progressText = achievementCard.querySelector('.progress-text');
            const button = achievementCard.querySelector('button');
            
            if (progressText) {
                progressText.textContent = '1/1';
            }
            
            if (button) {
                button.textContent = 'Unlocked!';
                button.className = 'unlock-btn';
                button.disabled = false;
            }
        }
        
        this.showNotification(`🎉 Achievement Unlocked: ${achievementName}!`);
    }

    updateGardenStats() {
        const wellnessPointsEl = document.getElementById('wellnessPoints');
        const streakDaysEl = document.getElementById('streakDays');
        const plantsGrownEl = document.getElementById('plantsGrown');
        
        if (wellnessPointsEl) {
            wellnessPointsEl.textContent = this.gardenData.wellnessPoints;
        }
        
        if (streakDaysEl) {
            streakDaysEl.textContent = this.gardenData.streakDays;
        }
        
        if (plantsGrownEl) {
            plantsGrownEl.textContent = this.gardenData.plantsGrown;
        }
    }

    // Mobile menu
    createMobileMenu() {
        const header = document.querySelector('.header-content');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.display = 'block';
            
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            header.appendChild(mobileMenuBtn);
        }
    }

    // Utility functions
    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    simulateOnlineUsers() {
        const onlineTextEl = document.querySelector('.online-indicator span');
        if (onlineTextEl) {
            const update = () => {
                onlineTextEl.textContent = `${this.onlineCount} online`;
            };
            update();
            
            setInterval(() => {
                const change = Math.floor(Math.random() * 3) - 1;
                this.onlineCount = Math.max(8, Math.min(20, this.onlineCount + change));
                update();
            }, 30000);
        }
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new NeuraMateApp();
});

// Global functions for HTML onclick events
function sendMessage() {
    if (app) {
        app.sendMessage();
    }
}

// Wellness Hub Global Functions
function saveMoodEntry() {
    const moodSlider = document.getElementById('moodSlider');
    const moodValue = moodSlider ? moodSlider.value : 7;
    
    if (app) {
        app.showNotification(`Mood entry saved: ${moodValue}/10`);
        
        // Update mood insights
        const totalEntries = document.querySelector('.mood-stats .stat-item:last-child .stat-value');
        if (totalEntries) {
            let currentTotal = parseInt(totalEntries.textContent);
            totalEntries.textContent = currentTotal + 1;
        }
    }
}

function saveJournalEntry() {
    const journalTextarea = document.querySelector('.journal-textarea');
    const text = journalTextarea ? journalTextarea.value.trim() : '';
    
    if (text.length < 10) {
        if (app) {
            app.showNotification('Please write at least 10 characters for your journal entry.');
        }
        return;
    }
    
    if (app) {
        app.showNotification('Journal entry saved successfully!');
        journalTextarea.value = '';
        
        // Update journal stats
        const totalEntries = document.querySelector('.journal-streak .streak-number');
        if (totalEntries) {
            let currentTotal = parseInt(totalEntries.textContent);
            totalEntries.textContent = currentTotal + 1;
        }
        
        const weeklyEntries = document.querySelector('.journal-stats .stat-item:first-child .stat-value');
        if (weeklyEntries) {
            let currentWeek = parseInt(weeklyEntries.textContent);
            weeklyEntries.textContent = `${currentWeek + 1} entries`;
        }
    }
}

function addNewHabit() {
    const habitName = prompt('Enter the name of your new habit:');
    if (habitName && habitName.trim()) {
        const habitsList = document.querySelector('.habits-list');
        if (habitsList) {
            const newHabit = document.createElement('div');
            newHabit.className = 'habit-item';
            newHabit.innerHTML = `
                <label class="habit-checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    ${habitName.trim()}
                </label>
                <span class="habit-streak">0</span>
            `;
            habitsList.appendChild(newHabit);
            
            // Re-initialize habit checkboxes for the new element
            if (app) {
                app.initializeHabitCheckboxes();
            }
            
            if (app) {
                app.showNotification(`New habit "${habitName.trim()}" added!`);
            }
        }
    }
}

function startBreathingSession() {
    const breatheBtn = document.getElementById('breatheBtn');
    if (breatheBtn && app) {
        app.startBreathingAnimation(breatheBtn);
    }
}

function getNewAffirmation() {
    const affirmations = [
        "I am capable of handling whatever comes my way today.",
        "I choose to focus on the positive aspects of my life.",
        "I am worthy of love, happiness, and success.",
        "I trust in my ability to overcome challenges.",
        "I am grateful for all the good in my life.",
        "I am strong, resilient, and capable.",
        "I deserve to be treated with kindness and respect.",
        "I am making progress every day, even if it's small.",
        "I believe in my potential to achieve my goals.",
        "I am enough, just as I am."
    ];
    
    const affirmationText = document.querySelector('.affirmation-text');
    if (affirmationText) {
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        affirmationText.textContent = randomAffirmation;
        
        if (app) {
            app.showNotification('New affirmation loaded!');
        }
    }
}

// Add CSS animations
const animationStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing-dots span {
        width: 6px;
        height: 6px;
        background: #94a3b8;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
        animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: -0.16s;
    }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: #64748b;
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 20px;
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
    
    .activity-item,
    .plant-plot {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .activity-item:hover,
    .plant-plot:hover {
        transform: translateY(-2px);
    }
    
    .completed {
        opacity: 0.7;
    }
    
    .watered {
        animation: waterEffect 0.5s ease;
    }
    
    @keyframes waterEffect {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Add some sample data and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Simulate some initial chat activity
    setTimeout(() => {
        if (app && app.chatMessages) {
            app.addMessage("Welcome to NeuraMate! I'm here to support your mental wellness journey. Feel free to ask me anything about our services or just share how you're feeling today.", 'ai');
        }
    }, 1000);
    
    // Add some sample mood entries
    const moodProgress = document.querySelector('.progress-fill');
    if (moodProgress) {
        // Simulate mood tracking
        setInterval(() => {
            const randomMood = Math.floor(Math.random() * 10) + 1;
            const percentage = (randomMood / 10) * 100;
            moodProgress.style.width = `${percentage}%`;
            
            const moodText = document.querySelector('.mood-progress span');
            if (moodText) {
                moodText.textContent = `Current: ${randomMood}/10`;
            }
        }, 30000);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus chat
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.focus();
            }
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    z-index: 1000;
`;

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add hover effects
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.background = '#2563eb';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.background = '#3b82f6';
    scrollToTopBtn.style.transform = 'scale(1)';
});