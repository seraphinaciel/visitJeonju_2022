//scroll
function srollInit(){
	var scrollFlag = true;
	var screenHeightPlus = innerHeight;
	yoffset = 0;
	currentSection = 0; 
	sectionInfo = 
	[
		{
			// intro
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec00'),
			pagination : document.querySelector('#lnb-number-section1'),
			id : "search"
		},
		
		{
			// 1
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec01'),
			pagination : document.querySelector('#lnb-number-section2'),
			id : "sec01"
		},
		{
			// 2
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec02'),
			pagination : document.querySelector('#lnb-number-section3'),
			id : "sec02"
		},
		{
			// 3
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec03'),
			pagination : document.querySelector('#lnb-number-section4'),
			id : "sec03"
		},
		{
			// 4
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec04'),
			pagination : document.querySelector('#lnb-number-section5'),
			id : "sec04"
		},
		{
			// 5
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec05'),
			pagination : document.querySelector('#lnb-number-section6'),
			id : "sec05"
		},
		{
			// 6
			height : 0,
			yoffset : [0,0],
			section :  document.querySelector('.sec06'),
			pagination : document.querySelector('#lnb-number-section7'),
			id : "sec06"
		}
	];
	
	var mobileTouchInfo = 	
	{
		startEvent : false,
		minMove : 50,
		moveStartY : 0,
		moveEndY : 0,
		moveTime : 0
	}






	
	// =================================================================================================== 핸들러 S
	// 새로고침, 리사이징 이벤트 처리 
	function sectionInfoInit(){
		sectionInfoHeightFun();
		currentSectionFun(pageYOffset);
		scrollPaginationFun();
	}

	// 스크롤 이벤트 처리 
	function scrollAct(type){
		if(document.querySelector('.gnb').style.display == 'none'){
			currentSectionFun(yoffset);
			if(device == 2){
				if(scrollFlag){
					scrollFlag = false;			
					if(event.wheelDelta > 0 || type === 'toTop'){
						if(scrollAddFun('toTop')){
							scrollToTop();
							scrollPaginationFun();
						}
					}else if(event.wheelDelta < 0 || type === 'toBottom'){
						if(scrollAddFun('toBottom')){
							scrollToBottom();
							scrollPaginationFun();
						}
					}
					screenHeightPlus = innerHeight;
				}			
			}
		}
	}

	function scrollFirefoxAct(type){
		if(document.querySelector('.gnb').style.display == 'none'){
			currentSectionFun(yoffset);
			if(device == 2){
				if(scrollFlag){
					scrollFlag = false;			
					if(event.detail < 0 || type === 'toTop'){
						if(scrollAddFun('toTop')){
							scrollToTop();
							scrollPaginationFun();
						}
					}else if(event.detail  > 0 || type === 'toBottom'){
						if(scrollAddFun('toBottom')){
							scrollToBottom();
							scrollPaginationFun();
						}
					}
					screenHeightPlus = innerHeight;
				}			
			}
		}
	}

	// =================================================================================================== 핸들러 E
	
	













	// =================================================================================================== 이벤트 S
	
	/**
	  * body 속성 정의 
	  */
	function bodyAttFun(){
		if(device == 1){
			$("body").css("overflow","");
			$("body").attr("ondragstart","");
			$("body").attr("onselectstart","");
		}
		if(device == 2){
			$("body").css("overflow","hidden");			
			$("body").attr("ondragstart","return false");
			$("body").attr("onselectstart","return false");
		}
	}

	/**
	  * 사이즈 별 디바이스 구하기 
	  */
	function seletorDeviceFun(){
		if(!window.matchMedia("all and (min-width:1400px)").matches && device != 1){
			device = 1;
			bodyAttFun();
		}else if(window.matchMedia("all and (min-width:1400px)").matches && device !=2){
			device = 2;
			bodyAttFun();
		}
	}

	/**
	  * sectionInfoHeight, sectionInfoYoffset 값 구하기 
	  */
	function sectionInfoHeightFun(){
		var endYoffset = 0;
		for(var i=0; i < sectionInfo.length; i++){
			sectionInfo[i].height = sectionInfo[i].section.offsetHeight;
			endYoffset += sectionInfo[i].height;
			sectionInfo[i].yoffset[1] = endYoffset;
			if(i>0){
				sectionInfo[i].yoffset[0] = sectionInfo[i-1].yoffset[1];
			}
		}
	}

	/**
	  * 스크롤 위로 이동 
	  */
	function scrollToTop(){
		if(currentSection != 0){
			if(currentSection == 0){
				currentSection = 0;
			}else{
				currentSection--;
			}
			scrollToFun(sectionInfo[currentSection].yoffset[0],500);
		}else{
			scrollFlag = true;
		}
	}

	/**
	  * 스크롤 아래로 이동 
	  */
	function scrollToBottom(){
		if(currentSection+1 != sectionInfo.length){
			if((currentSection+1) >= sectionInfo.length){
				currentSection = sectionInfo.length-1;
			}else{
				currentSection++;
			}
			scrollToFun(sectionInfo[currentSection].yoffset[0],500);
		}else{	
			scrollFlag = true;
		}
	}

	/**
	  * currentSection 값 구하기 
	  */
	function currentSectionFun(reYOffSet){
		yoffset = reYOffSet;
		for(var i=0; i < sectionInfo.length; i++){
			if(yoffset < sectionInfo[i].yoffset[1] ){
				currentSection = i;
				break;
			}
		}
	}

	/**
	  * 스크롤 이동 
	  */
	function scrollToFun(y,s){
		$('html').animate({scrollTop:y},s,'swing',function(){
			yoffset = y;
			scrollFlag = true;
		});	
	}

	/**
	  * 스크롤 이동에 따른 페이징 처리 
	  */
	function scrollPaginationFun(){

		for(var i=0; i < sectionInfo.length; i++){
			sectionInfo[i].pagination.style.display = 'none';
		}
		if(device == 1){
			document.querySelector('#header').classList.remove('first');
			document.querySelector('.search').style.display='block';		
		}
		if(device == 2){
			if(currentSection == 0){
				document.querySelector('#header').classList.add('first');
				document.querySelector('.search').style.display='none';
			}else if(currentSection > 0){
				document.querySelector('#header').classList.remove('first');
				document.querySelector('.search').style.display='block';
			}
		}
		sectionInfo[currentSection].pagination.style.display = '';
	}
	
	/**
	  * 모바일 한 화면에 전체가 안나옴 
	  */
	 function scrollAddFun(type){
		if('toTop' == type){
			if(yoffset != sectionInfo[currentSection].yoffset[0]){
				if((yoffset - screenHeightPlus) < sectionInfo[currentSection].yoffset[0]){
					screenHeightPlus = (yoffset-sectionInfo[currentSection].yoffset[0]);
				}
				scrollToFun((yoffset -  screenHeightPlus),400);
				return false;				
			}
			if(yoffset == sectionInfo[currentSection].yoffset[0] && currentSection !=0){
				if(sectionInfo[currentSection-1].yoffset[0] < (yoffset-screenHeightPlus)){
					scrollToFun((yoffset -  screenHeightPlus),400);
					return false;
				}
			}
		}
		if('toBottom' == type){
			if(sectionInfo[currentSection].yoffset[1] > (yoffset + innerHeight)){
				if((yoffset + innerHeight + screenHeightPlus) > sectionInfo[currentSection].yoffset[1]){
					screenHeightPlus =  sectionInfo[currentSection].yoffset[1] - (innerHeight +yoffset);
				}
				scrollToFun((yoffset +  screenHeightPlus),400);
				return false;
			}	 
		}
		return true;
	 }


	/**
	  * 스크롤을 하면서 처리되는 효과  작업중
	  */
	function scrollAnimationFun(){
		// 모바일 pc 전체 

		// 모바일(1200px 미만)

		// pc(1200px 이상)

		switch(currentSection){
			case 0 : 		
				break;
			case 1 : 
				break;
			case 2 : 
				break;
			case 3 : 
				break;
			case 4 : 
				break;
			case 5 : 
				break;
		}
	}
	// =================================================================================================== 이벤트 E
	


	if (navigator.userAgent.toLowerCase().indexOf("firefox") == -1) {
		window.addEventListener('mousewheel',function(){
			scrollAct('pc');
		});
	}else{
		window.addEventListener('DOMMouseScroll',function(){
			scrollFirefoxAct('pc');
		});	
	}
	window.addEventListener('load',function(){
		seletorDeviceFun();
		sectionInfoInit();
	});
	window.addEventListener('resize',function(){
		seletorDeviceFun();
		sectionInfoInit();
	});
	window.addEventListener('keydown',function(e){
		if(e.keyCode == 38){
			scrollAct('toTop');			
		}
		if(e.keyCode == 40){
			scrollAct('toBottom');			
		}
	});	
}
srollInit();                  
location.hash='#content';             
//menu
function menuInit(){
	var headerClass = "";
	document.querySelector(".btn_menu").addEventListener("click",function(){
		if(this.className.indexOf('on') > -1){
			this.classList.remove('on');
			document.querySelector(".gnb").style.display='none';
			if(headerClass != ""){
				document.querySelector('header').classList.add(headerClass);			
			}
		}else{
			this.classList.add('on');
			document.querySelector(".gnb").style.display='block';
			document.querySelector(".gnb").classList.remove('on');
			headerClass = document.querySelector('header').classList.value;
			document.querySelector('header').classList.remove('first');
		}
	});
	
	/*
	document.querySelector(".btn_menu").addEventListener("mouseenter",function(){
		if(document.querySelector(".btn_menu").className.indexOf('on') > -1) return;
		document.querySelector(".gnb").classList.add('on');
	});
	*/
	document.querySelector(".g_my > a").addEventListener("click",function(e){
		$(this).next(".g_list").toggle();
	});

	document.querySelector(".gnb").addEventListener("mousemove",function(e){
		if(device == "2" && document.querySelector(".gnb").style.display=='block'){
			if(e.pageY> ($(".gnb").height() * 0.8) + pageYOffset){
				document.querySelector(".btn_menu").classList.remove('on');
				document.querySelector(".gnb").style.display = 'none';
				if(headerClass != ""){
					document.querySelector('header').classList.add(headerClass);			
				}
			}
		}
	});
	
	
	for(var i=0; i < document.querySelectorAll(".menu1-a").length; i++){
		document.querySelectorAll(".menu1-a")[i].addEventListener('click',function(e){
			var nextUl = this.nextElementSibling;
			if(nextUl != null){
				e.preventDefault();
				$(this).parent("div").siblings("div").removeClass("on");
				$(this).parent("div").siblings("div").children("ul").hide();
				this.parentElement.classList.add("on");
				nextUl.style.display='block';
			}
		});	
	}

	for(var i=0; i < document.querySelectorAll(".menu2-a").length; i++){
		document.querySelectorAll(".menu2-a")[i].addEventListener('click',function(e){
			if(window.innerWidth > 1200) return;
			var nextUl = this.nextElementSibling;
			if(nextUl != null){
				e.preventDefault();
				nextUl.style.display='block';
			}
		});	
	}

	for(var i=0; i < document.querySelectorAll(".menu3-a").length; i++){
		document.querySelectorAll(".menu3-a")[i].addEventListener('click',function(e){
			if(window.innerWidth > 1200) return;
			var nextUl = this.nextElementSibling;
			if(nextUl != null){
				e.preventDefault();
				nextUl.style.display='block';
			}
		});	
	}

	document.querySelector(".gnb .g_lang_btn  a").addEventListener("click",function(){
		if(this.nextElementSibling.style.display == 'none'){
			this.nextElementSibling.style.display='block';
		}else{
			this.nextElementSibling.style.display='none';
		}
	});

	for(var i=0; i < document.querySelectorAll(".quick > div > p > button").length; i++){
		if(i==0){
			document.querySelectorAll(".quick > div > p > button")[i].addEventListener('click',function(e){
				if(window.innerWidth > 1200) return;
				document.querySelectorAll(".quick > div > p")[0].style.display='none';		
				document.querySelectorAll(".quick > div > p")[1].style.display='block';		
				document.querySelector(".quick > div > ul").style.display='block';		
			});				
		}
		if(i==1){
			document.querySelectorAll(".quick > div > p > button")[i].addEventListener('click',function(e){
				if(window.innerWidth > 1200) return;
				document.querySelectorAll(".quick > div > p")[0].style.display='block';		
				document.querySelectorAll(".quick > div > p")[1].style.display='none';		
				document.querySelector(".quick > div > ul").style.display='none';		
			});		
		}
	}
	window.addEventListener("click",function(e){
		// 마이페이지 
		if($(".g_my").find($(e.target)).length == 0){
			$(".g_my > .g_list").hide();
		}		
		// 언어
		if($(".g_lang_btn").find($(e.target)).length == 0){
			$(".g_lang_btn > .g_list").hide();
		}				
	});
}
menuInit();                  
function link_go(src){
	var form = document.searchForm;
	form.startPage.value=src;
	form.submit();
}                              

