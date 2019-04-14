// プロパティ取得
var PROPERTIES = PropertiesService.getScriptProperties();

//トークンを取得
var LINE_ACCESS_TOKEN = PROPERTIES.getProperty('LINE_ACCESS_TOKEN');//アクセストークンを記入

//ログ出力用にGoogle Docs連携する
var GOOGLE_DOCS_ID = PROPERTIES.getProperty('GOOGLE_DOCS_ID');
var doc = DocumentApp.openById(GOOGLE_DOCS_ID);
//スプレッドシートの設定
var ss = SpreadsheetApp.openById('1drOeQ_jJ6lVKLwOfsZ23bFblG7qkZ7MAD08aqdVBF68');//スプレッドシート名（URL）

function doPost(e) {
  var url
  var reply_token

  try {
    //デバッグのとき
    if (typeof e === "undefined") {
      url = "https://cdn-ak.f.st-hatena.com/images/fotolife/p/purasia8/20190325/20190325121321.jpg"
      Logger.log("[DEBUG] END POINT: %s", url)
    } else {
      Logger.log("[INFO] POSTリクエストが呼び出されました")
      var json = JSON.parse(e.postData.contents);
      var events = json.events;
      events.forEach(
        function (event) {
          if (event.type == "message") {
            //reply(event);
            reply_token = json.events[0].replyToken;
            var messageId = json.events[0].message.id; //送られたメッセージのID
            url = 'https://api.line.me/v2/bot/message/' + messageId + '/content/' //バイナリファイルの画像が取得できるエンドポイント
            Logger.log("LINE END POINT FOUND: %s", url)
          } else if (event.type == "follow") {
            follow(event);
            Logger.log("follow");
            return;
          } else if (event.type == "unfollow") {
            unFollow(event);
            Logger.log("unfollow");
            return;
          }
        }
      );
    }

  } catch (e) {
    Logger.log("Failed: %s", e)
    text = '読み取りができませんでした。'

    doc.getBody().appendParagraph(Logger.getLog())
  }
  doc.getBody().appendParagraph(Logger.getLog())
}
