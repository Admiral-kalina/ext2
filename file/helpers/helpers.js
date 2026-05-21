(function () {
  function range(price, json, json_type1) {
    console.log("RANGE", price, json, json_type1)
    for (let i = 0; i < json[json_type1].length; i++) {
      const item = json[json_type1][i];

      const [minStr, maxStr] = item.range_price.split(' - ');
      const min = Number(minStr);
      const max = Number(maxStr);

      if (price >= min && price <= max) {
        const gate = Number(item.Gate);
        const internetFee = Number(item.Internet_fee);
        const fee = Number(item.fee);
        const procent = item.procent ? Number(item.procent) : 0;

        if (procent) {
          return Math.round(gate + internetFee + fee + price * (procent / 100));
        } else {
          return Math.round(gate + internetFee + fee);
        }
      }
    }
  }

  function getInnerForHtml(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, p1, p2, p4, p5, p6, p7, p9, lp, buyNowExist) {
    return `
${carName ? `${carName} ` : ''}
${buyNowPrice ? buyNowExist ? `Ціна по Buy Now: $${buyNowPrice}`: `Ціна: $${buyNowPrice}` : ''}
${runMiles ? `Пробіг: ${runMiles}` : 'Пробіг:  Інформація відсутня'}
${carState ? `Стан: ${carState}` : 'Стан: Інформація відсутня'}
${engine && engine !== '0' ? `Двигун: ${engine}` : 'Двигун: Інформація відсутня'}
${typeOfDrive ? `Тип привода: ${typeOfDrive}` : 'Тип привода: Інформація відсутня'}
Доставка до порту Клайпеда: $${p4 + p2} (через порт ${p9})
Митні платежі: $${p6}
Всі витрати: $${lp + p1 + p2 + p4 + p5 + p6 + p7}
Лот : ${window.location.href}</br>
Задати питання: https://t.me/Roman_Tsv
`}

  function getErrorText(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, buyNowExist) {
    return `
${carName ? `${carName}` : ''}
${buyNowPrice ? `Ціна: $${buyNowPrice}` : ''}
${buyNowPrice ? buyNowExist ? `Ціна по Buy Now: $${buyNowPrice}`: `Ціна: $${buyNowPrice}` : ''}
${runMiles ? `${runMiles}` : 'Інформація відсутня'}
${carState ? `Стан: ${carState}` : 'Стан: Інформація відсутня'}
${engine && engine !== '0' ? `Двигун: ${engine}` : 'Двигун: Інформація відсутня'}
${typeOfDrive ? `Тип привода: ${typeOfDrive}` : 'Тип привода: Інформація відсутня'}
Лот : ${window.location.href}</br>
Задати питання: https://t.me/Roman_Tsv
`}

  function getErrorForAI(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, c1) {
    return `
 <div class="tile tile--data" id="usca">
    	<div>
    		<div class="tile-header">
    			<h2 class="data-title">USCA розрахунок авто з США</h2>
    			<div class="atlscars-header-links" style="position: absolute;right: 8px;">
    				<div>
    					<a href="https://t.me/Yaroslav_Vikhariev" title="Telegram" style="top: -13px;position: absolute;right: 32px;" target="_blank">
    						<svg viewBox="0 0 64 64" width="26" height="26">
    							<circle cx="32" cy="32" r="31" fill="#37aee2"></circle>
    							<path d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957"</path>
    						</svg>
    					</a>
    					<a href="https://usca.com.ua/" title="Telegram" style="top: -13px;position: absolute;right: 0px; border-radius: 100%;" target="_blank">
    						<img src="https://usca.com.ua/img/usca-32.png" alt="" style="border-radius: 100%;height: 26px;">
    					</a>
    				</div>
    			</div>
    		</div>
    		<div class="tile-body">
    			<ul class="data-list data-list--details">
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Автомобіль:</span>
    					<span class="data-list__value">
    						<p class="p1">${carName}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Ціна:</span>
    					<span class="data-list__value">
    						<p class="p4">${buyNowPrice}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Пробіг:</span>
    					<span class="data-list__value">
    						<p class="p6">${runMiles ? `${runMiles}` : 'Інформація відсутня'}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Двигун:</span>
    					<span class="data-list__value">
    						<p class="p7">${engine && engine !== '0' ? `${engine}` : 'Інформація відсутня'}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span>Тип привода:</span>
    					<span class="data-list__value">
    						<strong>
    							<p class="p8">${typeOfDrive ? `${typeOfDrive}` : 'Інформація відсутня'}</p>
    						</strong>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span>Лот:</span>
    					<span class="data-list__value">
    						<strong>
    							<p class="p8">${window.location.href}</p>
    						</strong>
    					</span>
    				</li>
    			</ul>
    		</div>
    		<div style="text-align: center;">
    			<span style="display:none" class="c1">${c1}</span>
    			<button 
    			  class='copy-btn' 
    			  onclick="navigator.clipboard.writeText(document.querySelector('.c1').innerText)"
    			>
    			  Скопіювати дані
    			</button>
    			<a class='orderLink' href="https://usca.com.ua/" target="_blank">Замовити</a>
    		</div>
    	</div>
    </div>
`}


  function getErrorForCopart(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, c1) {
    return `
      <div class="p-0 lot-information d-flex f-g1" id="usca">
     <div class="p-0 panel f-g2 d-flex-column full-width">
      <div class="panel-heading page-titles" style="overflow: hidden !important; position: relative;">
       <h3>
        <strong>USCA розрахунок авто з США</strong>
       </h3>
       <a href="https://t.me/Yaroslav_Vikhariev" title="Telegram" style="top: 6px; position: absolute;right: 42px;" target="_blank"><svg viewBox="0 0 64 64" width="26" height="26"><circle cx="32" cy="32" r="31" fill="#37aee2"></circle><path d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957" fill="white"></path></svg></a>
       <a href="https://usca.com.ua/" title="Telegram" style="top: 6px; position: absolute;right: 10px; border-radius: 100%;" target="_blank"><img src="https://usca.com.ua/img/usca-32.png" alt="" style="border-radius: 100%;height: 26px;"></a>
      </div>
      <div class="tab-content f-g1 d-f">
       <div style="display:block!important" class="panel-content clearfix f-g1 d-flex-column full-width">
        <div class="f-g2">
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           Автомобіль:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p1">${carName}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           Ціна:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p5">${buyNowPrice}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           Пробіг:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p6">${runMiles ? `${runMiles}` : 'Інформація відсутня'}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           Двигун:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p7">${engine && engine !== '0' ? `${engine}` : 'Інформація відсутня'}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           <b>Тип привода:</b>
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="bold p8">${typeOfDrive ? `${typeOfDrive}` : 'Інформація відсутня'}</p>
             </span>
         </div>
          <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label class="left bold">
           <b>Лот:</b>
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="bold p8">${window.location.href}</p>
             </span>
         </div>
        </div>
        <div style="text-align: center;">
            <span style="display:none" class="c1">${c1}</span>
                        <button
                        class='copy-btn'
                        style="border: none; background-color:transparent; color:#1254ff; font-weight: 700;"
                        onclick="navigator.clipboard.writeText(document.querySelector('.c1').innerText)"
                        ><a>Скопіювати дані</a></button>
         <a class='orderLink' href="https://usca.com.ua/" target="_blank">Замовити</a>
        </div>
       </div>
      </div>
     </div>
    </div> 
   `}

  function aiTpl(p1, p2, p3, p4, p5, p6, p7, p9, lp, itogoDostavka, aciz, poshlina, nds, c1) {
    return `
    <div class="tile tile--data" id="usca">
    	<div>
    		<div class="tile-header">
    			<h2 class="data-title">USCA розрахунок авто з США</h2>
    			<div class="atlscars-header-links" style="position: absolute;right: 8px;">
    				<div>
    					<a href="https://t.me/Yaroslav_Vikhariev" title="Telegram" style="top: -13px;position: absolute;right: 32px;" target="_blank">
    						<svg viewBox="0 0 64 64" width="26" height="26">
    							<circle cx="32" cy="32" r="31" fill="#37aee2"></circle>
    							<path d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957"</path>
    						</svg>
    					</a>
    					<a href="https://usca.com.ua/" title="Telegram" style="top: -13px;position: absolute;right: 0px; border-radius: 100%;" target="_blank">
    						<img src="https://usca.com.ua/img/usca-32.png" alt="" style="border-radius: 100%;height: 26px;">
    					</a>
    				</div>
    			</div>
    		</div>
    		<div class="tile-body">
    			<ul class="data-list data-list--details">
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Вартість Авто / ЛОТу:</span>
    					<span class="data-list__value">
    						<input class="input-md form-control" onchange="calculate(this.value)" value=${lp} type="text" name="lp" pattern="[0-9.]+" value="">
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Збори аукціону:</span>
    					<span class="data-list__value">
    						<p class="p1">$${p1}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Доставка до порту Клайпеда:</span>
    					<span class="data-list__value">
    						<p class="p4">$${itogoDostavka}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
                    	<span style="font-weight: 100">(Через порт:&nbsp;<span style="float: none; font-weight: 100;" class="p9">${p9}</span>)</span>
                    </li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Розвантаження + Брокер:</span>
    					<span class="data-list__value">
    						<p class="p5">$${p5}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Митниця:</span>
    					<span class="data-list__value">
    						<p class="p6">$${Math.ceil(+poshlina)}П + $${Math.ceil(+aciz)}A + $${Math.ceil(+nds)}НДС = $${p6}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span class="data-list__label">Комісія:</span>
    					<span class="data-list__value">
    						<p class="p7">$${p7}</p>
    					</span>
    				</li>
    				<li class="data-list__item clearfix-iaia">
    					<span><b>Всього:</b></span>
    					<span class="data-list__value">
    						<strong>
    							<p class="p8">$${lp + p1 + p2 + p4 + p5 + p6 + p7}</p>
    						</strong>
    					</span>
    				</li>
    			</ul>
    		</div>
    		<div style="text-align: center;">
    			<span style="display:none" class="c1">${c1}</span>
    			<button 
    			  class='copy-btn' 
    			  onclick="navigator.clipboard.writeText(document.querySelector('.c1').innerText)"
    			>
    			  Скопіювати дані
    			</button>
    			<a class='orderLink' href="https://usca.com.ua/" target="_blank">Замовити</a>
    		</div>
    	</div>
    </div>
    `
  }

  function copartTpl(p1, p2, p3, p4, p5, p6, p7, p9, lp, itogoDostavka, aciz, poshlina, nds, c1) {
    return `
      <div class="p-0 lot-information d-flex f-g1" id="usca">
     <div class="p-0 panel f-g2 d-flex-column full-width">
      <div class="panel-heading page-titles" style="overflow: hidden !important; position: relative;">
       <h3>
        <strong>USCA розрахунок авто з США</strong>
       </h3>
       <a href="https://t.me/Yaroslav_Vikhariev" title="Telegram" style="top: 6px; position: absolute;right: 42px;" target="_blank"><svg viewBox="0 0 64 64" width="26" height="26"><circle cx="32" cy="32" r="31" fill="#37aee2"></circle><path d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957" fill="white"></path></svg></a>
       <a href="https://usca.com.ua/" title="Telegram" style="top: 6px; position: absolute;right: 10px; border-radius: 100%;" target="_blank"><img src="https://usca.com.ua/img/usca-32.png" alt="" style="border-radius: 100%;height: 26px;"></a>
      </div>
      <div class="tab-content f-g1 d-f">
       <div style="display:block!important" class="panel-content clearfix f-g1 d-flex-column full-width">
        <div class="f-g2">
         <div class="clearfix">
          <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;">
           <label style="width: 100%;" class="left bold">
            Вартість Авто / ЛОТу:
           </label>
           <span id="vinDiv" class=" lot-details-desc right d-f align-center">
            <input onchange="calculate(this.value)" value=${lp} style="max-width:120px; margin-left:auto" class="input-md form-control" type="text" name="lp" pattern="[0-9.]+" >
           </span>
          </div>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           Збори аукціону:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p1">$${p1}</p>
             </span>
         </div>
         <div class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           Доставка до порту Клайпеда:
          </label>
          <span style="margin-left: 20px; font-weight:100;float: left;display: inline-flex;color: #999999;">
           <span style="font-weight: 100">(Через порт:&nbsp;<span style="float: none; font-weight: 100;" class="p9">${p9}</span>)</span>
          </span>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p4">$${itogoDostavka}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           Розвантаження + Брокер:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p5">$${p5}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           Митниця:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p style="white-space: nowrap;" class="p6">$${Math.ceil(+poshlina)}П + $${Math.ceil(+aciz)}A + $${Math.ceil(+nds)}НДС = $${p6}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           Комісія:
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="p7">$${p7}</p>
             </span>
         </div>
         <div style="align-items: center;width: 100%;display: flex;justifyContent: space-between;" class="border-top-gray pt-8 clearfix">
          <label style="width: 100%;" class="left bold">
           <b>Всього:</b>
          </label>
          <span style="text-align:right" class="lot-details-desc right">
           <p class="bold p8">$${lp + p1 + p2 + p4 + p5 + p6 + p7}</p>
             </span>
         </div>
        </div>
        <div style="text-align: center;">
            <span style="display:none" class="c1">${c1}</span>
                        <button
                        class='copy-btn'
                        style="border: none; background-color:transparent; color:#1254ff; font-weight: 700;"
                        onclick="navigator.clipboard.writeText(document.querySelector('.c1').innerText)"
                        ><a>Скопіювати дані</a></button>
         <a class='orderLink' href="https://usca.com.ua/" target="_blank">Замовити</a>
        </div>
       </div>
      </div>
     </div>
    </div> 
   `
  }

  window.getErrorText = getErrorText
  window.getErrorForAI = getErrorForAI
  window.getErrorForCopart = getErrorForCopart
  window.getInnerForHtml = getInnerForHtml
  window.aiTpl = aiTpl
  window.copartTpl = copartTpl
  window.range = range;
})();
