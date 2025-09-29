# DBTGuide - Scholarship Scheme for SC Students

## Project Overview
A static, responsive multilingual webapp for India's "Scholarship Scheme for SC Students" with Direct Benefit Transfer (DBT) guidance. Built with HTML/CSS/JS only, featuring multilingual content, interactive learning flows, and administrative tools.

## Architecture
- **Frontend**: Static HTML/CSS/JS with government branding
- **Internationalization**: JSON-based i18n system (English/Hindi)
- **Static Server**: Python HTTP server on port 5000
- **Data**: JSON files in `/data/` and `/i18n/` directories

## Features
- **Multilingual Interface**: English/Hindi with localStorage persistence
- **Interactive Learning Flows**: Step-by-step Aadhaar→DBT seeding guides
- **Video Tutorials**: Language-specific educational content
- **Community Outreach**: Document library with preview/download
- **Quiz System**: Knowledge testing with scoring
- **Chatbot**: Multilingual help assistant
- **Admin Panel**: SMS campaigns and dashboard metrics

## Technical Stack
- HTML5/CSS3/JavaScript (ES6+)
- Government of India design standards
- CSS Grid responsive layout
- Accessibility features (ARIA, semantic HTML)
- Client-side routing and state management

## Development Setup
The project runs on a Python HTTP server serving static files:
- Server: Python 3 built-in HTTP server
- Port: 5000 (configured for Replit environment)
- Host: 0.0.0.0 (allows external access)

## File Structure
```
├── index.html              # Home page
├── admin.html             # Administrator panel
├── community.html         # Community outreach
├── know-difference.html   # Knowledge base
├── procedure-guide.html   # Interactive guide
├── quiz.html             # Quiz system
├── videos.html           # Video tutorials
├── css/                  # Stylesheets
├── js/                   # JavaScript modules
├── i18n/                 # Translation files
├── data/                 # Static data files
└── replit.md            # Project documentation
```

## Deployment Status
- ✅ Static server running on port 5000
- ✅ All features functional
- ✅ Multilingual support active
- ✅ Responsive design verified
- ✅ Government branding applied
- ✅ Production deployment configured

## Recent Setup
- **Date**: September 29, 2025
- **Action**: GitHub import successfully configured for Replit environment
- **Status**: Production ready and deployment configured
- **Deployment**: Autoscale configuration set for static website

## User Preferences
- Language: English (default)
- Theme: Government of India official colors
- Layout: Responsive grid system