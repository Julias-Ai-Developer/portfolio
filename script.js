// Simple Contact Form Email Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // METHOD 1: Using EmailJS (Recommended)
        sendWithEmailJS(formData);
    });

    // METHOD 1: EmailJS Integration
    function sendWithEmailJS(data) {
        // EmailJS is already initialized with your public key: Mx-h_kVnUG6sFfkmU
        // Just replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual values
        
        const serviceID = 'service_es1712h'; // Replace with your EmailJS service ID
        const templateID = 'template_hg58gj9'; // Replace with your EmailJS template ID

        // Send email with your template variables
        emailjs.send(serviceID, templateID, {
            name: data.name,        // {{name}} in your template
            title: data.subject,    // {{title}} in your template  
            email: data.email,      // {{email}} in your template
            phone: data.phone,      // Optional: if you want to include phone
            message: data.message,  // Optional: if you want to include the full message
            to_email: data.email    // This sends the email TO the person who filled the form
        })
        .then(function(response) {
            showSuccess('Message sent successfully!');
            form.reset();
        })
        .catch(function(error) {
            showError('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            resetSubmitButton();
        });
    }

    // METHOD 2: Formspree Integration
    function sendWithFormspree(data) {
        // Sign up at formspree.io and get your form endpoint
        const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint

        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                showSuccess('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            showError('Failed to send message. Please try again.');
            console.error('Formspree error:', error);
        })
        .finally(() => {
            resetSubmitButton();
        });
    }

    // METHOD 3: Mailto (Basic fallback - opens email client)
    function sendWithMailto(data) {
        const recipient = 'your-email@example.com'; // Replace with your email
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone}\n` +
            `Subject: ${data.subject}\n\n` +
            `Message:\n${data.message}`
        );
        
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        showSuccess('Email client opened. Please send the email to complete your message.');
        resetSubmitButton();
    }

    // Helper functions
    function showSuccess(message) {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            padding: 12px;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            margin: 10px 0;
        `;
        alertDiv.textContent = message;
        form.insertBefore(alertDiv, form.firstChild);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }

    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            background-color: #f8d7da;
            color: #721c24;
            padding: 12px;
            border: 1px solid #f5c6cb;
            border-radius: 5px;
            margin: 10px 0;
        `;
        alertDiv.textContent = message;
        form.insertBefore(alertDiv, form.firstChild);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }

    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

/* 
SETUP INSTRUCTIONS FOR YOUR KAMATRUST AI EMAIL TEMPLATE:

✅ EmailJS Public Key Already Set: Mx-h_kVnUG6sFfkmU

REMAINING STEPS:
1. In your EmailJS dashboard, note your SERVICE_ID and TEMPLATE_ID
2. Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID in the script above
3. Make sure your EmailJS template is set up with these variables:
   - {{name}} for the person's name
   - {{title}} for their subject/request  
   - {{email}} for their email address
   - Set "To Email" field to {{to_email}} in EmailJS template settings

Your EmailJS template should look like this:
---
Subject: Thank you for contacting KamaTrust AI

Body:
Hi {{name}},

Thank you for reaching out to **CEO KamaTrust AI**. We're excited to connect with forward-thinking individuals like you.

We've received your request: "{{title}}" and our intelligent support team is reviewing it. Expect a response within **3 business days** as we evaluate how our AI-driven solutions can best assist your needs.

If needed, we may follow up via {{email}} for more details.

Best regards,
The **KamaTrust AI Team**

You can also reach Us here for more: www.kamatrustai.com
---

IMPORTANT: 
- Your public key is already configured ✅
- Just need SERVICE_ID and TEMPLATE_ID from your EmailJS dashboard
- Make sure "To Email" in EmailJS template is set to {{to_email}}
*/