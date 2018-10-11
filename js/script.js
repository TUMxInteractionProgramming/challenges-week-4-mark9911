
/* global */
/* #7 added Global var  */
var currentChannel;

var currentLocation = {
    longtitude:1.2544938,
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
