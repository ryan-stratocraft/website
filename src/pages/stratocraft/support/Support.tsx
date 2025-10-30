import React, { useState } from "react";
import "./support.css";

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    appName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportReasons = [
    "General Inquiry",
    "Bug Report",
    "Feature Request",
    "Account Issue",
    "Subscription / Billing",
    "Data Deletion Request",
    "App Feedback",
    "Partnership Inquiry",
    "Press / Media",
    "Other",
  ];

  const apps = [
    "Oneura - Relax, Sleep & Focus",
    "Oh-i - Dating App",
    "IAC VR Platform",
    "General / All Apps",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Reason: ${formData.reason}
App: ${formData.appName}

Message:
${formData.message}
    `.trim();

    // Create mailto link
    const subject = encodeURIComponent(
      `Support Request: ${formData.reason} - ${formData.appName}`
    );
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:support@strato-craft.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        reason: "",
        appName: "",
        message: "",
      });
    }, 1000);
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.reason &&
    formData.appName &&
    formData.message;

  return (
    <div className="support-container">
      {/* Hero Section */}
      <div className="support-hero">
        <h1>Contact Support</h1>
        <p>We're here to help! Let us know how we can assist you.</p>
      </div>

      {/* Support Form */}
      <div className="support-content">
        <form className="support-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Reason Dropdown */}
          <div className="form-group">
            <label htmlFor="reason">Reason for Contact *</label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a reason --</option>
              {supportReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          {/* App Dropdown */}
          <div className="form-group">
            <label htmlFor="appName">Which App? *</label>
            <select
              id="appName"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select an app --</option>
              {apps.map((app) => (
                <option key={app} value={app}>
                  {app}
                </option>
              ))}
            </select>
          </div>

          {/* Message Textarea */}
          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide as much detail as possible..."
              rows={6}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Opening Email Client..." : "Send Support Request"}
          </button>

          <p className="form-note">
            * Your default email client will open with your support request pre-filled.
            You can review and send it from there.
          </p>
        </form>

        {/* Additional Support Info */}
        <div className="support-info">
          <div className="info-card">
            <h3>📧 Direct Email</h3>
            <p>
              Prefer to email us directly?<br />
              <a href="mailto:support@strato-craft.com">support@strato-craft.com</a>
            </p>
          </div>

          <div className="info-card">
            <h3>⏱️ Response Time</h3>
            <p>
              We typically respond within <strong>24-48 hours</strong> during business days.
              Complex issues may take longer to resolve.
            </p>
          </div>

          <div className="info-card">
            <h3>📍 Company Details</h3>
            <p>
              <strong>STRATO-CRAFT LTD</strong><br />
              Company number 15619171<br />
            </p>
          </div>

          <div className="info-card">
            <h3>🔒 Data Deletion</h3>
            <p>
              Need to delete your account data? Select "Data Deletion Request"
              above, or visit our <a href="/privacy">Privacy Policy</a> for more
              information.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How do I cancel my subscription?</h4>
            <p>
              Subscriptions are managed through the App Store (iOS) or Play Store (Android).
              Go to your device's subscription settings to cancel or manage your subscription.
            </p>
          </div>

          <div className="faq-item">
            <h4>How do I request a refund?</h4>
            <p>
              Refunds are processed by Apple or Google. Contact their support directly
              through your app store account to request a refund.
            </p>
          </div>

          <div className="faq-item">
            <h4>How do I delete my account?</h4>
            <p>
              Select "Data Deletion Request" in the form above, or use the in-app
              account deletion feature available in the app settings.
            </p>
          </div>

          <div className="faq-item">
            <h4>I found a bug. How do I report it?</h4>
            <p>
              Select "Bug Report" above and provide detailed information including:
              device model, OS version, app version, and steps to reproduce the issue.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I suggest a new feature?</h4>
            <p>
              Absolutely! We love hearing from our users. Select "Feature Request"
              above and tell us what you'd like to see in future updates.
            </p>
          </div>

          <div className="faq-item">
            <h4>Are my data and privacy protected?</h4>
            <p>
              Yes! We take your privacy seriously. Read our full{" "}
              <a href="/privacy">Privacy Policy</a> and{" "}
              <a href="/terms">Terms & Conditions</a> for details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;



