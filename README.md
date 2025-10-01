# AI Merchant Showcase Tool

A comprehensive web application that guides Shopify partners through creating merchant showcase content using AI prompts and Figma design templates for LinkedIn posting.

## Overview

This tool streamlines the process of creating professional merchant showcase content by:
1. **AI Prompt Generation** - Using intelligent prompts to create compelling merchant stories
2. **Figma Template Integration** - Providing access to professional design templates
3. **LinkedIn Publishing Guidance** - Step-by-step instructions for optimal posting

## Features

### 🤖 AI-Powered Content Generation
- **Title Generation**: Compelling headlines about merchant success stories
- **Summary Creation**: Professional overviews of partner services and merchant outcomes
- **Quote Validation**: 35-word limit checker for merchant testimonials
- **Smart Prompts**: Context-aware AI prompts for ChatGPT and Claude

### 🎨 Professional Design Templates
- Access to Figma templates specifically designed for merchant showcases
- Pre-built layout for title, summary, metrics, quotes, and logos
- Export-ready designs optimized for LinkedIn carousel posts
- Step-by-step Figma instructions for beginners

### 📱 Responsive User Experience
- **Progressive Navigation**: 4-step guided process with substeps
- **Free Navigation**: Click between any steps or substeps
- **Real-Time Validation**: Immediate feedback on quote length and content
- **Auto-Save**: Form data preserved across sessions

### 🔧 Advanced Functionality
- **Copy-to-Clipboard**: One-click copying of generated prompts and content
- **Worksheet Format**: Structured input forms that generate AI-ready text
- **Substep Indicators**: Visual progress tracking within main steps
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties, Light Lavender Theme
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter font family for modern typography
- **Browser APIs**: Clipboard API, Local Storage API

## File Structure

```
├── index.html          # Main HTML structure with all steps and substeps
├── styles.css          # Complete styling with responsive design
├── script.js           # JavaScript functionality and navigation logic
└── README.md          # Project documentation
```

## Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in any modern web browser
3. **Follow** the 4-step process:
   - **Step 1**: Get oriented with the tool
   - **Step 2**: Generate content (Title, Summary, Quote validation)
   - **Step 3**: Use the design template
   - **Step 4**: Post on LinkedIn

## Step-by-Step Process

### Step 1: Get Oriented
- Overview of merchant showcase content creation
- Tool capabilities and guidelines
- Process explanation with clear expectations

### Step 2: Generate Content
**Substep 2A: Write Your Title**
- AI prompt for headline generation based on merchant success
- Worksheet for merchant details, partner name, and key metrics
- Copy-to-clipboard functionality for AI tool input

**Substep 2B: Write Your Summary**  
- AI prompt for professional summary creation
- 5-question worksheet covering merchant details and partner value
- Formatted output for easy copying into AI tools

**Substep 2C: Check Your Quote**
- 35-word limit validation for merchant quotes
- Real-time word count and status feedback
- Guidelines for quote length and approval

### Step 3: Use the Design Template
- Direct access to Figma template
- Instructions for beginners new to Figma
- Content placement guidance for generated materials

### Step 4: Post on LinkedIn
**Action 1: Draft Your Post Caption**
- AI prompt for LinkedIn post caption generation
- 175-character limit guidance
- Copy-to-clipboard functionality

**Action 2: Build Your Post on LinkedIn**
- 7-step numbered instructions for LinkedIn posting
- File upload order and document naming conventions
- Publishing guidance and best practices

### Step 5: Completion
- Success confirmation and celebration
- Start over functionality for new projects

## AI Prompt Templates

The application includes specialized prompts for:

- **Title Generation**: Based on successful merchant case study examples
- **Summary Creation**: Professional, journalist-style writing prompts
- **LinkedIn Captions**: Social media optimized post descriptions

Each prompt is designed to work with popular AI tools like ChatGPT and Claude.

## Customization Options

### Updating AI Prompts
```javascript
// In script.js, modify prompt templates
const titlePrompt = `Your custom prompt here...`;
```

### Styling Modifications  
```css
/* In styles.css, update color scheme */
:root {
    --primary-color: #b19cd9;
    --background-color: #faf9fc;
}
```

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+ 
- ✅ Safari 13+
- ✅ Edge 80+

## Performance Features

- **Efficient Navigation**: Smooth step transitions
- **Local Storage**: Form data persistence
- **Responsive Design**: Mobile-first approach
- **Optimized Assets**: Minimal external dependencies

## Accessibility

- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: High contrast text for readability  
- **Semantic HTML**: Proper heading hierarchy
- **Clear Visual Hierarchy**: Organized layout with consistent styling

## Future Enhancements

- [ ] Integration with live AI APIs
- [ ] Direct Figma template embedding
- [ ] LinkedIn API integration for direct posting
- [ ] Analytics and usage tracking
- [ ] Multiple merchant showcase templates
- [ ] Team collaboration features

## Contributing

This is a standalone web application designed for Shopify partners. To customize:

1. **HTML Structure**: Edit `index.html` to modify content or add sections
2. **Styling**: Update `styles.css` for design changes
3. **Functionality**: Extend `script.js` for new features or navigation updates

## License

This project is available for use by Shopify partners and agencies. Modify and distribute as needed for your merchant showcase requirements.

---

**Built for Shopify partners to showcase merchant success stories on LinkedIn**