function rand(min, max){
	return Math.random() * (max - min) + min;
}

function randSign(){
	return (Math.random() - 0.5 > 0 ? 1 : -1);
}

function Ball(x, y, r = 9, g = 105, b = 162, a = 1){
	this.pos = {'x': x, 'y': y};
	this.dir = {'x': rand(0.8, 2.) * randSign(), 'y': rand(0.8, 2.) * randSign()};
	this.col = {'r': r, 'g': g, 'b': b, 'a': a};
}

function traceCursor01(){
	const minRad = 20;
	const maxRad = 30;
	const lineWidth = 5;
	const ballSize = 20;

	var cvs = document.getElementById('main');
	var ctx = cvs.getContext('2d');

	cvs.width  = window.innerWidth;
	cvs.height = window.innerHeight;

	var pos    = {clientX: 0, clientY: 0};
	var rad    = maxRad;
	var toRad  = maxRad;
	var isDown = false;
	var balls  = [];

	document.getElementsByTagName('body')[0].onresize = function(){
		cvs.width = window.innerWidth;
		cvs.height = window.innerHeight;
	}

	cvs.onmousemove = function(e){
		pos = e;
	}

	cvs.onmousedown = function(){
		toRad = minRad;
		isDown = true;
	}

	cvs.onmouseup = function(){
		toRad = maxRad;
		isDown = false;
	}

	function anim(){
		if(!isDown){
			let ball = new Ball(pos.clientX, pos.clientY);
			balls.push(ball);
		}else{
			let ball = new Ball(pos.clientX, pos.clientY, 255, 0, 0);
			balls.push(ball);
		}

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		ctx.fillStyle = '#ffaaaa';
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

	 	for(let i = 0; i < balls.length; i++){
	 		ctx.beginPath();
			ctx.arc(balls[i].pos.x, balls[i].pos.y, ballSize, 0, 2 * Math.PI);
			ctx.closePath();
			
			ctx.fillStyle = 'rgba('+balls[i].col.r+', '+balls[i].col.g
							+', '+balls[i].col.b+', '+balls[i].col.a+')';
			ctx.fill();

			balls[i].pos.x += balls[i].dir.x;
			balls[i].pos.y += balls[i].dir.y;
			balls[i].col.a -= 0.02;

			if(balls[i].pos.x < -20 || balls[i].pos.y > window.innerWidth + 20 ||
				balls[i].pos.y < -20 || balls[i].pos.y > window.innerHeight + 20 ||
				balls[i].col.a <= 0)
				balls.splice(i, 1);
	 	}

		ctx.beginPath();
		ctx.arc(pos.clientX, pos.clientY, rad, 0, 2 * Math.PI);
		ctx.closePath();

		ctx.fillStyle = '#FFCC00';
		ctx.fill();

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = '#DCB000';
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