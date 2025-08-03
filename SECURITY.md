# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT** open a public issue
2. Email the maintainer directly (if contact info is available)
3. Or use GitHub's private security advisory feature

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

We will respond to security reports within 48 hours and provide regular updates on the resolution process.

## Security Considerations

This is a client-side JavaScript application that:
- Runs entirely in the browser
- Does not collect or transmit user data
- Does not require server connectivity
- Uses only standard web APIs (Canvas, DOM events)

The main security considerations are:
- **XSS Prevention**: All user inputs are numeric sliders with defined ranges
- **Resource Usage**: Large parameter values may impact browser performance
- **Local Execution**: No remote code execution or data transmission occurs
