import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center px-3">
      <div className="card shadow-lg p-5 rounded-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-3 text-primary fw-bold">Welcome to QuickChat</h1>
        <p className="text-muted fs-5">
          A real-time chat application that allows users to communicate instantly and securely.
        </p>
        <p className="text-muted mb-4">Please log in or register to continue.</p>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <Link to="/login" className="btn btn-outline-primary px-4">
            Log In
          </Link>
          <Link to="/register" className="btn btn-primary px-4">
            Register
          </Link>
        </div>

        {/* Contact Me Section */}
        <div className="border-top pt-4 mt-3">
          <h6 className="text-dark">Contact Me</h6>
          <p className="mb-1">
            <a
              href="https://www.linkedin.com/in/malleswaran-p-25b9962a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary"
            >
              <i className="bi bi-linkedin me-2"></i>LinkedIn
            </a>
          </p>
          <p className="text-muted">
            <i className="bi bi-envelope-fill me-2"></i> pmalleshwaran14@gmail.com
          </p>
        </div>
      </div>

      <footer className="text-muted small mt-4">
        <p>© {new Date().getFullYear()} QuickChat All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Landing;
