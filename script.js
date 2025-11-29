let colors;
fetch("colours.json")
.then((res) => res.text())
.then((text) => {
    colors = JSON.parse(text);
});

function download() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].rgb = hexToRgb(colors[i].value);
    }
    downloadFile(JSON.stringify(colors));
}

const colorInput = document.getElementById('picker');
const resultText = document.getElementById('result1');
let currentCol = "000000";

colorInput.addEventListener('input', (event) => {
    currentCol = event.target.value;
    resultText.innerText = `Текущий цвет: ${findClosestBatch(currentCol)}`;
});

function findClosestBatch(colorHex) {
    let target = hexToRgb(colorHex);

    let resultColor = "";
    let lastDist = Infinity;

    for(let i = 0; i < colors.length; i++) {
        currentDist = compareColors(target, colors[i].rgb);
        if (currentDist == 0) {
            return colors[i].name; 
        }

        if (currentDist < lastDist) {
            console.log(colors[i].name);
            resultColor = colors[i].name;
            lastDist = currentDist;
        }
    }
    return resultColor;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ]
}

function compareColors(col1, col2) {
    return (
        (col1[0]-col2[0])**2 + (col1[1]-col2[1])**2 + (col1[2]-col2[2])**2
    );
}

const downloadFile = (content) => {
    const link = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "newcolours.json";
    link.click();
    URL.revokeObjectURL(link.href);
};
