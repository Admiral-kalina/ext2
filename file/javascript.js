const LIST_OF_FUEL = ['electric', 'gas', 'gasoline', 'diesel', 'ELECTRIC', 'flexible fuel', 'other', 'hybrid', 'hybrid engine', 'unknown'];

const listWithoutCounting = ['electric', 'flexible fuel', 'other', 'hybrid', 'hybrid engine', 'unknown'];

const LIST_OF_BODY = ['suv', 'bus', 'pickup', 'crew pickup', 'wagon', 'crew pic', 'utility', 'coupe', ];
const LIST_OF_BODY_CLASS_2 = ['suv', 'suv/crossover', 'wagon', '4drspor', 'sportsv', 'utility'];
const LIST_OF_BODY_CLASS_3 = ['bus', 'cargova', 'pickup', 'crewpic', 'clubcab', 'sportpi', '4drext', 'truck'];


let BROKER_VALUE = 1460;
const AIAI_HOST = 'www.iaai.com';
const COPART_HOST = 'www.copart.com';
let usdCoefficient = 0;

let json = {};
let siteData = {};

let buyNowExist = false;
let buyNowPrice = null;
let runMiles = null;
let highlights = null;
let engine = null;
let typeOfDrive = null;
let fuelType = null;
let saleState = null;
let stateCode = null;
let vehicleTypePrice = null;
let deliveryMore = null;
let rangePrice = null;
let json_type1 = null;
let json_type2 = null;
let json_type3 = null;
let bodyStyle = null;
let carState = null;
let transmitionType = null
let isPortFind = false;
let error = false;


let akciz_by_dvigatel = null;
let objem = null;
let lot = null;
let aciz = null;
let poshlina = null;
let sbor_aukciona = rangePrice;
let nds = null;
let ctc = null;
let itogo_rastamojka = null;

let raznica_god = null
let carYear = null;
let carName = null;
const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 2);


