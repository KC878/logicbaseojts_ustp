

const now = new Date();
export const formattedDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
}).format(now);

console.log(formattedDate);  // Outputs: "March 13, 2025"