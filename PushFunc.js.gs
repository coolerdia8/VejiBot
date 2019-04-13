function PushMuti() {

  try {
    //const get_array = [YUTA_ID,CHICHI_ID]//ss.getRange('K:K').getValues();//IDを取得
    const get_array = ss.getRange('A:A').getValues();//IDを取得
    const num_pictues = get_array.filter(String).length;
    var id_array = dropNullItemFromArray(get_array)
    
    var userlist = []; //型を整えるためにuserlistを作成し値を詰める
    for(var i=0; i < id_array.length; i++){
      userlist.push(id_array[i][0]);
    }
    pic_url = get_pic_url(ss, getrawcellvalue(num_pictues, 'F'));
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
      "text": "僕がNo.わん!!"
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

function dropNullItemFromArray(array) {
  var new_array = [];
  for each(var value in array) {
    if (value != null && value != "") {
      new_array.push(value);
    }
  }
  return new_array;
}
