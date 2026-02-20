# Security Policy

## Supported Versions

The following versions of PDFX currently receive security updates:

| Version | Supported          |
| ------- | ------------------ |
| latest  | ✅ Yes             |
| < 1.0   | ❌ No (pre-release)|

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

If you discover a security vulnerability in PDFX, please report it responsibly by opening a [GitHub Discussion](https://github.com/akii09/pdfx/discussions) using the **Security** category, or by opening a private security advisory via the GitHub Security tab.

Please include the following in your report:

- A description of the vulnerability and its potential impact
- Step-by-step instructions to reproduce the issue
- Any proof-of-concept code, if applicable
- Your suggested fix, if you have one

## Response Timeline

- **Acknowledgement**: Within 48 hours of receiving your report
- **Initial assessment**: Within 5 business days
- **Fix & disclosure**: We aim to release a patch within 30 days for confirmed vulnerabilities

We will keep you informed throughout the process and credit you in the release notes (unless you prefer to remain anonymous).

## Scope

This policy covers the following:

- `@pdfx/cli` — the PDFX command-line interface
- `@pdfx/ui` — the PDF component library
- `@pdfx/shared` — shared types, schemas, and theme system
- The PDFX documentation site (`apps/www`)

Out of scope:

- Vulnerabilities in third-party dependencies (please report those upstream)
- Issues that require physical access to a user's machine

## Disclosure Policy

We follow a coordinated disclosure model. After a fix is released, we will publish a security advisory on GitHub with details of the vulnerability, its impact, and the fix.

Thank you for helping keep PDFX and its users safe!
