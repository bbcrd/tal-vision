require.def('lancaster-vision/appui/components/video',
  [
    "antie/widgets/componentcontainer",
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/image",
    "antie/mediasource",
    "antie/widgets/horizontallist"
  ],
  function(Container, Component, Button, Label, Image, MediaSource, HorizontalList) {

    return Component.extend({
      init: function (test) {
        var app, self, label, button, image, playLabel, pauseLabel;
        self = this;
        app = this.getCurrentApplication();
        this._device = app.getDevice();

        // It is important to call the constructor of the superclass
        this._super("home");

        this._controls = new HorizontalList('gui');
        this._videoPlayer = this._device.createPlayer("player", "video");

        playLabel = new Label("Play");
        this._play = new Button();
        this._play.appendChildWidget(playLabel);
        this._play.addEventListener('select', function(e){
          self._videoPlayer.play();
        });

        this._controls.appendChildWidget(this._play);

        pauseLabel = new Label("Pause");
        this._pause = new Button();
        this._pause.appendChildWidget(pauseLabel);
        this._pause.addEventListener('select', function(e){
          self._videoPlayer.pause();
        });

        this._controls.appendChildWidget(this._pause);

        this.addEventListener("beforerender", function (ev) {
          self._onBeforeRender(ev);
        });

        // calls Application.ready() the first time the component is shown
        // the callback removes itself once it's fired to avoid multiple calls.
        this.addEventListener("aftershow", function appReady() {
          self.getCurrentApplication().ready();
          self.removeEventListener('aftershow', appReady);
        });
      },

      // Appending widgets on beforerender ensures they're still displayed
      // if the component is hidden and subsequently reinstated.
      _onBeforeRender: function (e) {
        this.appendChildWidget(this._controls);
        this.appendChildWidget(this._videoPlayer);
        this.queueVideo(e.args.programme_id);
      },

      queueVideo: function(id) {
        this._videoPlayer.setSources([
          new MediaSource("http://148.88.67.137/" + id + ".mp4", "video/mp4")
        ]);
        this._videoPlayer.load();
        this._videoPlayer.play();
      }
    });
  }
);