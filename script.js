// Global state
let currentStep = 1;
let currentSubstep = null;
let generatedCopy = '';
let userFormData = {};

// AI Copy Generation Templates
const copyTemplates = {
    'thought-leadership': {
        professional: (data) => `${data.topic}

As someone working in ${data.industry}, I've observed how rapidly our landscape is evolving. Here are my key insights:

• [Key insight 1 based on your expertise]
• [Key insight 2 with supporting data]
• [Key insight 3 with future implications]

What trends are you seeing in your field? I'd love to hear your perspective.

#${data.industry} #ThoughtLeadership #Innovation`,
        
        conversational: (data) => `I've been thinking about ${data.topic.toLowerCase()} lately...

Working in ${data.industry}, I see this everywhere. Here's what I think matters most:

✨ [Personal insight 1]
✨ [Real example or story]
✨ [What this means for ${data.audience.toLowerCase()}]

Anyone else noticing this trend? Drop your thoughts below! 👇

#${data.industry} #${data.audience.replace(/\s+/g, '')}`,
        
        inspirational: (data) => `${data.topic} 💡

Every challenge in ${data.industry} is an opportunity in disguise. 

Here's what I've learned:
→ [Lesson 1 from experience]
→ [Lesson 2 with actionable advice]
→ [Lesson 3 about mindset]

To my fellow ${data.audience.toLowerCase()}: Remember, progress isn't always linear, but it's always possible.

What's one lesson that changed your perspective? Share below! ⬇️

#Inspiration #${data.industry} #Growth`
    },
    
    'company-update': {
        professional: (data) => `Exciting Update: ${data.topic}

I'm thrilled to share this milestone with our network. This achievement represents months of dedicated work from our incredible team.

Key highlights:
• [Achievement detail 1]
• [Achievement detail 2] 
• [Impact on ${data.audience.toLowerCase()}]

Thank you to everyone who has supported our journey. This is just the beginning.

#${data.industry} #CompanyUpdate #Teamwork`,
        
        conversational: (data) => `Big news! 🎉

${data.topic}

I can't contain my excitement about this! Our team has been working incredibly hard, and seeing it all come together is amazing.

Here's what this means:
→ [Benefit 1]
→ [Benefit 2]
→ [What's next]

Huge shoutout to the team who made this possible! 👏

#${data.industry} #Excited #TeamWork`,
        
        educational: (data) => `Case Study: ${data.topic}

Breaking down our recent experience for fellow ${data.audience.toLowerCase()}:

The Challenge: [What we faced]
The Approach: [How we tackled it]
The Results: [What we achieved]
The Lessons: [Key takeaways]

Hope this insight helps others facing similar challenges!

#${data.industry} #CaseStudy #Lessons`
    },
    
    'industry-insights': {
        professional: (data) => `Industry Analysis: ${data.topic}

Based on recent market research and my experience in ${data.industry}, here are the key trends ${data.audience.toLowerCase()} should watch:

📊 Trend 1: [Data-driven insight]
📊 Trend 2: [Market observation]  
📊 Trend 3: [Future prediction]

These shifts represent both challenges and opportunities for our industry.

What patterns are you observing? I'd value your insights.

#${data.industry} #MarketTrends #Analysis`,
        
        authoritative: (data) => `The State of ${data.topic} in ${data.industry}

After [X years] in this space, I'm seeing fundamental shifts that will reshape how we work:

1. [Major trend with supporting data]
2. [Emerging pattern with implications]
3. [Critical factor for future success]

Organizations that adapt early will have a significant competitive advantage.

My recommendation for ${data.audience.toLowerCase()}: [Specific actionable advice]

#${data.industry} #Strategy #FutureOfWork`,
        
        educational: (data) => `Understanding ${data.topic}: A Guide for ${data.audience} 📚

Let me break this down in simple terms:

🔍 What it is: [Clear definition]
🔍 Why it matters: [Relevance to audience]
🔍 How to apply it: [Practical steps]
🔍 Common mistakes: [What to avoid]

Save this post for future reference! Feel free to ask questions below.

#${data.industry} #Education #Tips`
    },
    
    'personal-story': {
        inspirational: (data) => `${data.topic}

Three years ago, I never imagined I'd be where I am today in ${data.industry}.

The journey taught me:
💭 [Key lesson about persistence]
💭 [Insight about growth]
💭 [Wisdom about failure]

To anyone struggling with similar challenges: Your breakthrough might be closer than you think.

What's one experience that changed your perspective? 

#PersonalJourney #${data.industry} #Growth`,
        
        conversational: (data) => `Story time! 📖

${data.topic}

Looking back, this experience in ${data.industry} taught me so much about [life lesson]. 

The funny thing is, at the time it felt like everything was falling apart. But sometimes the best opportunities come disguised as problems.

Can anyone relate? What's a challenge that turned into a blessing for you?

#Story #Life #${data.industry}`,
        
        educational: (data) => `Lessons from My Experience: ${data.topic}

What happened: [Brief story context]
What I learned: [Key takeaway 1]
What I'd do differently: [Reflection]
What I'd recommend to others: [Actionable advice]

For fellow ${data.audience.toLowerCase()}, here's my biggest piece of advice: [Specific guidance]

Hope this helps someone avoid the same mistakes I made!

#Lessons #${data.industry} #Experience`
    },
    
    'tips-advice': {
        educational: (data) => `5 Essential Tips: ${data.topic} 💡

For ${data.audience.toLowerCase()} looking to excel in ${data.industry}:

1️⃣ [Practical tip 1 with brief explanation]
2️⃣ [Practical tip 2 with example]
3️⃣ [Practical tip 3 with warning]
4️⃣ [Practical tip 4 with benefit]
5️⃣ [Practical tip 5 with next step]

💾 Save this for later!
🔄 Share with your network!

Which tip resonates most with you?

#Tips #${data.industry} #Advice`,
        
        conversational: (data) => `Quick advice for ${data.audience.toLowerCase()}! 🚀

${data.topic}

Here's what I wish someone told me earlier:

✅ [Practical advice 1]
✅ [Practical advice 2]  
✅ [Practical advice 3]

The ${data.industry} space moves fast, but these fundamentals never change.

What would you add to this list? Drop your wisdom below! 👇

#Advice #${data.industry} #Tips`,
        
        authoritative: (data) => `Professional Guidance: ${data.topic}

After working with hundreds of ${data.audience.toLowerCase()} in ${data.industry}, these are the patterns I consistently see among top performers:

→ [Strategic behavior 1]
→ [Strategic behavior 2]
→ [Strategic behavior 3]
→ [Strategic behavior 4]

Implementing even one of these can significantly impact your results.

Which area would you like to develop first?

#Professional #${data.industry} #Excellence`
    },
    
    'announcement': {
        professional: (data) => `Important Announcement: ${data.topic}

We're excited to share this significant development with our ${data.industry} community.

Details:
• [Key detail 1]
• [Key detail 2]
• [Impact on stakeholders]

This represents our continued commitment to serving ${data.audience.toLowerCase()} with excellence.

Stay tuned for more updates as this develops.

#${data.industry} #Announcement #Update`,
        
        conversational: (data) => `Exciting news! 🎉

${data.topic}

I've been waiting to share this for weeks! This is going to be a game-changer for ${data.audience.toLowerCase()} in the ${data.industry} space.

Here's what you need to know:
→ [Key point 1]
→ [Key point 2]
→ [What this means for you]

Can't wait to see how this impacts our community!

#News #${data.industry} #Exciting`,
        
        inspirational: (data) => `A New Chapter: ${data.topic} ✨

Every ending is a new beginning, and today marks an important milestone in our ${data.industry} journey.

This announcement represents:
🌟 [Vision element 1]
🌟 [Vision element 2]
🌟 [Future opportunity]

To our amazing community of ${data.audience.toLowerCase()}: Thank you for being part of this incredible journey.

The best is yet to come! 🚀

#NewChapter #${data.industry} #Future`
    }
};

