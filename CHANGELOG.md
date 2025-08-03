# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-08-02

### Added
- Initial release of pixel-perfect circle and ellipse generator
- Interactive web interface with dark mode theme
- Real-time parameter adjustment with sliders
- Zoom and pan functionality for detailed inspection
- Support for circles (radius 3-100) and ellipses (width/height 3-100)
- Custom quadrant-based pathfinding algorithm
- Python implementation with Pygame visualization
- Comprehensive test suite and utilities

### Features
- Quadrant-based movement system for accurate pixel placement
- Ellipse equation distance minimization: `(x/width)² + (y/height)² = 1`
- Dynamic step calculation based on perimeter approximation
- Interactive grid with customizable zoom levels
- Consistent 20px spacing throughout UI components
- Cross-browser compatibility (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)

### Technical Details
- Pure JavaScript implementation (no dependencies)
- Canvas-based rendering with efficient pixel drawing
- Responsive design with 300px control panel
- Dark theme with high contrast for accessibility
- Mouse wheel zoom (0.1x to 10x range)
- Click-and-drag panning functionality
