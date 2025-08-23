import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function PrivacyPolicy() {
   const navigate = useNavigate();

   const styles = {
      navbar: {
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
         padding: "20px",
         background: "transparent",
      },
      logo: {
         fontSize: "24px",
         color: "white",
      },
      loginButton: {
         background: "#1CA990",
         border: "none",
         color: "white",
         padding: "0px 20px",
         fontFamily: "'Poppins', sans-serif",
      },
   };

   return (
      <div
         style={{
            background: "radial-gradient(circle, #0D2E35, #0A171B)",
            minHeight: "100vh",
            padding: 0,
            fontFamily: "'Poppins', sans-serif",
         }}
      >
         <nav style={styles.navbar}>
            <div style={styles.logo}>
               <img
                  width={130}
                  src={logo}
                  alt="example"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  alignItems: "center",
               }}
            >
               <li
                  style={{
                     color: "white",
                     listStyle: "none",
                     cursor: "pointer",
                     transition: "0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                     (e.currentTarget.style.color = "#1CA990")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                  onClick={() => navigate("/")}
               >
                  Home
               </li>
               <Button
                  style={styles.loginButton}
                  onClick={() => navigate("/login")}
                  onMouseEnter={(e) =>
                     (e.currentTarget.style.background = "#137C6A")
                  }
                  onMouseLeave={(e) =>
                     (e.currentTarget.style.background = "#1CA990")
                  }
               >
                  Login
               </Button>
            </div>
         </nav>
         <div
            className="leading-[32px]"
            style={{
               padding: "2rem",
               color: "white",
               maxWidth: 900,
               margin: "0 auto",
            }}
         >
            <h1
               style={{
                  color: "#ff7a01",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  marginBottom: "0.5rem",
               }}
            >
               Privacy Policy
            </h1>

            <p
               style={{
                  color: "#22c5a8",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
               }}
            >
               <strong>Effective Date: 1 June, 2025</strong>
            </p>

            <p
               style={{
                  color: "#22c5a8",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
               }}
            >
               <strong>Last Updated: 09 July, 2025</strong>
            </p>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               1. Introduction
            </h2>
            <p style={{ color: "#fff" }}>
               Welcome to Papu AI. Your privacy is paramount to us. This Privacy
               Policy outlines how Papu AI ("we", "our", or "us") collects,
               uses, and safeguards your personal information when you interact
               with our tool. By accessing or using our website and services,
               you agree to the terms of this Privacy Policy.
            </p>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               2. Information We Collect
            </h2>
            <p style={{ color: "#fff" }}>
               We may collect the following types of information:
            </p>
            <ul style={{ color: "#fff" }}>
               <li>
                  <strong>Personal Identification Information:</strong> Name,
                  email address, job title, and organization.
               </li>
               <li>
                  <strong>Usage Data:</strong> Information on how you interact
                  with our website, including IP address, browser type, and
                  pages visited.
               </li>
               <li>
                  <strong>Uploaded Content:</strong> Data files and research
                  questions you submit for analysis.
               </li>
               <li>
                  <strong>Communication Data:</strong> Feedback, inquiries, or
                  other communications you send to us.
               </li>
            </ul>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               3. How We Collect Information
            </h2>
            <p>Information is collected through:</p>
            <ul>
               <li>
                  <strong>Direct Interactions:</strong> When you register,
                  upload data, or communicate with us.
               </li>
               <li>
                  <strong>Automated Technologies:</strong> Cookies and similar
                  technologies that track website usage.
               </li>
               <li>
                  <strong>Third-Party Sources:</strong> Publicly available
                  sources or third-party platforms, with your consent.
               </li>
            </ul>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               4. Use of Information
            </h2>
            <p>We use your information to:</p>
            <ul>
               <li>Provide and maintain our services.</li>
               <li>Process and analyze uploaded data.</li>
               <li>
                  Communicate with you, including responding to inquiries and
                  providing updates.
               </li>
               <li>Enhance user experience and improve our services.</li>
               <li>Comply with legal obligations.</li>
            </ul>
            <h3>4.1 Data Storage</h3>
            <p>
               We securely store your data using modern encryption and security
               standards:
            </p>
            <ul>
               <li>
                  Uploaded data is encrypted during transfer (HTTPS) and at
                  rest.
               </li>
               <li>Access is restricted to authorized personnel only.</li>
               <li>
                  We store your data only as long as necessary for the purposes
                  outlined in this policy, or as required by law.
               </li>
            </ul>
            <p>
               If you request deletion of your account or data, we will remove
               it from our systems within a reasonable time frame.
            </p>
            <h3>4.2 Marketing</h3>
            <p>With your consent, we may send you emails about:</p>
            <ul>
               <li>Product updates</li>
               <li>New features</li>
               <li>Research tips and resources</li>
               <li>Promotional offers</li>
            </ul>
            <p>
               You can opt out of receiving marketing emails at any time by
               clicking the "unsubscribe" link in our emails or contacting us at{" "}
               <a href="mailto:ali@veracious.ai" style={{ color: "#1CA990" }}>
                  ali@veracious.ai
               </a>
            </p>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               5. Data Sharing and Disclosure
            </h2>
            <p>
               We do not sell your personal information. We may share data with:
            </p>
            <ul>
               <li>
                  <strong>Service Providers:</strong> Third parties who assist
                  in operating our services, under confidentiality agreements.
               </li>
               <li>
                  <strong>Legal Obligations:</strong> When required by law or to
                  protect our rights.
               </li>
               <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or asset sale.
               </li>
            </ul>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               6. Data Security
            </h2>
            <p>
               We implement appropriate technical and organizational measures to
               protect your data, including:
            </p>
            <ul>
               <li>Encryption of data in transit and at rest.</li>
               <li>Regular security assessments.</li>
               <li>
                  Access controls to limit data access to authorized personnel.
               </li>
            </ul>
            <h3>6.1 Data Retention</h3>
            <p>
               We retain personal data only as long as necessary to fulfill the
               purposes outlined in this policy, unless a longer retention
               period is required by law.
            </p>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               7. Cookies and Tracking Technologies
            </h2>
            <p>Papu AI uses cookies and similar tracking technologies to:</p>
            <ul>
               <li>Enhance and personalize your browsing experience.</li>
               <li>
                  Analyze usage patterns to improve site functionality and
                  performance.
               </li>
               <li>Remember your preferences for future visits.</li>
            </ul>
            <p>
               You can choose to disable cookies through your browser settings,
               but some features of our site may not function as intended.
            </p>
            <h2
               style={{
                  color: "#1ca990",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
               }}
            >
               Contact Us
            </h2>
            <p>
               For questions or concerns regarding this Privacy Policy, please
               contact:
            </p>
            <p>
               <strong>Papu AI Privacy Team</strong>
            </p>
            <p>
               Email:{" "}
               <a href="mailto:ali@veracious.ai" style={{ color: "#1CA990" }}>
                  ali@veracious.ai
               </a>
            </p>
         </div>
      </div>
   );
}
