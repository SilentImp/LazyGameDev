var dir, imgDependencies, jsDependencies;

jsDependencies = ['modernizr', 'jquery', 'PxLoader', 'PxLoaderImage', 'PxLoaderSound', 'modernizr', 'jgestures.min', 'l20n', 'mozHack', 'jquery.hotkeys', 'requestAnimationFramePolyfill', 'TimerController', 'FoodController', 'BuildingsController', 'ScoreController', 'MenuController', 'GameController'];

dir = 'images/';

imgDependencies = [dir + 'house.png', dir + 'train.png', dir + 'sky.png'];

require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  shim: {
    "jquery.hotkeys": {
      deps: ['jquery']
    },
    "jgestures.min": {
      deps: ['jquery']
    },
    "PxLoaderImage": {
      deps: ['PxLoader']
    },
    "PxLoaderSound": {
      deps: ['PxLoader']
    }
  }
});

require(jsDependencies, function(modernizr, $, PxLoader) {
  var img, loader, loading, _i, _len;
  loader = new PxLoader;
  for (_i = 0, _len = imgDependencies.length; _i < _len; _i++) {
    img = imgDependencies[_i];
    loader.addImage(img);
  }
  loading = $('.loading-screen');
  loader.addProgressListener(function(event) {
    return loading.find('.line').text(Math.floor((event.completedCount * 100) / imgDependencies.length) + '%');
  });
  loader.addCompletionListener(function() {
    return $(document).ready(function() {
      $('.language-navigation a[data-lang="' + document.l10n.supportedLocales[0] + '"]').addClass('selected');
      $('.page').show();
      return loading.hide();
    });
  });
  return loader.start();
});

require.onError = function(err) {
  console.log(err.requireType);
  if (err.requireType === 'timeout') {
    console.log('modules: ' + err.requireModules);
  }
  throw err;
};
