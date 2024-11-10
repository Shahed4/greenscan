// render-predictions.js

// Array to store unique display names globally so it persists across function calls
export const uniqueDisplayNames = []; // Exported for use in other files
let addingAllowed = true; // Controls whether items can be added

// Function to render predictions
export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Set font options
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";
    const isNotPerson = prediction.class !== "person";

    // Add to uniqueDisplayNames only if adding is allowed
    if(isNotPerson){
    if (addingAllowed && !uniqueDisplayNames.includes(prediction.class)) {
      uniqueDisplayNames.push(prediction.class);
    }
  }

    // Draw bounding box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw semi-transparent fill
    ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);

    // Draw label background
    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // Draw text label
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x + 2, y + 2);
  });

  // Log the array of unique display names
  console.log("Unique Display Names:", uniqueDisplayNames);
};

// Function to stop adding items when button is clicked
export const stopAddingItems = () => {
  addingAllowed = false;
};

// Create and add button to the DOM
const button = document.createElement("button");
button.innerText = "Stop Adding Items";
button.onclick = stopAddingItems;
document.body.appendChild(button);