// Industry-specific hashtags
const industryHashtags = {
    technology: ['Tech', 'Innovation', 'DigitalTransformation', 'AI', 'Software', 'StartupLife'],
    marketing: ['Marketing', 'DigitalMarketing', 'ContentMarketing', 'SEO', 'SocialMedia', 'Branding'],
    finance: ['Finance', 'FinTech', 'Investment', 'Banking', 'Economy', 'FinancialPlanning'],
    healthcare: ['Healthcare', 'MedTech', 'Wellness', 'PatientCare', 'HealthInnovation', 'Medicine'],
    education: ['Education', 'Learning', 'Teaching', 'EdTech', 'StudentSuccess', 'LifelongLearning'],
    consulting: ['Consulting', 'Strategy', 'BusinessTransformation', 'Leadership', 'Management', 'Growth'],
    other: ['Business', 'Professional', 'Career', 'Networking', 'Industry', 'Growth']
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    setupFormHandlers();
    setupStepNavigation();
});

// Step Navigation Functions
function nextStep() {
    try {
        // Validate current state before proceeding
        validateNavigationState();
        console.log(`nextStep called: currentStep=${currentStep}, currentSubstep=${currentSubstep}`);
        
        // Handle substep navigation first
        if (currentSubstep) {
            if (currentSubstep === '2a') {
                goToSubstep('2b');
                return;
            } else if (currentSubstep === '2b') {
                goToSubstep('2c');
                return;
            } else if (currentSubstep === '2c') {
                goToSubstep('2d');
                return;
            } else if (currentSubstep === '2d') {
                goToSubstep('2e');
                return;
            } else if (currentSubstep === '2e') {
                // Move to next main step
                currentSubstep = null;
                currentStep = 3;
                showStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }
        
        // Handle main step navigation
        if (currentStep < 5) {
            currentStep++;
            currentSubstep = null; // Reset substep
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(`Moved to step ${currentStep}`);
        }
    } catch (error) {
        console.error('Error in nextStep:', error);
    }
}

function prevStep() {
    try {
        // Validate current state before proceeding
        validateNavigationState();
        console.log(`prevStep called: currentStep=${currentStep}, currentSubstep=${currentSubstep}`);
        
        // Handle substep navigation first
        if (currentSubstep) {
            if (currentSubstep === '2b') {
                goToSubstep('2a');
                return;
            } else if (currentSubstep === '2c') {
                goToSubstep('2b');
                return;
            } else if (currentSubstep === '2d') {
                goToSubstep('2c');
                return;
            } else if (currentSubstep === '2e') {
                goToSubstep('2d');
                return;
            } else if (currentSubstep === '2a') {
                // Go back to main step 2 overview
                goToSubstep('2');
                return;
            }
        }
        
        // Handle main step navigation
        if (currentStep > 1) {
            currentStep--;
            currentSubstep = null; // Reset substep
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(`Moved to step ${currentStep}`);
        }
    } catch (error) {
        console.error('Error in prevStep:', error);
    }
}

function showStep(step) {
    try {
        // Update current step
        const previousStep = currentStep;
        currentStep = step;
        console.log(`showStep: ${previousStep} → ${step}, substep reset: ${currentSubstep} → null`);
        
        // Hide all steps
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show current step
        const stepElement = document.getElementById(`step${step}`);
        if (stepElement) {
            stepElement.classList.add('active');
        } else {
            console.warn(`Step element step${step} not found`);
        }
        
        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index + 1 === step) {
                stepEl.classList.add('active');
            } else if (index + 1 < step) {
                stepEl.classList.add('completed');
            }
        });

        // Reset substep when changing main steps
        currentSubstep = null;
        updateProgressBar();
        updateSubstepIndicators();

        // Special handling for different steps
        if (step === 4) {
            populateHashtagSuggestions();
        }
    } catch (error) {
        console.error('Error in showStep:', error);
    }
}

