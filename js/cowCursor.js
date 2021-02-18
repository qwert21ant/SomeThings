function rand(min, max){
	return Math.random() * (max - min) + min;
}

function randSign(){
	return (Math.random() - 0.5 > 0 ? 1 : -1);
}

function Cow(x, y, a = 1){
	this.pos = {'x': x, 'y': y};
	this.dir = {'x': rand(0.8, 2.) * randSign(), 'y': rand(0.8, 2.) * randSign()};
	this.rotate = rand(0, Math.PI * 2);
	this.alpha = a;
}

function cowCursor(){
	const minRad = 20;
	const maxRad = 30;
	const lineWidth = 5;
	const imageSize = 40;

	var cvs = document.getElementById('main');
	var ctx = cvs.getContext('2d');

	cvs.width  = window.innerWidth;
	cvs.height = window.innerHeight;

	var img = new Image();
	img.src = 'cow.png';

	var pos   = {clientX: 0, clientY: 0};
	var rad   = maxRad;
	var toRad = maxRad;
	var cows  = [];
	var speed = 6;
	var count = 0;

	document.getElementsByTagName('body')[0].onresize = function(){
		cvs.width = window.innerWidth;
		cvs.height = window.innerHeight;
	}

	cvs.onmousemove = function(e){
		pos = e;
	}

	cvs.onmousedown = function(){
		toRad = minRad;
		speed = 3;
	}

	cvs.onmouseup = function(){
		toRad = maxRad;
		speed = 6;
	}

	function drawRotated(x, y, r, a) {
		ctx.save();
		ctx.globalAlpha = a;
		ctx.translate(x + imageSize / 2, y + imageSize / 2);
		ctx.rotate(r);
		ctx.drawImage(img, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
		ctx.restore();
	}

	function anim(){
		if(!count){
			let cow = new Cow(pos.clientX, pos.clientY);
			cows.push(cow);
		}
		count++;
		if(count >= speed) count = 0;

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.fillStyle = '#ffaaaa';
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		for(let i = 0; i < cows.length; i++){
			drawRotated(cows[i].pos.x - 15, cows[i].pos.y - 15,
				cows[i].rotate, cows[i].alpha);

			cows[i].pos.x += cows[i].dir.x;
			cows[i].pos.y += cows[i].dir.y;
			cows[i].alpha -= 0.01;
			cows[i].rotate += 0.1;

			if(cows[i].pos.x < -20 || cows[i].pos.y > window.innerWidth + 20 ||
				cows[i].pos.y < -20 || cows[i].pos.y > window.innerHeight + 20 ||
				cows[i].alpha <= 0)
				cows.splice(i, 1);
		}

		ctx.beginPath();
		ctx.arc(pos.clientX, pos.clientY, rad, 0, 2 * Math.PI);
		ctx.closePath();
		
		ctx.fillStyle = '#FFCC00';
		ctx.fill();

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = '#DCB001';
		ctx.stroke();

		if(rad != toRad){
			if(rad < toRad){
				rad += 5;
			}else{
				rad -= 5;
			}
		}

		requestAnimationFrame(anim);
	}

	anim();
}