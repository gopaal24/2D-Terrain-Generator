class TerrainType {
  constructor(minHeight, maxHeight, minColor, maxColor, lerpAdjustment = 0) {
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.minColor = minColor;
    this.maxColor = maxColor;
    this.lerpAdjustment = lerpAdjustment;
  }
}

let waterMap;
let sandMap;
let grassMap;
let treeMap;

let zoomFactor = 200;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noiseDetail(9, 0.5)
  waterMap = new TerrainType(
    0.2,
    0.4,
    color(30, 176, 251),
    color(40, 255, 255)
  );
  sandMap = new TerrainType(
    0.4,
    0.5,
    color(215, 192, 158),
    color(255, 246, 193)
  );
  grassMap = new TerrainType(
    0.5,
    0.7,
    color(2, 166, 155),
    color(118, 239, 124)
  );
  treeMap = new TerrainType(
    0.7,
    0.75,
    color(22, 181, 141),
    color(10, 145, 113)
  );
  noLoop();
}

function draw() {
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      const noiseValue = noise(x / zoomFactor, y / zoomFactor);
      let terrainColor;
      if(noiseValue < waterMap.maxHeight) terrainColor = getTerrainColor(noiseValue, waterMap)
      else if(noiseValue < sandMap.maxHeight) terrainColor = getTerrainColor(noiseValue, sandMap)
      else if(noiseValue < grassMap.maxHeight) terrainColor = getTerrainColor(noiseValue, grassMap)
      else terrainColor = getTerrainColor(noiseValue, treeMap)
      set(x, y, terrainColor);
    }
  }
  updatePixels();
}

function getTerrainColor(noiseValue, terrainMap) {
  const normalized_value = normalize(
    noiseValue,
    terrainMap.minHeight,
    terrainMap.maxHeight
  );

  return lerpColor(
    terrainMap.minColor,
    terrainMap.maxColor,
    normalized_value + terrainMap.lerpAdjustment
  );
}

function normalize(value, minHeight, maxHeight) {
  if (value < minHeight) return 0;
  if (value > maxHeight) return 1;
  return (value - minHeight) / (maxHeight - minHeight);
}