function updateProgressBar() {
    try {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            // Use 4 as the total since there are 4 visible steps (step 5 is completion screen)
            const totalVisibleSteps = 4;
            const progressPercent = (Math.min(currentStep, totalVisibleSteps) / totalVisibleSteps) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
    } catch (error) {
        console.error('Error in updateProgressBar:', error);
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return true; // Intro step, no validation needed
        case 2:
            return true; // Step 2 is now overview page, no validation needed
        case 3:
            return true; // Figma instructions, no validation needed
        case 4:
            return true; // LinkedIn instructions, no validation needed
        default:
            return false;
    }
}

function validateFormStep() {
    const form = document.getElementById('copyForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });

    return isValid && generatedCopy.length > 0;
}

// Form Handling
function setupFormHandlers() {
    const form = document.getElementById('copyForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateCopy();
    });

    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
}

function generateCopy() {
    const form = document.getElementById('copyForm');
    const formData = new FormData(form);
    
    // Store form data globally
    userFormData = {
        industry: formData.get('industry'),
        postType: formData.get('postType'),
        topic: formData.get('topic'),
        audience: formData.get('audience'),
        tone: formData.get('tone')
    };

    // Show loading state
    const generateButton = document.querySelector('.generate-button');
    const originalText = generateButton.innerHTML;
    generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateButton.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        const copy = createAIGeneratedCopy(userFormData);
        displayGeneratedCopy(copy);
        
        // Reset button
        generateButton.innerHTML = originalText;
        generateButton.disabled = false;
        
        // Enable next step
        document.getElementById('step2Next').disabled = false;
    }, 2000);
}