const script = async () => {
  json = await window.fetchPriceData();
  usdCoefficient = await window.fetchAndCalculateCoefficient();
  console.log("EXT JSON", json)

  try{
    if (location.host === AIAI_HOST) {
      
      siteData = {
        buyNowPrice: document.querySelectorAll('#vdActionInfo  .action-area__secondary-info .data-list__value')[0]?.innerText || 0,
        location: Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Selling Branch:")?.nextElementSibling?.innerText || document.querySelectorAll('.data-list--details')[12]?.children[0]?.children[1]?.innerText || '',
        engineVolume: document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[3]?.children[3]?.innerText || '',
        fuelType: document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[6]?.children[1]?.innerText || '',
        typeOfDrive: document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[5]?.children[1]?.innerText || '',
        vehicleType: document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[1]?.children[1]?.innerText || '',
        odometer: Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Odometer:")?.nextElementSibling?.innerText || document.querySelectorAll('.data-list--details')[9]?.children[8]?.children[1]?.innerText || document.querySelectorAll('.data-list--details')[9]?.children[9]?.children[1]?.innerText || document.querySelectorAll('.data-list--details')[9]?.children[10]?.children[1]?.innerText || '',
        carState: Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Primary Damage:")?.nextElementSibling?.nextElementSibling?.innerText?.trim() || Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Secondary Damage:")?.nextElementSibling?.innerText || document.querySelectorAll('.data-list--details')[9]?.children[6]?.children[2]?.innerText.trim() || document.querySelectorAll('.data-list--details')[9]?.children[7]?.children[2]?.children[0]?.innerText.replace(/\s+/g, '') || document.querySelectorAll('.data-list--details')[9]?.children[8]?.children[2]?.innerText.trim() || '',
        transmissionType: document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[4]?.children[1]?.innerText || '',
        carName: document.querySelectorAll('.vehicle-header .heading-2')[0]?.innerText || '',
        bodyType: Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Vehicle Class:")?.nextElementSibling.innerText || document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[2]?.children[1]?.innerText || '',
      };

      console.log("SITE DATA QWERT", siteData)


      if(document.querySelectorAll('.data-list--details')[12]?.children[1]?.children[0]?.children[0]?.innerText === 'More Info'){
        siteData.fuelType = document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[7]?.children[1]?.innerText || '';
        siteData.odometer = Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Odometer:")?.nextElementSibling?.innerText || '';
        siteData.location = document.querySelectorAll('.data-list--details')[11]?.children[1]?.children[1]?.innerText;
        siteData.engineVolume = document.querySelectorAll('.data-list--details')[12]?.children[4]?.children[3]?.innerText;
        siteData.vehicleType = document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[2]?.children[1]?.innerText || '';
        siteData.transmissionType = document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[5]?.children[1]?.innerText || '';
        siteData.typeOfDrive = document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[6]?.children[1]?.innerText || '';
        siteData.carState = document.querySelectorAll('.data-list--details')[11]?.children[7]?.children[3]?.innerText;
      }

      console.log("SITE DATA QWERT",Array.from(document.querySelectorAll("span.data-list__label"))?.find(el => el.textContent.trim() === "Primary Damage:")?.nextElementSibling?.nextElementSibling?.innerText.trim() )
      console.log("SITE DATA 2",  )

      console.log("SITE DATA LOCATION",siteData)

      if(document.querySelectorAll('.data-list--details')[11]?.children[8]?.children[0]?.innerText === "Odometer:") {
       siteData.odometer =  document.querySelectorAll('.data-list--details')[11]?.children[8]?.children[1]?.innerText
      }

      if(document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[5]?.children[0]?.innerText === 'Fuel Type:'){
        siteData.fuelType = document.querySelectorAll('#waypoint-trigger .data-list--details')[0]?.children[5]?.children[1]?.innerText || '';
      }


      if(siteData.location === 'Electric Vehicle Auctions'){
        const fullText = document.querySelectorAll('.data-list__value-offsite')[0]?.children[0]?.children[1].innerText;
        const match = fullText.match(/\(([^)]+)\)/); // This gets text inside the first pair of brackets
        stateCode = match[1].trim();
        siteData.location = stateCode
      } else if (!siteData?.location?.includes('(') && !!siteData.location){
        const loc = document.querySelectorAll('.data-list__value-offsite')[0].children[0].children[1].innerText
        const match = loc.match(/\(([^)]+)\)/); // This gets text inside the first pair of brackets
        if(match){
          stateCode = match[1]?.trim() || '';
        }
      }else if(siteData.location){
        stateCode = /\(([^)]+)\)/.exec(siteData.location)[1]
      } else if(document.querySelectorAll('.data-list--details')[11]?.children[0]?.children[1]?.children[0]?.innerText) {
        const state = document.querySelectorAll('.data-list--details')[11]?.children[0]?.children[1]?.children[0]?.innerText.match(/\(([^)]+)\)/)?.[1]
        stateCode = state
        siteData.location = state
      }
      console.log("STATE CODE ,", stateCode)

      json_type1 = 'iaai';
      json_type2 = 'states_usa';
      json_type3 = 'usa_to_other_country';

      if (siteData.buyNowPrice === 0) {
        buyNowPrice = 1;
      } else {
        buyNowExist = true;
        buyNowPrice = +siteData.buyNowPrice.replace(/[^0-9.]/g, "")
      }

      if(siteData.typeOfDrive) {
        typeOfDrive = siteData.typeOfDrive;
      }

      if (siteData.odometer) {
        runMiles = siteData.odometer;
      }

      if(siteData.fuelType.toLowerCase() === 'electric') {
        objem = 0;
        engine = siteData.engineVolume;
      }else if (siteData.engineVolume) {
        objem = +siteData.engineVolume.match(/(\d+(\.\d+)?)/)[1];
        engine = siteData.engineVolume;
      }
      console.log("EXT OBJEM", objem)

      if (siteData.carState) {
        carState = siteData.carState;
      }

      if (siteData.fuelType) {
        fuelType = siteData.fuelType.toLowerCase();
      }

      if (siteData.bodyType) {
        bodyStyle = siteData.bodyType.toLowerCase();
      }

      if (siteData.transmissionType) {
        transmitionType = siteData.transmissionType;
      }

      carYear = +siteData.carName.match(/^(\d{4})/)[0]

      carName = siteData.carName;

    } else if (location.host === COPART_HOST) {
      json_type1 = 'copart_usa';
      json_type2 = 'states_usa';
      json_type3 = 'usa_to_other_country';

console.log('SITE DATA RUN');
json_type1 = 'copart_usa';

const sanitize = s =>
  (s || '')
    .replace(/\u00A0/g, ' ') 
    .trim()
    .replace(/[:：]\s*$/, '')   
    .replace(/\s+/g, '');  

const labelNodes = [
  ...document.querySelectorAll('.lot-details-information-label'),
  ...document.querySelectorAll('label[data-uname^="lotdetail"]')
];

const byLabel = labelNodes.reduce((acc, labelEl) => {
  const key = sanitize(labelEl.textContent);

  const valueContainer =
    labelEl.nextElementSibling ||
    labelEl.parentElement?.querySelector('.lot-details-desc, .lot-details-information-desc');

  const value = (valueContainer?.textContent || '')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  acc[key] = { label: key, value };
  return acc;
}, {});

console.log("BL , " ,byLabel)
error = false;
console.log("ERR  ,", error)
 siteData = {
      buyNowPrice: document.querySelector('.buy-it-now-amount')?.innerText || document.querySelector('.bidding-heading')?.innerText || 0,
      vehicleType: byLabel?.Vehicletype?.value || document.querySelector('.cprt-panel-details-row')?.children[2]?.children[0]?.children[1]?.innerHTML || 'Sedan',
      odometer: byLabel?.Odometer?.value || '',
      transmissionType: byLabel?.Transmission?.value || '',
      carName:  document.querySelector('h1')?.innerHTML || '',
      bodyType: byLabel?.Bodystyle?.value || '' || '',
      location: document.querySelector('[data-uname="lotdetailSaleinformationlocationvalue"]')?.innerText || document.querySelector('#locationInfoButton')?.innerText || '',
      engineVolume: byLabel?.Enginetype?.value || '',
      fuelType: byLabel?.Fuel?.value || '',
      carState: byLabel?.Primarydamage?.value || document.querySelector('.lot-highlight')?.children[0]?.innerText|| '',
      highlights: '',
    }

    console.log("siteData ,   ", siteData)
      const element = document.querySelectorAll('[data-uname="lotdetailHighlights"]')[0]?.nextElementSibling.innerText;
      console.log("SITE DEEEE", element)
      console.log("SITE DATA", siteData)

      if(document.querySelector('.buy-it-now-amount')?.innerText){
        buyNowExist = true;
      }

      if (siteData.buyNowPrice === 0) {
        console.log("EXT BUY PRICE", siteData.buyNowPrice)
        buyNowPrice = 1;
      } else {
        const price =  parseInt(
          siteData.buyNowPrice
            .replace(/[^\d,]/g, "")
            .replace(",", "")
        );

        buyNowPrice = price || 1;
      }

      if (siteData.odometer.replace(/[^0-9.]/g, "").length !== 0) {
        runMiles = siteData.odometer.replace(/[^0-9.]/g, "");
      }
      console.log('SITE DATA STATE CODE ', siteData.location.split(" - ")[0])

      stateCode = siteData.location.split(" - ")[0]

      engine = siteData.engineVolume;

      if (siteData.fuelType.toLowerCase() === 'electric') {
        engine = 'Electric';
        objem = 0
      }else{
        objem = +siteData.engineVolume.match(/(\d+(\.\d+)?)/)[1];
      }


      if(siteData.highlights){
        carState = siteData.highlights
      } else {
        carState = siteData.carState;
      }

      fuelType = siteData.fuelType.toLowerCase();

      bodyStyle = siteData.vehicleType.toLowerCase();

      transmitionType = siteData.transmissionType;
      typeOfDrive = siteData.transmissionType;

      console.log("CAR YEAR siteData.carName,", siteData.carName)
      console.log("2 CAR YEAR siteData.carName,", )

      carYear = Number(siteData.carName.trim().match(/^(\d{4})/)[0])
      

      console.log("CAR YEAR ,", carYear)

      carName = siteData.carName;
      console.log("SITE DATA", siteData)

      json_type1 = 'copart_usa';
      json_type2 = 'states_usa';
      json_type3 = 'usa_to_other_country'
      console.log("NEW SITE DATA  ,",siteData)
    } else {
      json_type1 = 'copart_canada';
      json_type2 = 'states_canada';
      json_type3 = 'canada_to_other_country';
    }
  } catch (e){
    // error = true
  }
  console.log('siteData', siteData)

  if(
    siteData.fuelType?.toLowerCase() === 'unknown' ||
    siteData.fuelType?.toLowerCase() === 'unknown/ unknown' ||
    siteData.fuelType?.toLowerCase() === '' ||
    (siteData?.engineVolume === '' && fuelType !== "electric" ) ||
    siteData.location === '' ||
    !bodyStyle
  ){
    error = true
    fuelType = 'unknown'
  }
  console.log("ERR  ,", error)

  const updatedYear = currentDate.getFullYear()
  console.log("EXT JSON TYPE", bodyStyle)
  raznica_god = Math.max(updatedYear - carYear - 1, 1)
  if(!bodyStyle){
    vehicleTypePrice = 0;
  }else if (LIST_OF_BODY_CLASS_2.includes(bodyStyle.toLowerCase())) {
    vehicleTypePrice = json.constant.class_2;
  } else if (
    LIST_OF_BODY_CLASS_3.includes(bodyStyle.toLowerCase())) {
    vehicleTypePrice = json.constant.class_3;
  } else {
    vehicleTypePrice = json.constant.class_1;
  }

  console.log("QQ EXTR", stateCode)
  console.log("QQ EXTR", json_type2)
  console.log("QQ EXTR",  json)
  console.log("ERR  ,", error)
  if (stateCode) {
    saleState = json[json_type2].find(state => state.Code_state === stateCode);
    console.log("EXT QQE", saleState)
    if (saleState?.Port) {
      deliveryMore = json[json_type3].find(deliveryPort => deliveryPort.code === saleState.Port)
    }else{
      error = true
    }
  } else {
    error = true
  }

  console.log("ASDF", buyNowPrice, json, json_type1)
  sbor_aukciona = window.range(buyNowPrice, json, json_type1);


  console.log("ERR  ,", error)
  if (siteData.vehicleType === 'Motorcycle') {
    BROKER_VALUE = 1100
    if (objem === 0) {
      akciz_by_dvigatel = 'Electro'
    } else if (objem < 500) {
      akciz_by_dvigatel = json.constant.akciz_moto_do_500 * usdCoefficient;
    } else if (objem < 800) {
      akciz_by_dvigatel = json.constant.akciz_moto_do_800 * usdCoefficient;
    } else if (objem >= 800) {
      akciz_by_dvigatel = json.constant.akciz_moto_ot_800 * usdCoefficient;
    }
  } else {
    if (
      fuelType.toLowerCase() === 'gas' ||
      fuelType.toLowerCase() === 'other' ||
      fuelType.toLowerCase() === 'hybrid' ||
      fuelType.toLowerCase() === 'flexible fuel' ||
      fuelType.toLowerCase() === 'flexible' ||
      fuelType.toLowerCase() === 'gasoline' ||
      fuelType.toLowerCase() === 'unknown' ||
      fuelType.toLowerCase() === 'hybrid engine'
    ) {
      if (objem <= 3.1) {
        akciz_by_dvigatel = json.constant.akciz_do_3 * usdCoefficient;
      } else {
        akciz_by_dvigatel = json.constant.akciz_ot_3 * usdCoefficient;
      }
    }

    if (fuelType === 'diesel') {
      if (objem < 3.6) {
        akciz_by_dvigatel = json.constant.akciz_diesel_do_3_5 * usdCoefficient;
      } else {
        akciz_by_dvigatel = json.constant.akciz_diesel_ot_3_5 * usdCoefficient;
      }
    }
  }
  console.log("ERR  ,", error)
  const calculate = () => {
    if (fuelType === "electric") {
      itogo_rastamojka = 0;
      nds = Math.floor((buyNowPrice + sbor_aukciona + 1600) * 0.2)
      aciz = 100
      poshlina = 0
      itogo_rastamojka = nds + aciz;
    } else if (siteData.vehicleType.toLowerCase() === 'motorcycle') {
      deliveryMore.price_ukraine = 550
      if (akciz_by_dvigatel === 'electro') {
        aciz = json.constant.akciz_moto_electric;
      } else {
        aciz = akciz_by_dvigatel * objem ;
        ctc = buyNowPrice + sbor_aukciona + (+json['constant']['oblagayemaya_dostavka_moto']);
        poshlina = ctc * +json['constant']['poshlina'];
        nds = (ctc + poshlina + aciz) * json['constant']['nds'];
        itogo_rastamojka = Math.round(aciz + poshlina + nds);
      }
    } else {
      ctc = +json['constant']['oblagayemaya_dostavka'] + sbor_aukciona + buyNowPrice;
      aciz = akciz_by_dvigatel * objem * raznica_god;
      poshlina = ctc * json['constant']['poshlina'];
      nds = (ctc + aciz + poshlina) * json['constant']['nds'];
      itogo_rastamojka = Math.round(aciz + poshlina + nds);
    }
  }
  console.log("ERR  ,", error)

  calculate()

  console.log("EXT  ctc", ctc)
  console.log("EXT  aciz", aciz)
  console.log("EXT  poshlina", poshlina)
  console.log("EXT  nds", nds)
  console.log("EXT  deliveryMore", deliveryMore)
  console.log("EXT  saleState", saleState)

  console.log("EXT site D", siteData)
  console.log("EXT site D", siteData)
  console.log("EXT RAZNITSA GOD", raznica_god)
  console.log("EXT akciz_by_dvigatel", akciz_by_dvigatel)
  console.log("EXT json_type D", deliveryMore)
  console.log("EXT sbor_aukciona", sbor_aukciona)
  console.log("EXT json", json)
  console.log("EXT json_type1", json_type1)
  console.log("EXT json_type2", json_type2)
  console.log("EXT json_type3", json_type3)
  console.log("EXT bodyStyle", bodyStyle)
  console.log("EXT deliveryMore", deliveryMore)

  function incertHtml() {
    let lp
    let p1
    let p2
    let p3
    let p4
    let p5
    let p6
    let p7
    let p9
    let itogoDostavka
    let c1


      lp = parseInt(buyNowPrice) || 'Інформація відсутня';
      p1 = parseInt(sbor_aukciona) || 'Інформація відсутня';
      p2 = parseInt(saleState?.Price_port || 0) || 'Інформація відсутня';
      p3 = parseInt(json?.constant?.otpravka_post) || 'Інформація відсутня';
      p4 = parseInt(deliveryMore?.price_ukraine) + (vehicleTypePrice ) + p3 || 'Інформація відсутня';

      p5 = BROKER_VALUE || 'Інформація відсутня';
      p6 = parseInt(itogo_rastamojka) || 0;
      p7 = parseInt(json?.constant.diller_1) || 'Інформація відсутня';
      p9 = deliveryMore?.name || 'Інформація відсутня';
      itogoDostavka =  `${deliveryMore?.price_ukraine} + $${p2} + $${vehicleTypePrice} + $${p3} = $${p2 + p4}` || 'Інформація відсутня';

      c1= window.getInnerForHtml(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, p1, p2, p4, p5, p6, p7, p9, lp, buyNowExist)



    if (location.host === AIAI_HOST) {
      if(error){
        const newC1 = window.getErrorText(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, buyNowExist)
        document.querySelector('.col-xs-12.col-xl-6').insertAdjacentHTML('afterbegin', window.getErrorForAI(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, newC1));
      } else {
        document.querySelector('.col-xs-12.col-xl-6').insertAdjacentHTML('afterbegin', window.aiTpl(p1, p2, p3, p4, p5, p6, p7, p9, lp, itogoDostavka, aciz, poshlina, nds, c1));
      }
    } else {
      const el = document.querySelector('.vehicle-report-services');
      if (el) {
        el.remove();
      }
      if(document.querySelector('.lot-detail-section')){
        if(error){
          const newC1 = window.getErrorText(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, buyNowExist)
          document.querySelector('.lot-detail-section').insertAdjacentHTML('afterbegin', window.getErrorForCopart(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive,newC1));
        } else {
          document.querySelector('.lot-detail-section').insertAdjacentHTML('afterbegin', window.copartTpl(p1, p2, p3, p4, p5, p6, p7, p9, lp, itogoDostavka, aciz, poshlina, nds, c1));
        }
      }else{
        if(error){
          const newC1 = window.getErrorText(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, buyNowExist)
          document.querySelector('.vehicle-information').insertAdjacentHTML('afterbegin', window.getErrorForCopart(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, newC1));
        } else {
          document.querySelector('.vehicle-information').insertAdjacentHTML('afterbegin', window.copartTpl(p1, p2, p3, p4, p5, p6, p7, p9, lp, itogoDostavka, aciz, poshlina, nds, c1));
        }
        console.log("site data EXT INSERT",document.querySelector('.lot-details-section'))
      }
    }
  }

  incertHtml()


  const recalculateValues = (inputPrice) => {

    if (!inputPrice || isNaN(inputPrice) || inputPrice < 0) {
      inputPrice = 0;
    }

    sbor_aukciona = window.range(inputPrice, json, json_type1);

    buyNowPrice = parseInt(inputPrice);
    buyNowExist = false

    calculate(buyNowPrice);

    let lp = parseInt(buyNowPrice);
    let p1 = parseInt(sbor_aukciona);
    let p2 = parseInt(saleState.Price_port );
    let p3 = parseInt(json.constant.otpravka_post);
    let p4 = parseInt(deliveryMore.price_ukraine) + (vehicleTypePrice) + p3;
    console.log('QQQEXT', vehicleTypePrice)

    let p5 = BROKER_VALUE;
    let p6 = parseInt(itogo_rastamojka) || 0;
    let p7 = parseInt(json.constant.diller_1);
    let p9 = deliveryMore.name;
    const itogoDostavka = p2 + p4;

    console.log("EXT QQ car state", carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, p1, p2, p4, p5, p6, p7, p9, lp, buyNowExist)

    const c1 = window.getInnerForHtml(carName, buyNowPrice, runMiles, carState, engine, typeOfDrive, p1, p2, p4, p5, p6, p7, p9, lp, buyNowExist)

    document.querySelector('.p1').innerText = `$${sbor_aukciona}`;
    document.querySelector('.p4').innerText = `$${deliveryMore.price_ukraine} + $${p2} + $${(vehicleTypePrice)} + $${p3} = $${itogoDostavka}`;

    document.querySelector('.p5').innerText = `$${BROKER_VALUE}`;
    document.querySelector('.p6').innerText = `$${Math.ceil(poshlina)}П + $${Math.ceil(aciz)}A + $${Math.ceil(nds)}НДС = $${itogo_rastamojka}`;
    document.querySelector('.p7').innerText = `$${json.constant.diller_1}`;
    document.querySelector('.p8').innerText = `$${lp +p1 + p2 + p4 + p5 + p6 + p7}`;
    document.querySelector('.c1').innerHTML = c1;
  };

  if(document.querySelector('input[name="lp"]')){
    document.querySelector('input[name="lp"]').addEventListener('input', (event) => {
      console.log("EXT RECALCULATE")
      recalculateValues(event.target.value);
    });
  }
};


function runWhenAnyElementExists(selectors, callback) {
  // Check immediately for each selector
  for (let selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      callback(element, selector);
      return;
    }
  }

  // Set up a MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations, obs) => {
    for (let selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        callback(element, selector);
        return;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

runWhenAnyElementExists(['.data-container', '.lot-details-section', '.tab-content'], (element, selector) => {
  console.log(`Element found (${selector}):`, element);
  script();
});

function handleClick() {
  let currentPage = location.href;
    setInterval(function() {
      if (currentPage !== location.href) {
        currentPage = location.href;
          runWhenAnyElementExists(
            [".data-container", ".lot-details-section", ".tab-content"],
            (element, selector) => {
              console.log(`Element found (${selector}):`, element);
              script();
            }
          );
          document.body.removeEventListener("click", handleClick);

      }
    }, 500);
}

document.body.addEventListener("click", handleClick);
