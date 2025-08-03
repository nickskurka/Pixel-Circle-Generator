# Pixel-Perfect Circle and Ellipse Generator

A basic application that implements an algorithm for generating pixel-accurate circles and ellipses on a discrete grid, minimizing deviation from their ideal mathematical forms.

## Features

- 🎯 **Pixel-Perfect Algorithms**: Custom quadrant-based pathfinding for accurate circle and ellipse generation
- 🔄 **Real-Time Updates**: Parameters update shapes instantly as you adjust sliders
- 🖱️ **Interactive Grid**: Zoom and pan functionality with mouse controls
- 🎨 **Dark Mode Interface**: Modern, eye-friendly design
- 📐 **Flexible Parameters**: Support for circles (radius 3-100) and ellipses (width/height 3-100)

## Applications

This algorithm is useful for:
- **Pixel Art**: Creating perfect circular and elliptical shapes
- **Procedural Content Generation**: Generating structures in games like Minecraft
- **Scalable Raster Graphics**: Consistent shape rendering at different scales
- **Geometric Visualization**: Educational tools for understanding discrete geometry

## Demo

![Screenshot](screenshot.png)

## Getting Started

### Prerequisites

- Modern web browser with JavaScript support
- No additional dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pixel-perfect-shapes.git
cd pixel-perfect-shapes
```

2. Open `index.html` in your web browser

That's it! No build process or server setup required.

## Usage

1. **Choose Shape Type**: Select between Circle or Ellipse using radio buttons
2. **Adjust Parameters**: 
   - For circles: Use the radius slider (3-100)
   - For ellipses: Set width and height independently (3-100 each)
3. **Interactive Controls**:
   - Mouse wheel: Zoom in/out
   - Click and drag: Pan around the canvas
   - Sliders: Real-time shape updates

## Algorithm

The algorithm uses a creative quadrant-based approach:

1. **Quadrant Division**: Divides the coordinate plane into 4 quadrants
2. **Direction Mapping**: Each quadrant has specific movement directions
3. **Distance Minimization**: Chooses the next pixel that minimizes deviation from the ideal mathematical curve
4. **Ellipse Equation**: Uses `(x/width)² + (y/height)² = 1` for shape validation

### Key Differences from Traditional Algorithms

Unlike Bresenham's circle algorithm, this approach:
- Uses pathfinding rather than mathematical increments
- Supports ellipses natively without separate algorithms
- Provides consistent results across different scales
- Offers creative flexibility in shape generation

## File Structure

```
├── index.html          # Main application page
├── style.css           # Dark mode styling
├── script.js           # Core algorithm and UI logic
├── main.py             # Python implementation (Pygame)
├── simple_test.py      # Simplified Python version
└── test_circle.py      # Algorithm testing utilities
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic rasterization algorithms
- Built with vanilla JavaScript for maximum compatibility
- Dark mode design for developer-friendly usage
