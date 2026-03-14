// Modern HTML Canvas Paint Application
class CanvasPaint {
    constructor() {
        this.canvas = document.getElementById('myCan');
        this.ctx = this.canvas.getContext('2d');
        this.outputCanvas = document.getElementById('canvasout');
        this.penColor = document.getElementById('pen-color');
        this.penWidth = document.getElementById('pen-width');
        this.widthDisplay = document.getElementById('width-display');
        
        this.mouse = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.isDrawing = false;
        this.drawColor = '#000000';
        this.drawWidth = 5;
        
        this.init();
    }
    
    init() {
        // Set canvas size responsively
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize drawing settings
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        console.log('Canvas Paint initialized');
    }
    
    resizeCanvas() {
        const maxWidth = Math.min(window.innerWidth - 40, 800);
        const maxHeight = Math.min(window.innerHeight - 400, 400);
        
        this.canvas.width = maxWidth;
        this.canvas.height = maxHeight;
        
        // Redraw settings after resize
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }
    
    setupEventListeners() {
        // Color and width controls
        this.penColor.addEventListener('change', () => this.updateColor());
        this.penWidth.addEventListener('input', () => this.updateWidth());
        
        // Buttons
        document.getElementById('xsave').addEventListener('click', () => this.saveCanvas());
        document.getElementById('xclear').addEventListener('click', () => this.clearCanvas());
        
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseout', () => this.handleMouseUp());
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleMouseUp());
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    getTouchPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    
    handleMouseMove(e) {
        this.lastMouse = { ...this.mouse };
        this.mouse = this.getMousePos(e);
        
        if (this.isDrawing) {
            this.draw();
        }
    }
    
    handleMouseDown(e) {
        this.isDrawing = true;
        this.mouse = this.getMousePos(e);
        this.lastMouse = { ...this.mouse };
        this.canvas.style.cursor = 'crosshair';
    }
    
    handleMouseUp() {
        this.isDrawing = false;
        this.canvas.style.cursor = 'crosshair';
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        this.isDrawing = true;
        this.mouse = this.getTouchPos(e);
        this.lastMouse = { ...this.mouse };
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (this.isDrawing) {
            this.lastMouse = { ...this.mouse };
            this.mouse = this.getTouchPos(e);
            this.draw();
        }
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastMouse.x, this.lastMouse.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = this.drawColor;
        this.ctx.lineWidth = this.drawWidth;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    
    updateColor() {
        this.drawColor = this.penColor.value;
    }
    
    updateWidth() {
        this.drawWidth = this.penWidth.value;
        this.widthDisplay.textContent = this.drawWidth;
    }
    
    async saveCanvas() {
        try {
            const dataURL = this.canvas.toDataURL('image/png');
            this.outputCanvas.src = dataURL;
            this.outputCanvas.style.display = 'block';
            
            // Send to server
            const response = await fetch('save.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `basedata=${encodeURIComponent(dataURL)}`
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('Image saved successfully:', result.path);
                this.showNotification('Image saved successfully!', 'success');
            } else {
                throw new Error(result.error || 'Failed to save image');
            }
        } catch (error) {
            console.error('Save error:', error);
            this.showNotification('Failed to save image: ' + error.message, 'error');
        }
    }
    
    clearCanvas() {
        if (confirm('Clear the canvas? This action cannot be undone.')) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.outputCanvas.style.display = 'none';
            this.showNotification('Canvas cleared', 'info');
        }
    }
    
    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 1000; min-width: 250px;';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CanvasPaint();
});