/**
 * @author Mark Korneev <korneevmark@gmail.com>
 * @license GNU/AGPLv3
 * @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
 */

'use strict';

(function () {
	var h1 = document.getElementsByTagName('h1');
	h1 = Array.prototype.slice.call(h1);
	h1.forEach(function (item) {
		item.innerHTML = 'Game here mdfka!';
	});
})();
