/* 友達追加されたらユーザーIDを登録する */
function follow(e) {
  var sheet = ss.getSheetByName(MAINSHEET); //シートを取得する
  sheet.appendRow([e.source.userId]); //ユーザーIDをシートに追加する
}

/* アンフォローされたら削除する */
function unFollow(e) {
  var sheet = ss.getSheetByName(MAINSHEET); //シートを取得する
  var result = findRow(sheet, e.source.userId, 1);
  if (result > 0) {
    sheet.deleteRows(result);
  }
}

function findRow(sheet, val, col) {
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][col - 1] === val) {
      return i + 1;
    }
  }
  return 0;
}