function createAIGeneratedCopy(data) {
    try {
        const template = copyTemplates[data.postType];
        if (template && template[data.tone]) {
            let copy = template[data.tone](data);
            
            // Replace placeholders with more specific content based on form data
            copy = enhanceCopyWithContext(copy, data);
            
            return copy;
        } else {
            // Fallback generic template
            return createGenericCopy(data);
        }
    } catch (error) {
        console.error('Error generating copy:', error);
        return createGenericCopy(data);
    }
}

function enhanceCopyWithContext(copy, data) {
    // This function would typically call an AI service
    // For now, we'll do some basic placeholder replacement
    
    const enhancements = {
        technology: {
            insights: ['automation is transforming workflows', 'AI adoption is accelerating', 'remote collaboration tools are essential'],
            examples: ['machine learning implementation', 'cloud migration project', 'API integration challenge'],
            advice: ['embrace continuous learning', 'focus on user experience', 'prioritize security']
        },
        marketing: {
            insights: ['personalization drives engagement', 'video content performs best', 'data-driven decisions win'],
            examples: ['campaign optimization', 'A/B testing results', 'customer journey mapping'],
            advice: ['know your audience deeply', 'test everything', 'measure what matters']
        },
        finance: {
            insights: ['digital payments are growing', 'risk management is crucial', 'financial literacy matters'],
            examples: ['portfolio diversification', 'budgeting strategy', 'investment analysis'],
            advice: ['start early with investing', 'diversify your portfolio', 'understand the risks']
        }
    };

    const industryData = enhancements[data.industry] || enhancements.technology;
    
    // Replace generic placeholders with industry-specific content
    copy = copy.replace('[Key insight 1 based on your expertise]', industryData.insights[0] || 'industry trends are evolving rapidly');
    copy = copy.replace('[Key insight 2 with supporting data]', industryData.insights[1] || 'data shows significant growth');
    copy = copy.replace('[Key insight 3 with future implications]', industryData.insights[2] || 'future opportunities are emerging');
    
    copy = copy.replace('[Real example or story]', industryData.examples[0] || 'a recent project success');
    copy = copy.replace('[Specific actionable advice]', industryData.advice[0] || 'focus on continuous improvement');
    
    return copy;
}

function createGenericCopy(data) {
    return `${data.topic}

As a professional in ${data.industry}, I wanted to share some thoughts with fellow ${data.audience.toLowerCase()}.

Key points to consider:
• [Insight based on your experience]
• [Relevant trend or observation]  
• [Actionable advice or next step]

What's your take on this? I'd love to hear your perspective in the comments.

#${data.industry} #Professional #Networking`;
}

