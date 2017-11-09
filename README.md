# MeanStarter

## Work in progress

[![Build Status](https://travis-ci.org/Nucleus-Inc/MeanStarter.svg?branch=master)](https://travis-ci.org/Nucleus-Inc/MeanStarter)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Mean Stack starter template with useful modules and features required for most applications

### Boilerplate Features

#### Authentication Strategies
- [x] Local Session
- [x] JWT
- [ ] Facebook
- [ ] Google

#### Authentication Features
- [x] Sign Up
- [x] Account Activation
- [x] Password Strength validation (zxcvbn)
- [x] Password Update
- [x] Password Recovery
- [x] Email update with verification
- [x] Phone number update with verification

#### API Features
- [x] Restful Approach
- [x] API Docs
- [x] Params and Body validation
- [x] Log requests that led to internal errors
- [ ] Store sessions in database
- [x] Enforce Code Style
- [x] Specs

#### API Performance
- [ ] Logging done correctly
- [ ] Exceptions handled correctly
- [ ] Only Asynchronous functions
- [ ] Gzip Compression

#### API Security
- [x] Helmet - Protect app from HTTP headers vulnerabilities
- [ ] Secure Cookies
- [ ] Requests Rate Limiting
- [ ] Csurf - Avoid cross-site request forgery (CSRF)
- [ ] Sanitize user input to protect against cross-site scripting (XSS) and command injection attacks
- [ ] Safe Regex - Protect app from regular expression denial of service attack
- [ ] Ensure Dependencies are Secure
- [ ] Sanitize Mongo input to avoid Mongo script injection
- [ ] Avoid DOS exploit where users can manually trigger bad request errors that shut down your app
