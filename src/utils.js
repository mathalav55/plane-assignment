export const generateColors = (length) => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    // Generate HSL color
    const hue = (i * 360) / length; // Evenly distribute hues
    const saturation = 70; // Fixed saturation
    const lightness = 50; // Fixed lightness
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};
