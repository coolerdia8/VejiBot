//リプライ
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
      events.forEach(function (event) {
        if (event.type == "message") {
          //reply(event);
          reply_token = json.events[0].replyToken;
          var messageId = json.events[0].message.id; //送られたメッセージのID
          url = 'https://api.line.me/v2/bot/message/' + messageId + '/content/';//バイナリファイルの画像が取得できるエンドポイント
          Logger.log("LINE END POINT FOUND: %s", url)
        } else if (event.type == "follow") {
          follow(event);
          Logger.log("follow");
          return;
        } else if (event.type == "unfollow") {
          unFollow(event);
          Logger.log("follow");
          return;
        }
      });
    }

    //IDとメッセージ取得
    var UID = json.events[0].source.userId;
    var com = json.events[0].message.text;

    //クイズの処理
    /*
    switch (String(com)) {
      case ASAGOHAN_ZUMI:  //「リッチメニューより        　
        ss.getRange(ASAGOHAN_CELL).setValue(FIN);
        PersonCheck(UID, ASAGOHAN_PERSON_CELL);
        postRonLine('うまかったぜ', reply_token);
        break;

      case SANPOZUMI:
        ss.getRange(SANPO_CELL).setValue(FIN);
        PersonCheck(UID, SANPO_PERSON_CELL);
        postRonLine('ごくろう、誉めて遣わす', reply_token);
        break;

      case YURUGOHAN_ZUMI:
        ss.getRange(YURUGOHAN_CELL).setValue(FIN);
        PersonCheck(UID, YORUGOHAN_PERSON_CELL);
        postRonLine('デザートはないんか？', reply_token);
        break;

      case RENTODAY:
        //配列文字列をjoinで結合する
        var str = [
          ss.getRange('A1').getValue(), '→', ss.getRange('B1').getValue(), '：', ss.getRange('C1').getValue(), '\n',
          ss.getRange('A2').getValue(), '→', ss.getRange('B2').getValue(), '：', ss.getRange('C2').getValue(), '\n',
          ss.getRange('A3').getValue(), '→', ss.getRange('B3').getValue(), '：', ss.getRange('C3').getValue()
        ];
        

        reply_messages = str.join('');
        //全部済みなら画像を追加で送る
        if (ss.getRange('B1').getValue() == FIN && ss.getRange('B2').getValue() == FIN && ss.getRange('B3').getValue() == FIN) {
          var num_pictues = ss.getRange('G1').getValue();
          var pic_cell = getrawcellname(num_pictues, 'F');
          var pic_url = get_pic_url(ss, pic_cell);
          postALLOKRenLine(reply_messages, pic_url, reply_token);
          break;
        }
        
        
        postRonLine(reply_messages, reply_token);
        break;

      case RESSET:
        DailyReset();
        postRonLine('リセットしたぞ', reply_token);
        break;

      default://それ以外
      //何もしない
    }
    */
    doc.getBody().appendParagraph(Logger.getLog())
    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    Logger.log("doPost: %s", e)
    console.log("doPost: %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
}

function postALLOKRenLine(text, Purl, reply_token) {
  /*
  * LINEにテキストと画像を返します
  * @param{String}:
  */
  try {
    var messages = [
      {
        "type": "text",
        "text": text
      },
      {
        "type": "image",
        "originalContentUrl": Purl,
        "previewImageUrl": Purl
      }
    ]
    //返信設定
    var Rurl = 'https://api.line.me/v2/bot/message/reply';

    var res = UrlFetchApp.fetch(Rurl, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': messages,
      }),
    });
  } catch (e) {
    Logger.log("Error at function postLine(text,reply_token): %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
}

function postRonLine(text, reply_token) {
  /*
  * LINEにテキストを返します
  * @param{String}: 文字起こししたテキスト
  */
  try {
    var messages = [
      {
        "type": "text",
        "text": text
      }
    ]
    //返信設定
    var Rurl = 'https://api.line.me/v2/bot/message/reply';

    var res = UrlFetchApp.fetch(Rurl, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': messages,
      }),
    });
  } catch (e) {
    Logger.log("Error at function postLine(text,reply_token): %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
}
