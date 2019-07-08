$( document ).ready(function() {
  firebase.initializeApp(getConfig());

  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(500);
    
  });

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
      if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }
  
  });

  $('#login > form > .button-login').on('click', function (e) {
    
    e.preventDefault();
    let email = $('#l-email').val();
    let password = $('#l-password').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function({user}){
      console.log('user', user.uid)
      alert('user id', user.uid)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error)
    });
  });

  $('#signup > form > .button-signup').on('click', function (e) {
    
    e.preventDefault();
    let email = $('#s-email').val();
    let password = $('#s-password').val();
    let firstname = $('#s-firstname').val();
    let lastname = $('#s-lastname').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function({user}){
      console.log('user', user.uid)
      alert('user id', user.uid)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error)
    });    
  });
});