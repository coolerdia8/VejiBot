function PushVejiMessage() {
  //毎日誰か一人にランダムで選んだセリフを通知する
  try {
    var serifu_db = [];//セリフと画像
    var userinfo = [];
    var sheetV = ss.getSheetByName(VEGISHEET);//シートを取得する
    const get_arrayV = sheetV.getRange('A:A').getValues();
    const num_serifus = get_arrayV.filter(String).length;
    var random_numV = (Math.floor(Math.random() * num_serifus) + 1)

    var sheetM = ss.getSheetByName(MAINSHEET);//シートを取得する
    const get_arrayM = sheetM.getRange('A:A').getValues();
    const num_users = get_arrayM.filter(String).length;
    var random_numM = (Math.floor(Math.random() * num_users) + 1)
    //Logger.log("random_numM:%s", random_numM)
    var gettext = sheetV.getRange('A' + random_numV).getValue();//A*のテキストを取得

    userinfo[0] = sheetM.getRange('A' + random_numM).getValue();//userID
    userinfo[1] = sheetM.getRange('B' + random_numM).getValue();//username

    serifu_db[0] = serifu_shori(gettext, userinfo[1]);
    serifu_db[1] = sheetV.getRange('B' + random_numV).getValue();

    var postdata = MakeBaseMessage(userinfo[0], serifu_db[0], serifu_db[1]);//写真とテキストのデータ
    PushMessageMain(postdata);

    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    Logger.log("Error at function PushVejiMessage: %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
}

function PushMessageMain(data) {
  //メイン
  try {
    var url = "https://api.line.me/v2/bot/message/push";
    var headers = {
      "Content-Type": "application/json;charset=UTF-8",
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
    };

    var options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(data)
    };
    var response = UrlFetchApp.fetch(url, options);

  } catch (e) {
    Logger.log("Error at function pushMessageBase: %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
  //doc.getBody().appendParagraph(Logger.getLog())
}

function MakeBaseMessage(user_id, text, Purl) {
  //deleteTrigger();
  var postData = {
    "to": user_id,
    "messages": [{
      "type": "image",
      "originalContentUrl": Purl,
      "previewImageUrl": Purl
    },
    {
      "type": "text",
      "text": text,
    }]
  };
  return postData;
}

function PushMuti() {

  try {
    var sheet = ss.getSheetByName(MAINSHEET);
    const get_array = sheet.getRange('A:A').getValues();//IDを取得
    //const num_pictues = get_array.filter(String).length;
    var id_array = dropNullItemFromArray(get_array)

    var userlist = []; //型を整えるためにuserlistを作成し値を詰める
    for (var i = 0; i < id_array.length; i++) {
      userlist.push(id_array[i][0]);
    }
    pic_url = "https://cdn-ak.f.st-hatena.com/images/fotolife/p/purasia8/20190329/20190329072915.jpg"//get_pic_url(sheet, getrawcellvalue(num_pictues, 'F'));
    var Tedata = MakeMutiMessage(userlist, pic_url);
    var url = "https://api.line.me/v2/bot/message/multicast";
    var headers = {
      "Content-Type": "application/json;charset=UTF-8",
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
    };

    var options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(Tedata)
    };
    var response = UrlFetchApp.fetch(url, options);

  } catch (e) {
    Logger.log("Error at function PushMuti: %s", e)
    //console.log("Error at function PushMuti: %s", e)
    doc.getBody().appendParagraph(Logger.getLog())
  }
}

function MakeMutiMessage(array, Purl) {
  var postData = {
    "to": array,//全員のUSER_ID,
    "messages": [{
      "type": "text",
      "text": "ベジータだ!!"
    },
    {
      "type": "image",
      "originalContentUrl": Purl,
      "previewImageUrl": Purl
    }
    ]
  };
  return postData;
}
