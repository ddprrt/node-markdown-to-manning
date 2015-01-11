'use strict';

var marked = require('marked');
var fs = require('fs');
var render = new marked.Renderer();
var curLevel = 0;

var spacing = function(level) {
	if(typeof level === 'undefined') level = curLevel;
	return new Array(level * 2).join(' ');
}

var levelText = function(lv) {
	if(lv === 1) {
		return 'chapter';
	} else {
		return 'sect' + (lv - 1);
	}
};

var closeLevel = function(level) {
	var pre = '';
	if(level < curLevel) {
		for(var i = curLevel; i >= level; i--) {
			pre += spacing(i-1) + '</'+ levelText(i) +'>\n\r';
		}
	} else if(level === curLevel) {
		pre += spacing(level-1) + '</'+ levelText(level) +'>\n\r';
	}
	return pre;
};


render.code = function(code, language) {

};

render.blockquote = function(quote) {

};

render.html = function(html) {
	return html;
};

render.heading = function(text, level) {
	var pre = closeLevel(level);

	curLevel = level;

	return pre + spacing(level-1) + '<' + levelText(level) + '>\n\r' +
		spacing() + '<title>' + text + '</title>\n\r';
};

render.hr = function() {
	return '';
};

render.list = function(body, ordered) {
	var listText = 'itemizedList';
	if(ordered) {
		listText = 'orderedlist';
	}

	return spacing() + '<' + listText + '>\n\r' + body + spacing() + '</' + listText + '>\n\r'
};

render.listitem = function(text) {
	return spacing(curLevel + 1) + '<listItem><para>' + text + '</para></listItem>\n\r';
};

render.paragraph = function(text) {
	return spacing() + '<para>' + text + '</para>' + '\n\r';
};

render.table = function(header, body) {

};

render.tablerow = function(content) {

};

render.tablecell = function(content, flags) {

};

render.strong = function(text) {

};

render.em = function(text) {

};

render.codespan = function(code) {

};

render.br = function() {
	return '';
};

render.del = function(text) {

};

render.link = function(href, title, text) {

};

render.image = function(href, title, text) {

};

marked.setOptions({
	gfm: true,
	tables: true
});

var data = fs.readFileSync('./test/fixtures/1.md', 'utf-8');

console.log(marked(data, { renderer: render }) + closeLevel(1));

