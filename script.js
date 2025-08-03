class PixelAlgorithm {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.zoom = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.pixels = [];

        this.searchMap = {
            1: [[1,0], [0,-1], [1,-1]], // right, down, right-down
            2: [[0,-1], [-1,0], [-1,-1]], // left, down, left-down
            3: [[0,1], [-1,0], [-1,1]], // left, up, left-up
            4: [[0,1], [1,0], [1,1]] // right, up, right-up
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateShape();
        this.draw();
    }

    setupEventListeners() {
        // Shape type radio buttons
        document.querySelectorAll('input[name="shape"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.toggleShapeParams();
                this.generateShape();
                this.draw();
            });
        });

        // Parameter sliders with real-time updates
        const sliders = ['radius', 'width', 'height'];
        sliders.forEach(param => {
            const slider = document.getElementById(param);
            const valueSpan = document.getElementById(param + '-value');

            if (slider) {
                slider.addEventListener('input', (e) => {
                    valueSpan.textContent = e.target.value;
                    this.generateShape();
                    this.draw();
                });
            }
        });

        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateShape();
            this.draw();
        });

        // Canvas mouse events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.handleWheel.bind(this));

        // Prevent context menu
        this.canvas.addEventListener('contextmenu', e => e.preventDefault());
    }

    toggleShapeParams() {
        const shapeType = document.querySelector('input[name="shape"]:checked').value;
        const circleParams = document.getElementById('circle-params');
        const ellipseParams = document.getElementById('ellipse-params');

        if (shapeType === 'circle') {
            circleParams.style.display = 'block';
            ellipseParams.style.display = 'none';
        } else {
            circleParams.style.display = 'none';
            ellipseParams.style.display = 'block';
        }
    }

    getQuadrant(x, y) {
        if (x >= 0 && y > 0) return 1;
        if (x > 0 && y <= 0) return 2;
        if (x <= 0 && y < 0) return 3;
        if (x < 0 && y >= 0) return 4;
        return 1; // fallback
    }

    getNextPixel(currentPos, width, height) {
        const [x, y] = currentPos;
        const quadrant = this.getQuadrant(x, y);
        const candidates = [];

        // Get candidate positions based on quadrant
        for (const [dx, dy] of this.searchMap[quadrant]) {
            candidates.push([x + dx, y + dy]);
        }

        // Calculate distances using ellipse equation: (x/width)² + (y/height)² = 1
        const distances = candidates.map(([cx, cy]) => {
            return Math.abs((cx/width)**2 + (cy/height)**2 - 1);
        });

        // Find the candidate with minimum distance
        const minIndex = distances.indexOf(Math.min(...distances));
        return candidates[minIndex];
    }

    generateShape() {
        const shapeType = document.querySelector('input[name="shape"]:checked').value;
        let width, height;

        if (shapeType === 'circle') {
            const radius = parseInt(document.getElementById('radius').value);
            width = height = radius;
        } else {
            width = parseInt(document.getElementById('width').value);
            height = parseInt(document.getElementById('height').value);
        }

        // Start at the top of the shape
        this.pixels = [[0, height]];
        let currentPos = [0, height];

        // Calculate maximum steps based on perimeter approximation
        const perimeterApprox = Math.PI * (3*(width + height) - Math.sqrt((3*width + height)*(width + 3*height)));
        const maxSteps = Math.max(200, Math.floor(perimeterApprox * 2));

        for (let step = 0; step < maxSteps; step++) {
            const nextPos = this.getNextPixel(currentPos, width, height);

            // Check if we've returned to start
            if (nextPos[0] === this.pixels[0][0] && nextPos[1] === this.pixels[0][1]) {
                break;
            }

            // Check if we've visited this pixel before (avoid loops)
            const alreadyVisited = this.pixels.some(([px, py]) => px === nextPos[0] && py === nextPos[1]);
            if (alreadyVisited) {
                break;
            }

            this.pixels.push(nextPos);
            currentPos = nextPos;
        }

        // Update pixel count display
        document.getElementById('pixel-count').textContent = this.pixels.length;
    }

    draw() {
        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save context for transformations
        ctx.save();

        // Apply zoom and pan transformations
        ctx.translate(canvas.width/2 + this.offsetX, canvas.height/2 + this.offsetY);
        ctx.scale(this.zoom, this.zoom);

        // Calculate grid parameters
        const maxCoord = Math.max(...this.pixels.map(([x, y]) => Math.max(Math.abs(x), Math.abs(y))));
        const cellSize = Math.max(8, Math.min(canvas.width, canvas.height) / (2 * maxCoord + 4) / this.zoom);

        // Draw grid
        this.drawGrid(ctx, cellSize, maxCoord + 2);

        // Draw shape pixels
        this.drawPixels(ctx, cellSize);

        // Restore context
        ctx.restore();

        // Update zoom level display
        document.getElementById('zoom-level').textContent = this.zoom.toFixed(1) + 'x';
    }

    drawGrid(ctx, cellSize, gridRange) {
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;

        // Draw vertical lines
        for (let i = -gridRange; i <= gridRange; i++) {
            const x = i * cellSize;
            ctx.beginPath();
            ctx.moveTo(x, -gridRange * cellSize);
            ctx.lineTo(x, gridRange * cellSize);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let i = -gridRange; i <= gridRange; i++) {
            const y = i * cellSize;
            ctx.beginPath();
            ctx.moveTo(-gridRange * cellSize, y);
            ctx.lineTo(gridRange * cellSize, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(-gridRange * cellSize, 0);
        ctx.lineTo(gridRange * cellSize, 0);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(0, -gridRange * cellSize);
        ctx.lineTo(0, gridRange * cellSize);
        ctx.stroke();
    }

    drawPixels(ctx, cellSize) {
        this.pixels.forEach(([x, y], index) => {
            const screenX = x * cellSize;
            const screenY = -y * cellSize; // Flip Y axis for screen coordinates

            // All pixels are the same color now
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(screenX, screenY, cellSize, cellSize);

            // Draw border
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(screenX, screenY, cellSize, cellSize);
        });
    }

    // Mouse event handlers
    handleMouseDown(e) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.canvas.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (this.isDragging) {
            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;

            this.offsetX += deltaX;
            this.offsetY += deltaY;

            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;

            this.draw();
        }
    }

    handleMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }

    handleWheel(e) {
        e.preventDefault();

        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = this.zoom * zoomFactor;

        // Limit zoom range
        if (newZoom >= 0.1 && newZoom <= 10) {
            this.zoom = newZoom;
            this.draw();
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PixelAlgorithm();
});
