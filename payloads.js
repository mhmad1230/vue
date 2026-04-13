//------BIG THANKS TO SISTRO FOR THIS !!!!!--------

var getPayload = function(payload, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open("GET", payload);
  req.send();
  req.responseType = "arraybuffer";
  req.onload = function (event) {
    if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
};

var sendPayload = function(url, data, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.send(data);

  req.onload = function (event) {
    if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
};

//Load payloads with GoldHEN
function Loadpayloadlocal(PLfile){ //Loading Payload via Payload Param.
    var PS4IP = "127.0.0.1";


	// First do an initial check to see if the BinLoader server is running, ready or busy.
	var req = new XMLHttpRequest();
    if (PS4IP == "127.0.0.1") {
      req.open("POST", `http://${PS4IP}:9090/status`);
    } else {
      req.open("GET", `http://${PS4IP}:9090/status`);
    }
		req.send();
		req.onerror = function(){
			alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
			return;
		};
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		    getPayload(PLfile, function (req) {
				if ((req.status === 200 || req.status === 304) && req.response) {
				    //Sending bins via IP POST Method
                    sendPayload(`http://${PS4IP}:9090`, req.response, function (req) {
                        if (req.status === 200) {
                            //alert("Payload sent !");
                        }else{
                            //alert('Payload not sent !');
                            setTimeout(() => {
                                Loadpayloadonline(PLfile);
                            }, 3000); // 3 seconds delay
                            return;
                        }
                    })
                }
			});
			} else {
				alert("Cannot Load Payload Because The BinLoader Server Is Busy");//<<If server is busy, alert message.
				return;
		  }
	  };
}

function Loadpayloadonline(PLfile) {
    window.payload_path = PLfile;
}

window.Loadpayloadlocal = Loadpayloadlocal;
window.Loadpayloadonline = Loadpayloadonline;
