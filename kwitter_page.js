var firebaseConfig = {
    apiKey: "AIzaSyDMeLokSgzCoTdKSspYprFBKBtOFMtratY",
    authDomain: "kwitter-65f3f.firebaseapp.com",
    databaseURL: "https://kwitter-65f3f-default-rtdb.firebaseio.com",
    projectId: "kwitter-65f3f",
    storageBucket: "kwitter-65f3f.appspot.com",
    messagingSenderId: "866775763741",
    appId: "1:866775763741:web:d440cc6fe0aa612591eff4"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
username=localStorage.getItem("username")
roomname=localStorage.getItem("roomName")
function getData() { 
    firebase.database().ref("/"+roomname).on('value', function(snapshot) { 
        document.getElementById("output").innerHTML = ""; 
        snapshot.forEach(function(childSnapshot) { 
            childKey  = childSnapshot.key; childData = childSnapshot.val(); 
            if(childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;
                console.log(firebaseMessageId);
                console.log(messageData);
                name = messageData['name'];
                message = messageData['message'];
                like = messageData['like'];
                nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                messageTag = "<h4 class='message_h4'>"+ message + "</h4>";
                likeButton = "<button class='btn btn-warning' id="+firebaseMessageId+"value = "+like+ "onclick='updateLike(this.id)'>";
                spanWithTag = "<span class='glyphicon glyphicon-thumbs-up' Like : "+like+"</span></button><hr>";
                row = nameWithTag + messageTag +likeButton +spanWithTag;
                document.getElementById("output").innerHTML += row; 
 } });  }); }
getData();
function send(){
    msg=document.getElementById("message").value;
firebase.database().ref(roomname).push({
    name:username,
message:msg, 
like:0
});

document.getElementById("message").value="";
}

function logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("roomName")
    window.location="index.html"
}

function updateLike(messageId){
    console.log("Clicked on like button : " + messageId);
    buttonId=messageId;
    likes=documents.getElementById(buttonId).value; 
    updatedLikes = Number(likes)+1;
    console.log(firebaseLikes)

    firebase.database().ref(roomname).child(messageId).update({
        like:updatedLikes
    });
}
