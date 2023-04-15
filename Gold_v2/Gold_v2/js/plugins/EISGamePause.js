//=============================================================================
// EISGamePause.js                                                             
//=============================================================================

/*:
*
* @author Kino
* @plugindesc Gives you the ability to pause the game.
*
* @param Pause Text
* @desc Text in the pause window.
* @default Pause
*
* @param Pause Key
* @desc The key to pause the game. Example: Enter, P, Y, A, etc
* @default A
*
* @param Window Width
* @desc Width of the game pause window
* @default 125
* 
* @param Window Height
* @desc Height of the game pause window.
* @default 75
* 
* @help
* Version 1.00
//=============================================================================
// Features                                                             
//=============================================================================
*
* - Pauses the game.
* - Stops the game clock.
* 
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Website Link: http://endlessillusoft.com/
* Twitter Link: https://twitter.com/EISKino
* Patreon Link: https://www.patreon.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/


(function() {

  var params = PluginManager.parameters("EISGamePause");
  var pauseText = params['Pause Text'];
  var pauseKey = params['Pause Key'].toUpperCase().charCodeAt(0);
  var windowWidth = Number(params['Window Width']);
  var windowHeight = Number(params['Window Height']);

  function setup() {
    'use strict';

//=============================================================================
// Scene_Pause                                                             
//=============================================================================

    class Scene_Pause extends Scene_MenuBase {
      
      constructor() {
        super();
      }

      create() {
        super.create();
        this.createPauseWindow();
      }

      createPauseWindow() {
        this._pauseWindow = new Window_Pause((Graphics.width / 2) - (windowWidth / 2), (Graphics.height / 2) - (windowHeight / 2), windowWidth, windowHeight);
        this.addWindow(this._pauseWindow);
      }

      update() {
        super.update();
        this.processExit();
      }

      processExit() {
        if(Input.isPressed('cancel') || TouchInput.isCancelled()) {
          this.popScene();
        }
      }
    }
//=============================================================================
// Window_Pause                                                             
//=============================================================================
    class Window_Pause extends Window_Base {
      constructor(x, y, width, height) {
        super(x, y, width, height);
      }

      update() {
        super.update();
        this.refresh();
      }

      refresh() {
        if(this.contents) {
          this.contents.clear();
          this.drawPause();
        }
      }

      drawPause() {
        let midPoint = (this.contentsWidth() / 2) - (this.textWidth(pauseText) / 2);
        this.drawText(pauseText, midPoint, 0);
      }
    }
//=============================================================================
// Graphics                                                             
//=============================================================================

    var _Graphics_render = Graphics.render;
    Graphics.render = function(stage) {
      _Graphics_render.call(this, stage);
      if(SceneManager._scene instanceof Scene_Pause)
        this.frameCount--;
    };

//=============================================================================
// Game_System                                                             
//=============================================================================

    Game_System.prototype.pauseGame = function() {
      if(SceneManager._scene instanceof Scene_Map)
        SceneManager.push(Scene_Pause);
      else if(SceneManager._scene instanceof Scene_Pause)
        SceneManager._scene.popScene();
    };
//=============================================================================
//  Event Listener                                                            
//=============================================================================

    document.addEventListener('keydown', function(event) {
      if(event.keyCode === pauseKey)
        $gameSystem.pauseGame();
    });
  }

  setup();
})();