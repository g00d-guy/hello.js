//
// VKontakte
//
(function(hello){

  function formatUser(o) {
    console.dir(o);
    /*if ( o.response && o.response[0].uid ) {
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
    }*/
  }

  function formatError(o) {
    if ( o.error ) {
      o.error = {
        code: o.error.error_code,
        message: o.error.error_msg
      };
    }
  }

  function formatRequest(p, qs){
    // Alter the querystring
    var token = qs.access_token;
    delete qs.access_token;
    qs.oauth_token = token;
    return true;
  }

  hello.init({
    yandex: {
      name: 'Yandex',

      oauth : {
        version : 2,
        auth: 'https://oauth.yandex.ru/authorize',
        grant: 'https://oauth.yandex.ru/token'
      },

      scope: {
        basic:          '',
        email:          'email',
        offline_access: 'offline'
      },

      base: 'https://login.yandex.ru/',

      get: {
        'me': 'info?format=json'
      },

      wrap: {
        'me': function(res) {
          formatError(res);
          formatUser(res);
          return res;
        }
      },

      xhr: formatRequest,
      jsonp: formatRequest
    }
  });

})(hello);