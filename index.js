// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCsbSj_AGP9OxT-KBmVxvgQhn894MQ4ka4",
    authDomain: "photowaka-ad5cf.firebaseapp.com",
    databaseURL: "https://photowaka-ad5cf.firebaseio.com",
    projectId: "photowaka-ad5cf",
    storageBucket: "photowaka-ad5cf.appspot.com",
    messagingSenderId: "36090424132",
    appId: "1:36090424132:web:24bbf76f07218106"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore()

  let userName = $("#userName");
  let userBio = $("#userBio");
  let testButton = $("#testSubmit");
  let userImg = $("#img");
  let group = $("#group");



  userImg.val("");


  let userImgFile;
  let selectedGroup;

  let submitBtn = $("#realSubmit");




userImg.on("change", (e) => {
     userImgFile = e.target.files[0] ;
} )

group.on("change", (e) => {
    selectedGroup = e.target.value 
})


  testButton.on("click", (e) => {
      e.preventDefault();

      if( 
          userImgFile !== undefined &&
          userName.val()  !== "" &&
          userBio.val() !== "" &&
          selectedGroup
      )

      {

        
      testButton.text("LOADING")
      testButton.attr("id", "loading")
          
          let datatbase = firebase.firestore();

          datatbase.collection("teammembers").doc(`${userName.val()}`).set( {
              userName: userName.val(),
              bio: userBio.val(),
              userImg: userImgFile.name,
              group: selectedGroup,
                      } )
                      .then( () => {
                        //   console.log("dONE")
                      } )

        
                
           saveImg();
    

        
        
      }


      else{
        showError();
      }
  })



  const saveImg = () => {
     return firebase.storage().ref()
      .child(`memberImages/${userName.val()}`)
      .put(userImgFile)
      .then( () => {
        showConfirm();
      } )
  }
  

   


  let directorsBox = $(".directors")

   let teammembers = db.collection("teammembers")
//   console.log(db)


  teammembers.get()
  .then(snapshot => {

    let firebaseStorage = firebase.storage().ref();
    

      snapshot.forEach( doc => {
          let realUrl;
          console.log(doc.data().userName);
           let imgUrl =  firebaseStorage.child(`memberImages/${doc.data().userName}`)
           imgUrl.getDownloadURL()
           .then( url => {
        
            directorsBox.append(
                `<div id="colorMe"> 
          
                 
                <div style="color: red; background:  url(${url}); width: 300px; height: 300px; margin: 0 auto; background-position: center; background-size: cover "></div>
                    
            
                    
                 <h1> ${doc.data().userName} </h1>
                 <h3> ${doc.data().group} </h3> 
                 <p> ${doc.data().bio} </p> 
  
                </div>`
            )
           } )
           .catch(err => {
                realUrl = url;
           })

     
        
      } )
  }) 
  

$(".error").hide()

  const showError = () => {
      $(".error").show(800);

      setTimeout(() => {
          $(".error").hide(200)
      }, 3000);
  }

 


const showConfirm = () => {
    $("main").hide(200);

    $(".confirm").show(300);
}