function displayGeneratedCopy(copy) {
    generatedCopy = copy;
    
    const generatedContent = document.getElementById('generatedContent');
    const copyOutput = document.getElementById('copyOutput');
    
    copyOutput.textContent = copy;
    generatedContent.style.display = 'block';
    
    // Scroll to generated content
    generatedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function regenerateCopy() {
    if (userFormData.industry) {
        // Change the tone to get a different variation
        const tones = ['professional', 'conversational', 'inspirational', 'educational', 'authoritative'];
        const currentToneIndex = tones.indexOf(userFormData.tone);
        const newToneIndex = (currentToneIndex + 1) % tones.length;
        
        const newFormData = { ...userFormData, tone: tones[newToneIndex] };
        const newCopy = createAIGeneratedCopy(newFormData);
        displayGeneratedCopy(newCopy);
    }
}

function copyToClipboard() {
    if (!generatedCopy) return;

    navigator.clipboard.writeText(generatedCopy).then(() => {
        // Show success feedback
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(btn => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        });
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback: select text for manual copy
        const copyOutput = document.getElementById('copyOutput');
        if (copyOutput) {
            const range = document.createRange();
            range.selectNode(copyOutput);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    });
}

// Step navigation with click handlers
function setupStepNavigation() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.addEventListener('click', () => {
            const targetStep = index + 1;
            // Ensure currentStep is properly updated when jumping between steps
            currentStep = targetStep;
            currentSubstep = null; // Reset substep when jumping to main steps
            showStep(targetStep);
            console.log(`Jumped to step ${targetStep}, currentStep now: ${currentStep}`);
        });
    });
}

// LinkedIn-specific functions
function populateHashtagSuggestions() {
    try {
        const hashtagContainer = document.getElementById('hashtagSuggestions');
        if (!hashtagContainer) return;

        // Only populate if we have industry data, otherwise skip silently
        if (!userFormData || !userFormData.industry) return;

        const hashtags = industryHashtags[userFormData.industry] || industryHashtags.other || [];
        
        hashtagContainer.innerHTML = hashtags.map(tag => 
            `<span class="hashtag">#${tag}</span>`
        ).join('');
    } catch (error) {
        console.error('Error in populateHashtagSuggestions:', error);
    }
}

function showGeneratedCopy() {
    if (generatedCopy) {
        document.getElementById('modalCopyContent').textContent = generatedCopy;
        document.getElementById('copyModal').style.display = 'block';
    }
}

function closeCopyModal() {
    document.getElementById('copyModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('copyModal');
    if (event.target === modal) {
        closeCopyModal();
    }
});

// Success section functions
function resetFlow() {
    currentStep = 1;
    generatedCopy = '';
    userFormData = {};
    
    // Reset form
    document.getElementById('copyForm').reset();
    
    // Hide generated content
    document.getElementById('generatedContent').style.display = 'none';
    
    // Disable next button on step 2
    document.getElementById('step2Next').disabled = true;
    
    // Show first step
    showStep(1);
    updateProgressBar();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareFeedback() {
    const feedbackText = encodeURIComponent("I just used the AI Merchant Showcase Tool and wanted to share my experience...");
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${feedbackText}`;
    window.open(linkedinUrl, '_blank');
}

// Download Figma template
function downloadFigmaTemplate(event) {
    event.preventDefault();
    
    // Open Google Drive link for Figma template
    const figmaTemplateUrl = 'https://drive.google.com/file/d/1fjJfTsvDPMdMRstr763ljmOXsqfvBFHJ/view?usp=sharing';
    window.open(figmaTemplateUrl, '_blank');
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && currentStep < 5) {
        nextStep();
    } else if (event.key === 'ArrowLeft' && currentStep > 1) {
        prevStep();
    } else if (event.key === 'Escape') {
        closeCopyModal();
    }
});

// Loading states and error handling
function showLoadingState(element, loadingText) {
    const originalText = element.innerHTML;
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
    element.disabled = true;
    return originalText;
}

function hideLoadingState(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Accessibility improvements
function announceStepChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Step ${currentStep} of 4`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced form validation with user feedback
function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e2e8f0';
}

// Auto-save form data to localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById('copyForm'));
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('linkedinCreatorFormData', JSON.stringify(data));
}

