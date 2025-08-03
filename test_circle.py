import math

search_map = {1: [(1,0), (0,-1), (1,-1)], #right, down, right-down
              2: [(0,-1), (-1,0), (-1,-1)], #left, down, left-down
              3: [(0,1), (-1, 0), (-1,1)], #left, up, left-up
              4: [(0,1), (1,0), (1,1)] } #right, up, right-up

class Pixel:
    def __init__(self, pos, radius = 5, head=False):
        self.head = head
        self.pos = pos
        self.radius = radius
        if self.pos[0] >= 0 and self.pos[1] > 0:
            self.quadrant = 1
        elif self.pos[0] > 0 and self.pos[1] <= 0:
            self.quadrant = 2
        elif self.pos[0] <= 0 and self.pos[1] < 0:
            self.quadrant = 3
        elif self.pos[0] < 0 and self.pos[1] >= 0:
            self.quadrant = 4

    def get_next_choices(self):
        candidates = []
        for x, y in search_map[self.quadrant]:
            candidates.append((self.pos[0] + x, self.pos[1] + y))
        return candidates

    def get_next(self):
        choices = self.get_next_choices()
        sq_candidates = [ abs((x**2 + y**2) - self.radius**2) for x, y in choices]
        next_index = sq_candidates.index(min(sq_candidates))
        return choices[next_index]

class Circle:
    def __init__(self, radius):
        self.radius = radius
        self.head = Pixel((0, self.radius))
        self.pixels = self.generate_circle()

    def generate_circle(self):
        pixel_list = [self.head]
        max_steps = 1000  # Prevent infinite loop
        steps = 0
        print(f"Starting circle generation for radius {self.radius}")
        print(f"Starting position: {self.head.pos}, quadrant: {self.head.quadrant}")

        while steps < max_steps:
            last = pixel_list[-1]
            next_pos = last.get_next()
            print(f"Step {steps}: Current pos {last.pos} (Q{last.quadrant}) -> Next pos {next_pos}")

            if next_pos == pixel_list[0].pos:
                print("Returned to starting position!")
                break
            if next_pos in [p.pos for p in pixel_list]:
                print("Revisiting same pixel - breaking to prevent loop")
                break
            pixel_list.append(Pixel(next_pos, self.radius))
            steps += 1

        print(f"Circle generation completed in {steps} steps")
        return [p.pos for p in pixel_list]

