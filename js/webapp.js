/* global MozActivity, alert, console, Notification */
"use strict";
(function () {
    /*
        WebActivities:

            configure
            costcontrol/balance
            costcontrol/data_usage
            costcontrol/telephony
            dial
            new (type: "websms/sms", "webcontacts/contact") (add-contact, compose-mail?)
            open
            pick (type: "image/png" etc)
            record (capture?)
            save-bookmark
            share
            test
            view (type: "url" etc. "text/html"?)
    */

    var pickAnything = document.querySelector("#pick-anything");
    if (pickAnything) {
        pickAnything.onclick = function () {
             var pickAny = new MozActivity({
                 name: "pick"
             });

            pickAny.onsuccess = function () {
                var img = document.createElement("img");
                if (this.result.blob.type.indexOf("image") != -1) {
                    img.src = window.URL.createObjectURL(this.result.blob);
                    var imagePresenter = document.querySelector("#image-presenter");
                    imagePresenter.appendChild(img);
                    imagePresenter.style.display = "block";
                }
                recordDB(window.URL.createObjectURL(this.result.blob), this.result.blob.type);
            };

            pickAny.onerror = function () {
                console.log("An error occurred");
            };
        };
    }

    var sendSMS = document.querySelector("#send-sms");
    if (sendSMS) {
        sendSMS.onclick = function () {
            new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "+46777888999"
                }
            });
        };
    }


    var openVideo = document.querySelector("#open-video");
    if (openVideo) {
        openVideo.onclick = function () {
            new MozActivity({
                name: "open",
                data: {
                    type: [
                      "video/webm",
                      "video/mp4",
                      "video/3gpp",
                      "video/youtube"
                    ],
                    url: "http://v2v.cc/~j/theora_testsuite/320x240.ogg"
                }
            });
        };
    }

    // Check connection
    var checkConnection = document.querySelector("#check-connection"),
        connectionDisplay = document.querySelector("#connection-display");

    if (checkConnection && connectionDisplay) {
        checkConnection.onclick = function () {
            var connection = window.navigator.mozConnection,
                online = "<strong>Connected:</strong> " + (connection.bandwidth),
                metered = "<strong>Metered:</strong> " + connection.metered;

            connectionDisplay.innerHTML = "<h4>Result from Check connection</h4>" + online + "<br>" + metered;
            connectionDisplay.style.display = "block";
        };
    }

    // Geolocation
    var geolocation = document.querySelector("#geolocation"),
        geolocationDisplay = document.querySelector("#geolocation-display");
    if (geolocation && geolocationDisplay) {
        geolocation.onclick = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                geolocationDisplay.innerHTML = "<strong>Latitude:</strong> " + position.coords.latitude + ", <strong>Longitude:</strong> " + position.coords.longitude;
                geolocationDisplay.style.display = "block";
            },
            function () {
                geolocationDisplay.innerHTML = "Failed to get your current location";
                geolocationDisplay.style.display = "block";
            });
        };
    }

    function recordDB (fsrc, ftype) {
        var d = new Date()
        var today = d.getMonth() +"-" + d.getDate() +"-" + d.getFullYear()
        var ulocation = {};
        navigator.geolocation.getCurrentPosition(function (pos) {
            ulocation =  {'latitude': pos.coords.latitude, 'longitude': pos.coords.longitude};
        });

        try {
           var cast = {'src': fsrc,'type': ftype,'location': ulocation}
           strcast = localStorage.getItem(today)
           casts = strcast.substring(1, myData.length - 1);
           casts.push(JSON.stringify(cast));
           casts
        }
        catch (e) {
            cast = JSON.stringify({'src': fsrc,'type': ftype,'location': ulocation})
           var cast = [cast]
        }


       
        localStorage.setItem( today, cast);
        //fetch object
    }
})();