function loadFormData() {
    try {
        const saved = localStorage.getItem('linkedinCreatorFormData');
        if (saved) {
            const data = JSON.parse(saved);
            Object.entries(data).forEach(([key, value]) => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = value;
                }
            });
        }
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }
}

// Copy prompt to clipboard
function copyPrompt(promptId) {
    const promptElement = document.getElementById(promptId);
    const promptText = promptElement.textContent;
    
    navigator.clipboard.writeText(promptText).then(() => {
        // Show success feedback
        const button = document.querySelector(`#${promptId}`).nextElementSibling;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy prompt: ', err);
    });
}

// Copy worksheet output to clipboard
function copyWorksheetOutput() {
    const outputElement = document.getElementById('worksheetOutput');
    const innerDiv = outputElement.querySelector('div') || outputElement;
    const outputText = innerDiv.textContent;
    
    if (!outputText || outputText.includes('Fill out the worksheet')) {
        return;
    }
    
    navigator.clipboard.writeText(outputText).then(() => {
        // Show success feedback
        const button = document.getElementById('copyWorksheetBtn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy worksheet output: ', err);
    });
}

// Update worksheet output based on form inputs
function updateWorksheetOutput() {
    const merchantName = document.getElementById('merchantName').value;
    const partnerName = document.getElementById('partnerName').value;
    const featuredStat = document.getElementById('featuredStat').value;
    const featuredUpgrade = document.getElementById('featuredUpgrade').value;
    
    const outputElement = document.getElementById('worksheetOutput');
    const copyButton = document.getElementById('copyWorksheetBtn');
    
    if (merchantName && partnerName && featuredStat && featuredUpgrade) {
        const formattedOutput = `Merchant's name: ${merchantName}
Partner's name: ${partnerName}
Featured stat (pick the best one): ${featuredStat}
Featured upgrade as a result of moving to Shopify: ${featuredUpgrade}`;
        
        const innerDiv = outputElement.querySelector('div') || outputElement;
        innerDiv.textContent = formattedOutput;
        innerDiv.style.textAlign = 'left';
        outputElement.style.textAlign = 'left';
        copyButton.disabled = false;
    } else {
        const innerDiv = outputElement.querySelector('div') || outputElement;
        innerDiv.textContent = 'Fill out the worksheet to generate your formatted answers.';
        innerDiv.style.textAlign = 'left';
        outputElement.style.textAlign = 'left';
        copyButton.disabled = true;
    }
}

// Copy summary worksheet output to clipboard
function copySummaryWorksheetOutput() {
    const outputElement = document.getElementById('summaryWorksheetOutput');
    const innerDiv = outputElement.querySelector('div') || outputElement;
    const outputText = innerDiv.textContent;
    
    if (!outputText || outputText.includes('Fill out the worksheet')) {
        return;
    }
    
    navigator.clipboard.writeText(outputText).then(() => {
        // Show success feedback
        const button = document.getElementById('copySummaryWorksheetBtn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy summary worksheet output: ', err);
    });
}

// Update summary worksheet output based on form inputs
function updateSummaryWorksheetOutput() {
    const brandHighlight = document.getElementById('brandHighlight').value;
    const importantWork = document.getElementById('importantWork').value;
    const shopifyPlatform = document.getElementById('shopifyPlatform').value;
    const partnerExpertise = document.getElementById('partnerExpertise').value;
    const previousPlatform = document.getElementById('previousPlatform').value;
    
    const outputElement = document.getElementById('summaryWorksheetOutput');
    const copyButton = document.getElementById('copySummaryWorksheetBtn');
    
    if (brandHighlight && importantWork && shopifyPlatform && partnerExpertise && previousPlatform) {
        const formattedOutput = `What's the brand you want to highlight? What products do they sell and what do they care about?
${brandHighlight}

What's the single most important thing that you want to convey about the work you did with this brand?
${importantWork}

How did Shopify's platform make this possible?
${shopifyPlatform}

What expertise did you bring as their partner?
${partnerExpertise}

What was their previous platform (if they're comfortable sharing)?
${previousPlatform}`;
        
        const innerDiv = outputElement.querySelector('div') || outputElement;
        innerDiv.textContent = formattedOutput;
        innerDiv.style.textAlign = 'left';
        outputElement.style.textAlign = 'left';
        copyButton.disabled = false;
    } else {
        const innerDiv = outputElement.querySelector('div') || outputElement;
        innerDiv.textContent = 'Fill out the worksheet to generate your formatted answers.';
        innerDiv.style.textAlign = 'left';
        outputElement.style.textAlign = 'left';
        copyButton.disabled = true;
    }
}

