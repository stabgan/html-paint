(function () {
    "use strict";

    const canvas = document.getElementById("myCan");
    const ctx = canvas.getContext("2d");
    const outputImg = document.getElementById("canvasout");
    const penColor = document.getElementById("pen-color");
    const penWidth = document.getElementById("pen-width");
    const widthDisplay = document.getElementById("width-display");

    // --- State ---
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let drawColor = penColor.value;
    let drawWidth = Number(penWidth.value);
    const undoStack = [];
    const MAX_UNDO = 20;

    // --- Canvas sizing ---
    function resizeCanvas() {
        // Save current drawing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const container = canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        const displayWidth = Math.floor(rect.width);
        const displayHeight = 500;

        canvas.style.width = displayWidth + "px";
        canvas.style.height = displayHeight + "px";
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        ctx.scale(dpr, dpr);

        // Restore drawing
        ctx.putImageData(imageData, 0, 0);

        // Re-apply defaults
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }

    // --- Coordinate helpers ---
    function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: (clientX - rect.left) * scaleX / (window.devicePixelRatio || 1),
            y: (clientY - rect.top) * scaleY / (window.devicePixelRatio || 1),
        };
    }

    // --- Undo support ---
    function saveState() {
        if (undoStack.length >= MAX_UNDO) {
            undoStack.shift();
        }
        undoStack.push(canvas.toDataURL());
    }

    function undo() {
        if (undoStack.length === 0) return;
        const prev = undoStack.pop();
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = prev;
    }

    // --- Drawing ---
    function startDraw(e) {
        e.preventDefault();
        saveState();
        isDrawing = true;
        const pos = getPointerPos(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function moveDraw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPointerPos(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDraw() {
        isDrawing = false;
    }

    // --- Mouse events ---
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", moveDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    // --- Touch events ---
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", moveDraw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    canvas.addEventListener("touchcancel", stopDraw);

    // --- Toolbar ---
    penColor.addEventListener("input", function () {
        drawColor = penColor.value;
    });

    penWidth.addEventListener("input", function () {
        drawWidth = Number(penWidth.value);
        widthDisplay.textContent = drawWidth;
    });

    document.getElementById("xsave").addEventListener("click", function () {
        const dataURL = canvas.toDataURL("image/png");
        outputImg.src = dataURL;
        outputImg.style.display = "inline";

        // Client-side download
        const link = document.createElement("a");
        link.download = "painting.png";
        link.href = dataURL;
        link.click();
    });

    document.getElementById("xclear").addEventListener("click", function () {
        if (confirm("Clear the canvas?")) {
            saveState();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            outputImg.style.display = "none";
        }
    });

    document.getElementById("xundo").addEventListener("click", undo);

    // --- Keyboard shortcut ---
    document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
            e.preventDefault();
            undo();
        }
    });

    // --- Init ---
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
})();
