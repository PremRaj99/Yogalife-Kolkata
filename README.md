# 🧘‍♀️ Yogalife Kolkata

> **Building the Body | Modifying the Mind | Nourishing the Soul**

**Yogalife Kolkata** is a full-stack web application built for the **Yogalife Kolkata** organization—a center dedicated to holistic wellness, authentic yoga education, Ayurveda, naturopathy, and wellness retreats under the guidance of renowned international yoga gurus and healthcare experts.

---

## ✨ Features & Highlights

### 🎨 Frontend & Design Excellence
* **Framer Motion Animations**: Smooth scroll-triggered reveal animations, staggered entrance sequences, scale pop-ins, backdrop blur modals, and interactive button feedback across all pages.
* **Hero Experience**: Ethereal dark background illustration (`/hero-bg.png`) with ambient floating motion, rotating sacred geometry mandala vectors, and high-contrast typography.
* **Notice Board & Events Hub**: Real-time integration with Google Sheets CSVs (via PapaParse) for announcements and upcoming workshops with an animated registration modal.
* **Holistic Wellness Services**: Showcases for Ayurveda therapies, Naturopathy treatments, Yoga programs, and serene retreat destinations.
* **Multimodal Media Gallery**: Interactive photo gallery and video vlog collection.
* **Contact & Communication**: Working contact form powered by **EmailJS** plus a floating interactive WhatsApp button.

---

## 🛠️ Tech Stack

### Client (Frontend)
* **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Styling**: [TailwindCSS](https://tailwindcss.com/) + [Flowbite React](https://flowbite-react.com/)
* **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
* **Routing**: [React Router DOM v6](https://reactrouter.com/)
* **Data Parsing & Emails**: `papaparse` (CSV feed parsing) + `@emailjs/browser`

### Server (Backend)
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose
* **Utilities**: `dotenv`, `cookie-parser`

---

## 📁 Project Structure

```
Yogalife-Kolkata/
├── api/                   # Backend Express server API routes
│   └── index.js
├── client/                # Vite + React Frontend
│   ├── public/            # Static assets (logos, hero bg, member photos)
│   ├── src/
│   │   ├── components/    # Reusable React UI components
│   │   │   ├── common/    # CTA, AboutMemberCard, HeadingPage
│   │   │   ├── home/      # HeroSection, Ayurveda, Naturopathy, NoticeBoard, Programs, Retreats
│   │   │   └── layout/    # SectionWrapper, Header, Footer
│   │   ├── pages/         # Home, About, Blogs, ContactUs, Gallery, Programs
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── package.json           # Root scripts & backend dependencies
└── README.md              # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18+ recommended)
* **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PremRaj99/Yogalife-Kolkata.git
   cd Yogalife-Kolkata
   ```

2. **Install Root & Server Dependencies**:
   ```bash
   npm install
   ```

3. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

---

## 💻 Running the Application

### Start Development Server

* **Run Client Frontend (Vite Dev Server)**:
  ```bash
  cd client
  npm run dev
  ```
  > App will run at: `http://localhost:5173/`

* **Run Backend API (Nodemon)**:
  ```bash
  npm run dev
  ```

### Build for Production

* **Build Client**:
  ```bash
  cd client
  npm run build
  ```

* **Full Build Script**:
  ```bash
  npm run build
  ```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 👨‍💻 Developed By

**Prem Raj**  
- GitHub: [@premraj99](https://github.com/premraj99)  
- Organization: **Yogalife Kolkata**