// Substep Navigation Functions
function goToSubstep(substepId) {
    try {
        console.log(`goToSubstep called: ${currentSubstep} → ${substepId}, currentStep: ${currentStep}`);
        
        // Hide all step contents
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show the selected substep or main step
        if (substepId === '2') {
            // Going back to main Step 2 overview
            const previousSubstep = currentSubstep;
            currentSubstep = null;
            currentStep = 2; // Ensure we're on step 2
            const step2Element = document.getElementById('step2');
            if (step2Element) {
                step2Element.classList.add('active');
            } else {
                console.warn('Step2 element not found');
            }
            console.log(`Returned to step 2 overview from substep ${previousSubstep}`);
        } else {
            // Going to a specific substep
            const previousSubstep = currentSubstep;
            currentSubstep = substepId;
            const substepElement = document.getElementById('step' + substepId);
            if (substepElement) {
                substepElement.classList.add('active');
            } else {
                console.warn(`Substep element step${substepId} not found`);
            }
            
            // Update current step if needed
            if (substepId.startsWith('2')) {
                currentStep = 2;
            }
            
            console.log(`Navigated to substep ${substepId} from ${previousSubstep}, currentStep: ${currentStep}`);
        }
        
        updateProgressBar();
        updateSubstepIndicators();
        
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error in goToSubstep:', error);
    }
}

function updateSubstepIndicators() {
    try {
        const substepIndicators = document.querySelectorAll('.substep');
        
        // Always show substep indicators and update active states
        substepIndicators.forEach(substep => {
            const substepId = substep.getAttribute('data-substep');
            substep.classList.remove('active');
            
            if (substepId === currentSubstep) {
                substep.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error in updateSubstepIndicators:', error);
    }
}

// FAQ Toggle Functions
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}

// Quote Checker Functions
function checkQuoteLength() {
    const quoteTextarea = document.getElementById('merchantQuote');
    const wordCountEl = document.getElementById('wordCount');
    const statusEl = document.getElementById('quoteStatus');
    
    if (!quoteTextarea || !wordCountEl || !statusEl) return;
    
    const text = quoteTextarea.value;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    // Update counter
    wordCountEl.textContent = wordCount;
    
    // Update status
    statusEl.classList.remove('good', 'error', 'info');
    
    if (wordCount === 0) {
        statusEl.style.display = 'none';
    } else if (wordCount <= 35) {
        statusEl.style.display = 'block';
        statusEl.classList.add('good');
        statusEl.innerHTML = '<i class="fas fa-check-circle"></i> <span>Nice work! This quote will fit in the template.</span>';
    } else {
        statusEl.style.display = 'block';
        statusEl.classList.add('error');
        statusEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <div><strong>Over 35 words</strong><br/>This quote is too long for the template. If it\'s a merchant\'s quote, shorten it with their approval. If it\'s a quote from you as the partner, revise it.</div>';
    }
}

// Updated showStep function to handle substeps
function showStep(step) {
    // Hide all steps and substeps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Reset substep when changing main steps
    if (typeof step === 'number') {
        currentStep = step;  // Update currentStep
        currentSubstep = null;
        
        // Show current step
        document.getElementById(`step${step}`).classList.add('active');
        
        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index + 1 === step) {
                stepEl.classList.add('active');
            } else if (index + 1 < step) {
                stepEl.classList.add('completed');
            }
        });

        // Special handling for different steps
        if (step === 4) {
            populateHashtagSuggestions();
        }
        
        updateProgressBar();  // Update the progress bar
        updateSubstepIndicators();
    }
}

