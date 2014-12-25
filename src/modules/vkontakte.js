//
// VKontakte
//
(function(hello){

  function formatUser(o) {
    if ( o.response && o.response[0].uid ) {
      var user = o.response[0];
      o.id = user.uid;
      o.first_name = user.first_name;
      o.last_name = user.last_name;
      o.name = o.first_name + " " + o.last_name;
      if ( user.photo_100 ) {
        o.thumbnail = user.photo_100;
      }
      if ( user.bdate ) {
        o.birthday = user.bdate;
      }
      delete o.response;
    }
  }

  function formatError(o) {
    if ( o.error ) {
      o.error = {
        code: o.error.error_code,
        message: o.error.error_msg
      };
    }
  }

  hello.init({
    vkontakte: {
      name: 'VKontakte',

      login: function(p) {
        p.options.window_width = 630;
        p.options.window_height = 500;        
      },

      oauth : {
        version : 2,
        auth : 'https://oauth.vk.com/authorize',
        grant : 'https://oauth.vk.com/access_token'
      },

      scope: {
        basic:          '',
        email:          'email',
        offline_access: 'offline'
      },

      base: 'https://api.vk.com/method/',

      get: {
        'me': 'users.get?fields=photo_100,bdate,timezone'
      },

      wrap: {
        'me': function(res) {
          formatError(res);
          formatUser(res);
          return res;
        }
      }
    }
  });

})(hello);
