export const Global = {
  name: null,
}

export const BackGround = (x,y,z) => {
  let color = "whitesmoke";
  if (z === 4) {
    if(x<2 && y<2) return color;
    if(x>1 && y>1) return color;
  } else if (z === 6) {
    if(x<2 && y<3) return color;
    if((x>1 && x<4) && y>2) return color;
    if(x>3 && y<3) return color;
  } else {
    if(x<3 && (y<3 || y>5)) return color;
    if((x>2 && x<6) && (y>2 && y<6)) return color;
    if(x>5 && (y<3 || y>5)) return color;
  }
  return 'white';
}

export const IsValidInput = (str, max) => {
  const value = parseInt(str, 10);
  return (value > 0 && value <= max) || (str === '');
}

export const P4x4 = [ ['','','',''],
                      ['','','',''],
                      ['','','',''],
                      ['','','',''] ]

export const P6x6 = [ ['','','','','',''],
                      ['','','','','',''],
                      ['','','','','',''],
                      ['','','','','',''],
                      ['','','','','',''],
                      ['','','','','',''] ]

export const P9x9 = [ ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''],
                      ['','','','','','','','',''] ]

