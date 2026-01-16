# Portfolio Website - Complete Source Code

## 📁 Project Structure

```
portfolio-source/
├── index.html                 # Main HTML file (EDIT LOGO HERE)
├── css/
│   └── style.css             # All CSS styling
├── js/
│   ├── script-fixed.js       # Main JavaScript (scroll navigation, animations)
│   └── advanced-360-viewer.js # 360° panoramic viewer functionality
├── 360-images/               # Folder for 360° panoramic images
├── assets/                   # Folder for images, logos, and other assets
└── README.md                 # This file
```

---

## 🎨 LOGO EDITING GUIDE

### ⚠️ IMPORTANT: Logo Locations

Your website has **TWO LOGO LOCATIONS** that need to be edited together:

#### **Location 1: Intro Animation Logo** (Lines 24-52 in index.html)
This is the large logo shown during the intro animation.

#### **Location 2: Navbar Logo** (Lines 68-97 in index.html)
This is the small logo in the top-left corner.

**Both use the same SVG code**, so edit both for consistency.

---

## 🎯 Quick Start - Local Editing

### Step 1: Extract Files
- Unzip this folder to your PC

### Step 2: Edit the Logo
1. Open `index.html` with a text editor (VS Code, Sublime Text, Notepad++, etc.)
2. Find the SVG logo code (lines 24-52 and 68-97)
3. Modify the colors:
   - **Dark Navy:** `#021140` → Change to your color
   - **Light Beige:** `#efebe3` → Change to your color

### Step 3: Test Locally
1. Open `index.html` in your web browser
2. See your changes in real-time
3. Adjust colors, sizes, and positions as needed

### Step 4: Deploy
- Send the updated `index.html` back to me
- I'll integrate and deploy the updated website

---

## 🎨 SVG Color Reference

### Current Colors:
| Element | Current Color | Hex Code |
|---------|---------------|----------|
| Frame & Background | Dark Navy | `#021140` |
| Person & Details | Light Beige | `#efebe3` |

### How to Change Colors:

**Find and Replace Method:**
1. Find: `stroke="#021140"` → Replace with: `stroke="#YOUR_HEX_COLOR"`
2. Find: `fill="#021140"` → Replace with: `fill="#YOUR_HEX_COLOR"`
3. Find: `fill="#efebe3"` → Replace with: `fill="#YOUR_HEX_COLOR"`

---

## 📝 SVG Elements Explanation

The logo is made of SVG elements:

| Element | Purpose | Example |
|---------|---------|---------|
| `<rect>` | Rectangle (window frame) | `<rect x="100" y="80" width="300" height="340" fill="#021140"/>` |
| `<circle>` | Circle (head, light bulb) | `<circle cx="180" cy="220" r="20" fill="#efebe3"/>` |
| `<line>` | Line (hanging light, legs) | `<line x1="250" y1="120" x2="250" y2="180" stroke="#efebe3"/>` |

**Key Attributes:**
- `fill`: Interior color
- `stroke`: Border/line color
- `stroke-width`: Line thickness
- `x`, `y`: Position
- `width`, `height`: Size
- `r`: Radius (for circles)

---

## 🎬 Project Sections

The website has 5 main slides:

1. **Home** - Landing page with your name and intro
2. **Museum** - Interactive Museum Experience project
3. **Mall** - Modern Village Mall Environment project
4. **Personal** - Architectural Visualization project
5. **About** - About section

---

## 🖼️ Adding Your Own Images

### Project Thumbnails:
- Replace images in `assets/` folder:
  - `museum-reference.jpg` → Your museum project image
  - `mall-reference.jpg` → Your mall project image
  - `360-reference.jpg` → Your personal project image

### 360° Panoramic Images:
- Add your 360° images to the `360-images/` folder
- Update the file paths in `js/advanced-360-viewer.js`

---

## 🌐 File Descriptions

### index.html
- Contains all HTML structure
- **Logo is embedded as SVG** (lines 24-52 and 68-97)
- Project slides and content
- Navigation menu

### css/style.css
- Dark theme styling
- Color palette: `#4A4E69`, `#22223B`, `#C9ADA7`, `#F2E9E4`
- Typography: Fugaz One + Work Sans
- Animations and transitions
- Responsive design

### js/script-fixed.js
- Single-page scrolling navigation
- Intro animation logic
- Menu toggle functionality
- Slide transitions

### js/advanced-360-viewer.js
- 360° panoramic viewer using Three.js
- Handles mouse/touch interactions
- Zoom and rotation controls

---

## 🎨 Color Palette Reference

| Color | Hex Code | Usage |
|-------|----------|-------|
| Background | `#4A4E69` | Main background |
| Dark Accent | `#22223B` | Darker elements |
| Main Accent | `#C9ADA7` | Highlights, accents |
| Text | `#F2E9E4` | Main text color |

---

## 📱 Responsive Design

The website is fully responsive:
- **Desktop:** Full single-page scrolling experience
- **Tablet:** Optimized layout with adjusted spacing
- **Mobile:** Stacked layout with touch-friendly navigation

---

## 🚀 Deployment

Once you've edited the files locally:

1. **Prepare your files:**
   - Make sure all changes are saved
   - Test in your browser one more time

2. **Send back to me:**
   - Provide the updated `index.html`
   - Include any new images/assets if you've added them

3. **I'll deploy:**
   - Upload to the hosting server
   - Test on the live domain
   - Confirm everything works

---

## 🛠️ Customization Tips

### Change Logo Size:
In `css/style.css`, find:
```css
.intro-logo-img {
    width: 180px;
    height: 180px;
}
```
Change `180px` to your desired size.

### Change Logo Animation:
In `css/style.css`, find:
```css
.intro-logo {
    animation: logoFloat 3s ease-in-out infinite;
}
```
Adjust the timing (3s) or animation name.

### Change Project Titles:
In `index.html`, find the project sections and edit:
```html
<h2 class="project-title">Your New Title</h2>
```

---

## 📧 Questions?

If you need help:
1. Check the LOGO_LOCATION_GUIDE.md file
2. Review the SVG elements in the HTML
3. Test changes in your browser
4. Send me the updated files when ready

---

## ✅ Checklist Before Sending Back

- [ ] Logo colors changed to your preference
- [ ] Tested in web browser locally
- [ ] All file paths are correct
- [ ] Project content updated (if needed)
- [ ] Images added (if needed)
- [ ] Ready to deploy

---

Good luck with your portfolio! 🎨✨
