$( document ).ready(function() {
  firebase.initializeApp(getConfig());

  $('.tab a').on('click', function (e) {
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault
    // https://www.geeksforgeeks.org/preventdefault-event-method/
    e.preventDefault();
    
    $(this).parent().addClass('active');

    // https://www.w3schools.com/jquery/traversing_siblings.asp
    $(this).parent().siblings().removeClass('active');
    

    // verifica tab ativa na lista pelo href da ancora (#login / #signup)
    target = $(this).attr('href');
    
    // Esconde div com o id que nao tenha o valor de target (#login / #signup)
    // 
    // https://api.jquery.com/hide/
    $('.tab-content > div').not(target).hide();
    
    // https://api.jquery.com/fadeIn/
    // https://www.w3schools.com/jquery/eff_fadein.asp
    $(target).fadeIn(500);
    
  });
  
  
  
  // https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),  label = $this.prev('label');
  
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
      alert('user id' + user.uid)
    })
    .catch(function(error) {
      // Handle Errors here.
      // https://firebase.google.com/docs/auth/web/password-auth
      var errorCode = error.code;
      //"auth/operation-not-allowed"
      var errorMessage = error.message;
      /*
      "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section."
      */
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
      alert('user id' + user.uid)
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