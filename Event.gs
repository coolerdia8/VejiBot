/* 友達追加されたらユーザーIDとユーザー名を登録する */
function follow(e) {
  var sheet = ss.getSheetByName(MAINSHEET);//シートを取得する
  var user_id = e.source.userId;
  var user_name = getUserDisplayName(user_id);
  sheet.appendRow([user_id, user_name]); //A列にユーザーID,B列にユーザー名を追加する
  //sheet.getRange('B1').setValue(user_name);
  return;
}

/** ユーザーのアカウント名を取得。
 *
 * @param user_id ユーザーのID
 *
 * @return アカウント名
 */
function getUserDisplayName(user_id) {
  var line_endpoint_profile = 'https://api.line.me/v2/bot/profile';
  var res = UrlFetchApp.fetch(line_endpoint_profile + '/' + user_id, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
    },
    'method': 'get',
  });
  return JSON.parse(res).displayName;
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
