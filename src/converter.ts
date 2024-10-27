export class KoreanEnglishConverter {
    private static ENG_KEY = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
    private static KOR_KEY = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
    private static CHO_DATA = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    private static JUNG_DATA = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    private static JONG_DATA = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
  
    public static engTypeToKor(src: string): string {
      let res = "";
      if (src.length == 0) return res;
  
      let nCho = -1, nJung = -1, nJong = -1;
  
      for (let i = 0; i < src.length; i++) {
        let ch = src.charAt(i);
        let p = KoreanEnglishConverter.ENG_KEY.indexOf(ch);
        if (p == -1) {
          if (nCho != -1) {
            if (nJung != -1)
              res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
            else
              res += KoreanEnglishConverter.CHO_DATA.charAt(nCho);
          } else {
            if (nJung != -1)
              res += KoreanEnglishConverter.JUNG_DATA.charAt(nJung);
            else if (nJong != -1)
              res += KoreanEnglishConverter.JONG_DATA.charAt(nJong);
          }
          nCho = -1;
          nJung = -1;
          nJong = -1;
          res += ch;
        } else if (p < 19) {
          if (nJung != -1) {
            if (nCho == -1) {
              res += KoreanEnglishConverter.JUNG_DATA.charAt(nJung);
              nJung = -1;
              nCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
            } else {
              if (nJong == -1) {
                nJong = KoreanEnglishConverter.JONG_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
                if (nJong == -1) {
                  res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
                  nCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
                  nJung = -1;
                }
              } else if (nJong == 0 && p == 9) {
                nJong = 2;
              } else if (nJong == 3 && p == 12) {
                nJong = 4;
              } else if (nJong == 3 && p == 18) {
                nJong = 5;
              } else if (nJong == 7 && p == 0) {
                nJong = 8;
              } else if (nJong == 7 && p == 6) {
                nJong = 9;
              } else if (nJong == 7 && p == 7) {
                nJong = 10;
              } else if (nJong == 7 && p == 9) {
                nJong = 11;
              } else if (nJong == 7 && p == 16) {
                nJong = 12;
              } else if (nJong == 7 && p == 17) {
                nJong = 13;
              } else if (nJong == 7 && p == 18) {
                nJong = 14;
              } else if (nJong == 16 && p == 9) {
                nJong = 17;
              } else {
                res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
                nCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
                nJung = -1;
                nJong = -1;
              }
            }
          } else {
            if (nCho == -1) {
              if (nJong != -1) {
                res += KoreanEnglishConverter.JONG_DATA.charAt(nJong);
                nJong = -1;
              }
              nCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
            } else if (nCho == 0 && p == 9) {
              nCho = -1;
              nJong = 2;
            } else if (nCho == 2 && p == 12) {
              nCho = -1;
              nJong = 4;
            } else if (nCho == 2 && p == 18) {
              nCho = -1;
              nJong = 5;
            } else if (nCho == 5 && p == 0) {
              nCho = -1;
              nJong = 8;
            } else if (nCho == 5 && p == 6) {
              nCho = -1;
              nJong = 9;
            } else if (nCho == 5 && p == 7) {
              nCho = -1;
              nJong = 10;
            } else if (nCho == 5 && p == 9) {
              nCho = -1;
              nJong = 11;
            } else if (nCho == 5 && p == 16) {
              nCho = -1;
              nJong = 12;
            } else if (nCho == 5 && p == 17) {
              nCho = -1;
              nJong = 13;
            } else if (nCho == 5 && p == 18) {
              nCho = -1;
              nJong = 14;
            } else if (nCho == 7 && p == 9) {
              nCho = -1;
              nJong = 17;
            } else {
              res += KoreanEnglishConverter.CHO_DATA.charAt(nCho);
              nCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
            }
          }
        } else {
          if (nJong != -1) {
            let newCho: number;
            if (nJong == 2) {
              nJong = 0;
              newCho = 9;
            } else if (nJong == 4) {
              nJong = 3;
              newCho = 12;
            } else if (nJong == 5) {
              nJong = 3;
              newCho = 18;
            } else if (nJong == 8) {
              nJong = 7;
              newCho = 0;
            } else if (nJong == 9) {
              nJong = 7;
              newCho = 6;
            } else if (nJong == 10) {
              nJong = 7;
              newCho = 7;
            } else if (nJong == 11) {
              nJong = 7;
              newCho = 9;
            } else if (nJong == 12) {
              nJong = 7;
              newCho = 16;
            } else if (nJong == 13) {
              nJong = 7;
              newCho = 17;
            } else if (nJong == 14) {
              nJong = 7;
              newCho = 18;
            } else if (nJong == 17) {
              nJong = 16;
              newCho = 9;
            } else {
              newCho = KoreanEnglishConverter.CHO_DATA.indexOf(KoreanEnglishConverter.JONG_DATA.charAt(nJong));
              nJong = -1;
            }
            if (nCho != -1)
              res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
            else
              res += KoreanEnglishConverter.JONG_DATA.charAt(nJong);
  
            nCho = newCho;
            nJung = -1;
            nJong = -1;
          }
          if (nJung == -1) {
            nJung = KoreanEnglishConverter.JUNG_DATA.indexOf(KoreanEnglishConverter.KOR_KEY.charAt(p));
          } else if (nJung == 8 && p == 19) {
            nJung = 9;
          } else if (nJung == 8 && p == 20) {
            nJung = 10;
          } else if (nJung == 8 && p == 32) {
            nJung = 11;
          } else if (nJung == 13 && p == 23) {
            nJung = 14;
          } else if (nJung == 13 && p == 24) {
            nJung = 15;
          } else if (nJung == 13 && p == 32) {
            nJung = 16;
          } else if (nJung == 18 && p == 32) {
            nJung = 19;
          } else {
            if (nCho != -1) {
              res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
              nCho = -1;
            } else
              res += KoreanEnglishConverter.JUNG_DATA.charAt(nJung);
            nJung = -1;
            res += KoreanEnglishConverter.KOR_KEY.charAt(p);
          }
        }
      }
  
      if (nCho != -1) {
        if (nJung != -1)
          res += KoreanEnglishConverter.makeHangul(nCho, nJung, nJong);
        else
          res += KoreanEnglishConverter.CHO_DATA.charAt(nCho);
      } else {
        if (nJung != -1)
          res += KoreanEnglishConverter.JUNG_DATA.charAt(nJung);
        else {
          if (nJong != -1)
            res += KoreanEnglishConverter.JONG_DATA.charAt(nJong);
        }
      }
  
      return res;
    }
  
    public static korTypeToEng(src: string): string {
      let res = "";
      if (src.length == 0) return res;
  
      for (let i = 0; i < src.length; i++) {
        let ch = src.charAt(i);
        let nCode = ch.charCodeAt(0);
        let nCho = KoreanEnglishConverter.CHO_DATA.indexOf(ch), nJung = KoreanEnglishConverter.JUNG_DATA.indexOf(ch), nJong = KoreanEnglishConverter.JONG_DATA.indexOf(ch);
        let arrKeyIndex = [-1, -1, -1, -1, -1];
  
        if (0xac00 <= nCode && nCode <= 0xd7a3) {
          nCode -= 0xac00;
          arrKeyIndex[0] = Math.floor(nCode / (21 * 28));
          arrKeyIndex[1] = Math.floor(nCode / 28) % 21;
          arrKeyIndex[3] = nCode % 28 - 1;
        } else if (nCho != -1)
          arrKeyIndex[0] = nCho;
        else if (nJung != -1)
          arrKeyIndex[1] = nJung;
        else if (nJong != -1)
          arrKeyIndex[3] = nJong;
        else
          res += ch;
  
        if (arrKeyIndex[1] != -1) {
          if (arrKeyIndex[1] == 9) {
            arrKeyIndex[1] = 27;
            arrKeyIndex[2] = 19;
          } else if (arrKeyIndex[1] == 10) {
            arrKeyIndex[1] = 27;
            arrKeyIndex[2] = 20;
          } else if (arrKeyIndex[1] == 11) {
            arrKeyIndex[1] = 27;
            arrKeyIndex[2] = 32;
          } else if (arrKeyIndex[1] == 14) {
            arrKeyIndex[1] = 29;
            arrKeyIndex[2] = 23;
          } else if (arrKeyIndex[1] == 15) {
            arrKeyIndex[1] = 29;
            arrKeyIndex[2] = 24;
          } else if (arrKeyIndex[1] == 16) {
            arrKeyIndex[1] = 29;
            arrKeyIndex[2] = 32;
          } else if (arrKeyIndex[1] == 19) {
            arrKeyIndex[1] = 31;
            arrKeyIndex[2] = 32;
          } else {
            arrKeyIndex[1] = KoreanEnglishConverter.KOR_KEY.indexOf(KoreanEnglishConverter.JUNG_DATA.charAt(arrKeyIndex[1]));
            arrKeyIndex[2] = -1;
          }
        }
        if (arrKeyIndex[3] != -1) {
          if (arrKeyIndex[3] == 2) {
            arrKeyIndex[3] = 0;
            arrKeyIndex[4] = 9;
          } else if (arrKeyIndex[3] == 4) {
            arrKeyIndex[3] = 2;
            arrKeyIndex[4] = 12;
          } else if (arrKeyIndex[3] == 5) {
            arrKeyIndex[3] = 2;
            arrKeyIndex[4] = 18;
          } else if (arrKeyIndex[3] == 8) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 0;
          } else if (arrKeyIndex[3] == 9) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 6;
          } else if (arrKeyIndex[3] == 10) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 7;
          } else if (arrKeyIndex[3] == 11) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 9;
          } else if (arrKeyIndex[3] == 12) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 16;
          } else if (arrKeyIndex[3] == 13) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 17;
          } else if (arrKeyIndex[3] == 14) {
            arrKeyIndex[3] = 5;
            arrKeyIndex[4] = 18;
          } else if (arrKeyIndex[3] == 17) {
            arrKeyIndex[3] = 7;
            arrKeyIndex[4] = 9;
          } else {
            arrKeyIndex[3] = KoreanEnglishConverter.KOR_KEY.indexOf(KoreanEnglishConverter.JONG_DATA.charAt(arrKeyIndex[3]));
            arrKeyIndex[4] = -1;
          }
        }
  
        for (let j = 0; j < 5; j++) {
          if (arrKeyIndex[j] != -1)
            res += KoreanEnglishConverter.ENG_KEY.charAt(arrKeyIndex[j]);
        }
      }
  
      return res;
    }
  
    private static makeHangul(nCho: number, nJung: number, nJong: number): string {
      return String.fromCharCode(0xac00 + nCho * 21 * 28 + nJung * 28 + nJong + 1);
    }
  }