import ShelfPack from '@mapbox/shelf-pack';

export function readBlobAsUrl(blob) {
  return new Promise((resolve, reject) => {
    if (blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (e) => { reject(e); };
      reader.readAsDataURL(blob);
    } else reject('No file has been selected');
  });
}

export function readBlobAsText(buffer) {
  return new Promise((resolve, reject) => {
    if (buffer) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => { reject(e); };
      reader.readAsText(buffer, 'utf-8');
    } else reject('No file has been selected');
  });
}

export function csvToArray(text) {
  let p = ''; let row = ['']; const ret = [row]; let i = 0; let r = 0; let s = !0; let
    l;
  for (l of text) {
    if (l === '"') {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if (l === ',' && s) l = row[++i] = '';
    else if (l === '\n' && s) {
      if (p === '\r') row[i] = row[i].slice(0, -1);
      row = ret[++r] = [l = '']; i = 0;
    } else row[i] += l;
    p = l;
  }
  return ret;
}

/**
 * Core calculation for effect card positions inside page via Shelf Best Height Fit heuristic algorithm
 * @param pageWidth
 * @param pageHeight
 * @param cardSize
 * @return [{ x, y, isPortrait }   ]
 */
export function dimensionSolver(
  {
    pageWidth,
    pageHeight,
    cardWidth,
    cardHeight,
    cardMargins = 0,
  } = {},
) {
  // Initialize the sprite with a width and height..
  const sprite = new ShelfPack(pageWidth, pageHeight);

  const totalPageArea = pageWidth * pageHeight;
  const totalCardArea = cardWidth * cardHeight;
  const maxCardCount = Math.floor(totalPageArea / totalCardArea);

  const cardsData = [];
  for (let i = 0; i < maxCardCount; i++) {
    // Insert 2x of max possible cards horizontally and vertically, the algorithm will choose best fit set from them
    cardsData.push({
      id: `${i}-normal`,
      width: cardWidth,
      height: cardHeight,
    });
    cardsData.push({
      id: `${i}-rotated`,
      width: cardHeight,
      height: cardWidth,
    });
  }

  const cardPositions = sprite.pack(cardsData).map((cardPosition) => ({
    id: cardPosition.id,
    left: cardPosition.x,
    top: cardPosition.y,
    width: cardPosition.w,
    height: cardPosition.h,
    isPortrait: cardPosition.w === cardWidth,
  }));
  return cardPositions;
}

export function pageSizeNameToMM(pageSizeName) {
  // TODO: Add support for other metrics rather than 'mm'
  const sizesMapper = {
    A3: { width: 297, height: 419 },
    'A3.landscape': { width: 420, height: 296 },
    A4: { width: 210, height: 296 },
    'A4.landscape': { width: 297, height: 209 },
    A5: { width: 148, height: 209 },
    'A5.landscape': { width: 210, height: 147 },
    letter: { width: 216, height: 279 },
    'letter.landscape': { width: 280, height: 215 },
    legal: { width: 216, height: 356 },
    'legal.landscape': { width: 357, height: 215 },
  };
  return sizesMapper[pageSizeName];
}

export function log(msg) {
  console.log(msg);
}
export function logError(msg) {
  console.error(msg);
}
