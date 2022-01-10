/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    
    document.getElementById('deviceready').classList.add('ready');
}
var watch = 0;

window.onload = function()
{
    //init();
    document.addEventListener("deviceready", init, false);
}

function init()
{
    var iW = window.innerWidth;
    var iH = window.innerHeight;
    canvas= document.getElementById('myCanvas');
    cnv = canvas.getContext("2d");
    cnv.canvas.width = iW;
    cnv.canvas.height = iH-40;
    target = new Image();
    target.src = "img/crosshair2.png";
    xPos = (iW-target.width)/2 - 75;
    yPos = (iH-target.height)/2 - 75;
    target.onload = function()
    {
        cnv.drawImage(target, xPos, yPos);
    }
        watch = navigator.accelerometer.watchAcceleration(success,
                failure, {frequency: 25});
   

}

function success(accel)
{
    document.getElementById("xOut").innerHTML = xPos;
    document.getElementById("yOut").innerHTML = yPos;
    document.getElementById("zOut").innerHTML = accel.z;
    cnv.clearRect(0, 0, canvas.width, canvas.height);
    xPos += -1*(accel.x * 3);
    yPos += (accel.y * 3);
    if (xPos< -75) { xPos = -75; }
    if (yPos< -75) { yPos = -75; }
    if (xPos>(myCanvas.width - 75)) { xPos = (myCanvas.width - 75); }
    if (yPos>(myCanvas.height - 75)) { yPos = (myCanvas.height - 75); }
    cnv.drawImage(target, xPos, yPos);
}

function failure()
{
    alert("Error");
}