// Debug function to check for missing elements
function checkRequiredElements() {
    const requiredElements = [
        'progressFill',
        'step1', 'step2', 'step2a', 'step2b', 'step2c', 'step2d', 'step2e', 'step3', 'step4', 'step5'
    ];
    
    const missingElements = [];
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            missingElements.push(id);
        }
    });
    
    if (missingElements.length > 0) {
        console.warn('Missing required DOM elements:', missingElements);
    } else {
        console.log('All required navigation elements found');
    }
}

// Debug function to validate and fix navigation state
function validateNavigationState() {
    console.log(`Current navigation state: currentStep=${currentStep}, currentSubstep=${currentSubstep}`);
    
    // Find which step/substep is actually active in the DOM
    const activeSteps = document.querySelectorAll('.step-content.active');
    if (activeSteps.length === 0) {
        console.warn('No active step found in DOM - fixing by showing step 1');
        currentStep = 1;
        currentSubstep = null;
        showStep(1);
        return;
    }
    
    if (activeSteps.length > 1) {
        console.warn('Multiple active steps found - this shouldn\'t happen');
        activeSteps.forEach((step, index) => {
            if (index > 0) step.classList.remove('active');
        });
    }
    
    // Validate that the active step matches our state
    const activeStep = activeSteps[0];
    const activeStepId = activeStep.id;
    
    if (activeStepId.startsWith('step2') && activeStepId !== 'step2') {
        // We're in a substep
        const substepId = activeStepId.replace('step', '');
        if (currentSubstep !== substepId || currentStep !== 2) {
            console.warn(`Navigation state mismatch: DOM shows ${activeStepId}, but state is step=${currentStep}, substep=${currentSubstep}`);
            currentStep = 2;
            currentSubstep = substepId;
            updateProgressBar();
            updateSubstepIndicators();
        }
    } else {
        // We're in a main step
        const stepNumber = parseInt(activeStepId.replace('step', ''));
        if (currentStep !== stepNumber || currentSubstep !== null) {
            console.warn(`Navigation state mismatch: DOM shows ${activeStepId}, but state is step=${currentStep}, substep=${currentSubstep}`);
            currentStep = stepNumber;
            currentSubstep = null;
            updateProgressBar();
            updateSubstepIndicators();
        }
    }
    
    console.log(`Navigation state validated: currentStep=${currentStep}, currentSubstep=${currentSubstep}`);
}

// Make debug functions available globally for testing
window.validateNavigationState = validateNavigationState;
window.checkRequiredElements = checkRequiredElements;

// Initialize form data loading on page load
document.addEventListener('DOMContentLoaded', function() {
    checkRequiredElements();
    // Validate initial navigation state
    setTimeout(() => {
        validateNavigationState();
    }, 100); // Small delay to ensure DOM is fully rendered
    loadFormData();
    
    // Auto-save on form changes (if copyForm exists)
    const form = document.getElementById('copyForm');
    if (form) {
        form.addEventListener('input', saveFormData);
        form.addEventListener('change', saveFormData);
    }
    
    // Set up worksheet listeners
    const worksheetInputs = ['merchantName', 'partnerName', 'featuredStat', 'featuredUpgrade'];
    worksheetInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateWorksheetOutput);
            input.addEventListener('change', updateWorksheetOutput);
            input.addEventListener('input', saveFormData);
            input.addEventListener('change', saveFormData);
        }
    });
    
    // Set up summary worksheet listeners
    const summaryWorksheetInputs = ['brandHighlight', 'importantWork', 'shopifyPlatform', 'partnerExpertise', 'previousPlatform'];
    summaryWorksheetInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateSummaryWorksheetOutput);
            input.addEventListener('change', updateSummaryWorksheetOutput);
            input.addEventListener('input', saveFormData);
            input.addEventListener('change', saveFormData);
        }
    });
    
    // Set up quote checker listener
    const quoteInput = document.getElementById('merchantQuote');
    if (quoteInput) {
        quoteInput.addEventListener('input', checkQuoteLength);
        quoteInput.addEventListener('input', saveFormData);
        quoteInput.addEventListener('change', saveFormData);
    }
});