//main
jQuery(function ($) {
	// 비주얼
	var visualSlider = $(".visualList");
	visualSlider.slick({
		dots: true,
		arrows: false,
		vertical: false,
		infinite: true,
		centerMode: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 700,
	});

	$('.visualPlay').click(function(){
		visualSlider.slick('slickPlay');
		$('.visualStop').addClass("on");
		$(this).removeClass("on");
	});
	 
	$('.visualStop').click(function(){
		visualSlider.slick('slickPause');
		$('.visualPlay').addClass("on");
		$(this).removeClass("on");
	});


	// 지금전주는
	var nowSlider = $(".nowList");
	nowSlider.slick({
		dots: false,
		vertical: false,
		infinite: true,
		centerMode: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2500,
		speed: 800,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.nowPlay').click(function(){
		nowSlider.slick('slickPlay');
		$('.nowStop').addClass("on");
		$(this).removeClass("on");
	});
	 
	$('.nowStop').click(function(){
		nowSlider.slick('slickPause');
		$('.nowPlay').addClass("on");
		$(this).removeClass("on");
	});


	// 이달의 추천여행
	var monthSlider = $(".monthList");
	monthSlider.slick({
		dots: false,
		vertical: false,
		infinite: true,
		centerMode: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 800,
	});

	$('.monthPlay').click(function(){
		monthSlider.slick('slickPlay');
		$('.monthStop').addClass("on");
		$(this).removeClass("on");
	});
	 
	$('.monthStop').click(function(){
		monthSlider.slick('slickPause');
		$('.monthPlay').addClass("on");
		$(this).removeClass("on");
	});



	// 주요명소
	var placeSlider = $(".placeList");
	placeSlider.slick({
		dots: false,
		vertical: false,
		infinite: true,
		centerMode: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		//autoplay: true,
		autoplaySpeed: 3000,
		speed: 800,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});



	// 다양한 행사
	$(".tab > li").each(function (i) {
		$(this).attr("idx", i);
		}).click(function () {
			var n = $(this).attr("idx");
			$(this).parents(".wrap").find(".tab_con .idx").hide();
			$(this).parents(".wrap").find(".tab_con .idx:eq(" + n + ")").show();
			$(this).parents(".wrap").find(".tab > li").removeClass("on");
			$(this).addClass("on");
			$(".eventList").slick('setPosition')
		});

	var slider = $(".eventList");
	slider.slick({
		dots: false,
		vertical: false,
		infinite: true,
		centerMode: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		//autoplay: true,
		autoplaySpeed: 3000,
		speed: 800,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
})           
//
function m_infoSlideFun(){
		$('.infozone > ul').slick({
			dots: false,
			useCSS:false,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			adaptiveHeight: true,
			prevArrow : ".infozone > .btn_set > .prev",
			nextArrow : ".infozone > .btn_set > .next",
			responsive: [
						{  
							breakpoint: 1401, 
							settings: {
								slidesToShow:3 
							} 
						},
						{ 
							breakpoint: 1400,
							settings: {	
								slidesToShow:1
							} 
						}
					]
		});	
	}

	$(".sec00 > .info_btn").bind("click",function(){
		if(device != 1) return;
		if($(".m_info").css("display") == "none"){
			$(".m_info").show();
			if($(".infozone > ul").hasClass("slick-slider")){
				$(".infozone > ul").slick('unslick');
			}
			if($(".infozone > ul > li").length >= 2){
				$(".infozone > ul > li").hide();
				$(".infozone > ul > li:eq('0')").show();
			}
		}else if($(".m_info").css("display") == "block"){
			$(".m_info").hide();
		}
	});

	$(".sec00 > .info_btn").bind("mouseenter",function(){
		if(device != 2) return;
		$(".infozone > ul > li").show();
		$(".m_info").stop(true,true);
		$(".m_info").show();
		if(!$(".infozone > ul").hasClass("slick-slider")){
			m_infoSlideFun();		
		}
		var tmpHeight = $(".m_info").height();
		$(".m_info").height(0);
		$(".m_info").animate({ height : tmpHeight + "px" },250, function() {
			$(".m_info").css('height', '');
		});
	});

	$(".m_info").bind("mouseleave",function(){
		if(device != 2) return;
		$(".m_info").stop(true,true);
		$(".m_info").animate({ height : "0px" },250, function() {
			$(".m_info").css('height', '');
			$(".m_info").hide();
		});
	});

	$(".infozone > .btn_set > .prev").bind("click",function(){
		if(device != 1) return;
		var prevEle;
		if($(".infozone > ul > li:not([style*='display: none'])").prev("li").length > 0 ){
			prevEle = $(".infozone > ul > li:not([style*='display: none'])").prev("li");
		}else{
			prevEle = $(".infozone > ul > li:last");
		}
		$(".infozone > ul > li").hide();
		$(prevEle).show();
	});

	$(".infozone > .btn_set > .next").bind("click",function(){
		if(device != 1) return;
		var nextEle;
		if($(".infozone > ul > li:not([style*='display: none'])").next("li").length > 0 ){
			nextEle = $(".infozone > ul > li:not([style*='display: none'])").next("li");
		}else{
			nextEle = $(".infozone > ul > li:first");
		}
		$(".infozone > ul > li").hide();
		$(nextEle).show();
	});

	function visualImgFun(){
		if($(".m_intro > .visual > li").length <= 1) return;

		var target = $(".m_intro > .visual > li.on");
		$(target).removeClass("on");
		if($(target).next("li").length > 0){
			$(target).next("li").addClass("on");
		}else{
			$(".m_intro > .visual > li").eq(0).addClass("on");
		}
	}
	 setInterval(visualImgFun, 7000);