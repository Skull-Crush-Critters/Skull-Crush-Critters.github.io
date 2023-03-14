/*=============================================================================*\
 * CTB PictureFollowsMV
 * Terms of Use:
 *  Free for commercial or non-commercial use
 *
/*=============================================================================*/
var CTB = CTB || {}; CTB.PictureFollowsMV  = CTB.PictureFollowsMV || {};
var Imported = Imported || {}; Imported["CTB.PictureFollowsMV"] = 1.00;
//=============================================================================//

/*:
 * @target MV
 * @plugindesc [RPG Maker MV] [Tier 1] [Version 1.00] [CT_Bolt - Picture Follows]
 * @author CT_Bolt 
 *
 * @help
 * Show a picture then attach a character with the following script call
 *  $gameScreen.picture(1)._character = *character*
 *
 * Example:
 *  $gameScreen.picture(1)._character = $gameMap.event(this._eventId);
 *  This will attach the current event to picture #1
 *
 *
 */
//=============================================================================
//=============================================================================

(function ($_$) {	
	function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.params = getPluginParameters();
	
	$_$['Sprite_Character.prototype.setCharacter'] = Sprite_Character.prototype.setCharacter;
	Sprite_Character.prototype.setCharacter = function(character) {
		$_$['Sprite_Character.prototype.setCharacter'].apply(this, arguments);
		this._character._sprite = this;
	};
	
	$_$['Sprite_Picture.prototype.updatePosition'] = Sprite_Picture.prototype.updatePosition;
	Sprite_Picture.prototype.updatePosition = function() {
		var picture = this.picture();
		if (!picture._character){
			$_$['Sprite_Picture.prototype.updatePosition'].apply(this, arguments);
		}else{
			$gameMap.zoom = $gameMap.zoom || {};
			$gameMap.zoom.x = $gameMap.zoom.x || 1;
			$gameMap.zoom.y = $gameMap.zoom.y || 1;
			this.x = (Math.floor(picture._character.screenX())+Math.floor(picture.x()))*$gameMap.zoom.x;
			this.y = (Math.floor(picture._character.screenY() - picture._character._sprite.height)+Math.floor(picture.y()))*$gameMap.zoom.y;
		}
	};

})(CTB.PictureFollowsMV, this);

