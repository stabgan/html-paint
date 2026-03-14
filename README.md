# 🎨 HTML Canvas Paint

A modern, responsive web-based drawing application built with HTML5 Canvas, featuring real-time drawing, color selection, and image saving capabilities.

## ✨ Features

- **Interactive Drawing**: Smooth drawing with mouse and touch support
- **Customizable Tools**: Color picker and adjustable stroke width (1-20px)
- **Image Export**: Save drawings as PNG files to server
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean Bootstrap 5 interface with intuitive controls
- **Real-time Feedback**: Live stroke width display and visual notifications

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| 🌐 **HTML5** | Structure & Canvas API | Latest |
| 🎨 **CSS3** | Styling & Responsive Design | Latest |
| ⚡ **JavaScript (ES6+)** | Interactive functionality | Modern |
| 🅱️ **Bootstrap** | UI Framework | 5.3.0 |
| 🐘 **PHP** | Server-side image saving | 7.4+ |

## 🚀 Getting Started

### Prerequisites
- Web server with PHP support (Apache, Nginx, or local development server)
- Modern web browser with HTML5 Canvas support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stabgan/html-paint.git
   cd html-paint
   ```

2. **Set up web server**
   - Place files in your web server's document root
   - Ensure PHP is enabled and `image/` directory is writable
   
3. **Local development** (optional)
   ```bash
   php -S localhost:8000
   ```

4. **Open in browser**
   Navigate to `http://localhost:8000` or your server URL

## 🎯 Usage

1. **Drawing**: Click and drag on the canvas to draw
2. **Color Selection**: Use the color picker to choose your drawing color
3. **Stroke Width**: Adjust the slider to change line thickness
4. **Save**: Click the "💾 Save" button to export your drawing
5. **Clear**: Click "🗑️ Clear" to start over (with confirmation)

### Mobile Support
- Touch drawing is fully supported on tablets and smartphones
- Responsive design adapts to different screen sizes

## 🔧 Architecture

### Frontend (`script.js`)
- **CanvasPaint Class**: Modern ES6 class-based architecture
- **Event Handling**: Mouse and touch event management
- **Canvas Management**: Drawing operations and state management
- **Error Handling**: Graceful error handling with user notifications

### Backend (`save.php`)
- **Security**: Input validation and sanitization
- **File Management**: Secure filename generation and directory handling
- **Error Handling**: Comprehensive error responses with JSON format

## 🔒 Security Features

- **Input Validation**: Server-side validation of image data format
- **Secure Filenames**: Timestamp and unique ID-based naming
- **Directory Protection**: Controlled file saving location
- **Error Handling**: Secure error messages without information disclosure

## ⚠️ Known Issues

- **Browser Compatibility**: Requires modern browser with Canvas API support
- **File Size**: Large drawings may result in large PNG files
- **Server Storage**: No automatic cleanup of saved images (manual management required)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Kaustabh Ganguly** - [LinkedIn](https://linkedin.com/in/stabgan)

*Created in 2019 as a learning project for DOM manipulation and HTML5 Canvas API*

---

*Built with ❤️ using HTML5 Canvas and modern web technologies*
