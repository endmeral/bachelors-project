export interface Equation {
  name: string;
  title: string;
  equation: string;
  description: string;
}

export const equations: Equation[] = [
  {
    name: 'butterfly',
    title: 'Butterfly Curve',
    equation: 'x = sin(t) * (e^cos(t) - 2 * cos(4t) - sin^5(t/12))\n' +
              'y = cos(t) * (e^cos(t) - 2 * cos(4t) - sin^5(t/12))',
    description: 'The Butterfly Curve is a famous parametric curve in mathematics.',
  },
  {
    name: 'benfords',
    title: "Benford's Law",
    equation: 'P(d) = log10(1 + 1/d), where d = 1, 2, ..., 9',
    description: "Benford's Law describes the distribution of leading digits in many real-life data sets.",
  },
  {
    name: 'polarRose',
    title: 'Polar Rose',
    equation: 'r = cos(k * θ)',
    description: 'A polar rose is a type of curve that resembles a flower with k petals.',
  },
  // Add more equations as needed
];
