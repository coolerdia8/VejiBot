function serifu_shori(text, user_name) {
  //キャラの名前をユーザ名にする
  try {
    var retext;
    if (text.match(KAKAROTO)) {
      //KAKAROTOとユーザー名を置換する
      retext = text.replace(KAKAROTO, user_name)
    } else if (text.match(TRUNKS)) {
      retext = text.replace(TRUNKS, user_name)
    } else if (text.match(GOHAN)) {
      retext = text.replace(GOHAN, user_name)
    } else if (text.match(NAPPA)) {
      retext = text.replace(NAPPA, user_name)
    } else {
      //break;
    }

    return retext;
  } catch (e) {
    Logger.log("Error at function serifu_shori: %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
  return text;
}
