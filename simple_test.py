import pygame
import sys

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Circle Visualization")
clock = pygame.time.Clock()

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
LIGHT_GRAY = (200, 200, 200)

# Your circle algorithm
search_map = {1: [(1,0), (0,-1), (1,-1)],
              2: [(0,-1), (-1,0), (-1,-1)],
              3: [(0,1), (-1, 0), (-1,1)],
              4: [(0,1), (1,0), (1,1)] }

class Pixel:
    def __init__(self, pos, width=5, height=5):
        self.pos = pos
        self.width = width
        self.height = height
        if self.pos[0] >= 0 and self.pos[1] > 0:
            self.quadrant = 1
        elif self.pos[0] > 0 and self.pos[1] <= 0:
            self.quadrant = 2
        elif self.pos[0] <= 0 and self.pos[1] < 0:
            self.quadrant = 3
        elif self.pos[0] < 0 and self.pos[1] >= 0:
            self.quadrant = 4

    def get_next(self):
        candidates = []
        for x, y in search_map[self.quadrant]:
            candidates.append((self.pos[0] + x, self.pos[1] + y))

        sq_candidates = [ abs((x/self.width)**2 + (y/self.height)**2 - 1) for x, y in candidates]
        next_index = sq_candidates.index(min(sq_candidates))
        return candidates[next_index]

def generate_shape(width, height):
    pixels = [(0, height)]
    current = Pixel((0, height), width, height)

    # Calculate maximum steps based on ellipse perimeter approximation
    # Ramanujan's approximation: π[3(a+b) - sqrt((3a+b)(a+3b))]
    a, b = width, height
    perimeter_approx = 3.14159 * (3*(a+b) - ((3*a+b)*(a+3*b))**0.5)
    max_steps = max(200, int(perimeter_approx * 2))

    for _ in range(max_steps):
        next_pos = current.get_next()
        if next_pos == pixels[0]:
            break
        if next_pos in pixels:
            break
        pixels.append(next_pos)
        current = Pixel(next_pos, width, height)

    return pixels

def draw_grid(surface, cell_size, center_x, center_y, grid_range):

    for i in range(-grid_range, grid_range + 1):
        x = center_x + i * cell_size
        pygame.draw.line(surface, LIGHT_GRAY, (x, 0), (x, HEIGHT), 1)

    for i in range(-grid_range, grid_range + 1):
        y = center_y + i * cell_size
        pygame.draw.line(surface, LIGHT_GRAY, (0, y), (WIDTH, y), 1)



def main():
    # Choose shape type: 'circle' or 'ellipse'
    shape_type = 'ellipse'  # Change this to 'circle' for circles

    if shape_type == 'circle':
        radius = 50
        pixels = generate_shape(radius, radius)  # Same width and height for circle
    else:  # ellipse
        width = 50
        height = 25  # Different width and height for ellipse
        pixels = generate_shape(width, height)

    print(f'Number of pixels: {len(pixels)}')

    max_coord = max(max(abs(x), abs(y)) for x, y in pixels)
    cell_size = min(WIDTH, HEIGHT) // (2 * max_coord + 4)
    center_x, center_y = WIDTH // 2, HEIGHT // 2

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill(WHITE)

        # Draw grid
        grid_range = max_coord + 2
        draw_grid(screen, cell_size, center_x, center_y, grid_range)

        # Draw shape pixels
        for x, y in pixels:
            screen_x = center_x + x * cell_size
            screen_y = center_y - y * cell_size

            rect = pygame.Rect(screen_x, screen_y, cell_size, cell_size)
            pygame.draw.rect(screen, BLACK, rect)

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
