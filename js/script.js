
/* global */
/* #7 added Global var  */
var currentChannel;

var currentLocation = {
    longitude:1.2544938,
    latitude:103.8208173,
    whats3words:'half.globe.civil'
};

/* #6 start the #external #action and say hello */
console.log("App is alive");


/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#7 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy +'" target="_blank"><strong>' +channelName.createdBy +'</strong></a>';

    /* #7 copy channel starred value to app bar */
    
    $('#favIcon').attr('class', channelName.starred?'fas fa-star' : 'far fa-star');

    /* store channelName.name to global var currentChannel   */
    currentChannel = channelName.starred;
    console.log(" Test calling currentChannel star status: ", currentChannel);

    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName.name + ')').addClass('selected');
}

/* #7 togggle star on app bar */
function star() {
      $('#favIcon').toggleClass('fas far');
      /* #7 change status of channel.starred property  */
      currentChannel = !currentChannel;      
      console.log(" Current star status: ", currentChannel);
      /* #7 check and change status of star in channel list   */
      $('li.selected i.fa-star').attr('class', currentChannel?'fas fa-star' : 'far fa-star');
}


/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

/*  #8 add Messege constructor   */

function Message (createdBy, latitude, longitude, createdOn, expiresOn, text, own) {
    this.createdBy = currentLocation.whats3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    this.expiresOn = new Date(Date.now()+9e5);
    this.text = text;
    this.own = true;
}


/* #8 temporary ouput for chat bar button  */
function sendMessage() {
    var msg1 = new Message ("bobo.cha.left", 123, 456, Date.now(), Date(Date.now()+9e5), $('#inputMessage').val() , true);
    console.log(" Chat bar msg: ", msg1);  // test on calling the new constructor instance property
    $('#messages').append(createMessageElement(msg1));
}
 
// #8 Create and append new msg
function createMessageElement(Message) {
var diffMins = Math.round(900000 / 60000); // convert Date of createdOn to minutes
var dateLocal = Message.createdOn.toLocaleString('en-GB', { timeZone: 'UTC' });
var msgClass = Message.own? "message own": "message"; // changing class when message is don ourselves 

return '<div class="'+ msgClass +'"><h3><a href="Message.createdBy" target="_blank"><strong>' 
+ Message.createdBy + '</strong></a>'
 + dateLocal + '<em>' +diffMins+ 'min. left</em></h3> <p>' 
 +Message.text+ '</p><button>+5 min.</button></div>;';
}

// #8 function to scroll to bottom of messages
function gotoBottom(){
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight - element.clientHeight;
 }

 function Channels (name, createdOn, createdBy, starred, expiresin, messageCount) {
    this.name = name;
    this.createdOn = new Date();
    this.createdBy = createdBy;
    this.starred = true;
    this.expiresin = new Date(Date.now()+9e5);
    this.messageCount = messageCount;
    
}

 /* #8 add <li> to #channels list  */
function listChannels() {
    $('#list').append(createChannelElement(Yummy)); 
    $('#list').append(createChannelElement(SevenContinents));
    $('#list').append(createChannelElement(KillerApp)); 
    $('#list').append(createChannelElement(FirstPersonOnMars)); 
    $('#list').append(createChannelElement(Octoberfest)); 
 }

 /* #8 Add code to index.html using jquery*/
 function createChannelElement(Channels) { 
    var diffMins = Math.round(900000 / 60000); // convert Date of createdOn to minutes
    var starchecker = Channels.starred?"fas fa-star":"far fa-star";
    var $li = $('<li/>').attr('onClick','switchChannel('+ Channels.name +');').text('#'+Channels.name);
    var $span = $('<span/>').addClass("channel-meta");
    var starchecker = Channels.starred?"fas fa-star":"far fa-star";
    var $i = $('<i/>').addClass(starchecker)
    var $span2 = $('<span/>').text(Channels.expiresin +' min')
    var $span3 = $('<span/>').text(Channels.messageCount +' new')
    var $i2 = $('<i/>').addClass('fas fa-chevron-right');

    $span.append($i, $span2, $span3, $i2);
    $li.append($span);

    console.log($li);
    return $li;  

/* #8 alternative code to adding code to index.html - for debugging */
// return '<li onclick="switchChannel(' +Channels.name+')">#'+Channels.name+'<span class="channel-meta"><i class="'+starchecker+'"></i><i class="fas fa-chevron-right"></i></span></li>';
 } 
