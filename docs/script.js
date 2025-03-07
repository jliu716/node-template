var postscriptNamesOSX = {
   '100': 'Roboto-Thin',
   '200': 'Roboto-Thin',
   '300': 'Roboto-Light',
   '400': 'Roboto-Regular',
   '500': 'Roboto-Medium',
   '600': 'Roboto-Bold',
   '700': 'Roboto-Bold',
   '800': 'Roboto-Black',
   '900': 'Roboto-Black',
};

var fontStylesOSX = {
   '100': 'Thin',
   '200': 'Thin',
   '300': 'Light',
   '400': 'Regular',
   '500': 'Medium',
   '600': 'Bold',
   '700': 'Bold',
   '800': 'Black',
   '900': 'Black',
};

var weights = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => {
   return {
      weight: weight,
      style: fontStylesOSX[weight],
      postScriptName: postscriptNamesOSX[weight],
   };
});

function populateRows() {

   var tbody = document.querySelector('#font-test tbody');

   for (let weight of weights) {

      var tr = document.createElement('tr');
      tr.classList.add('rendered-font', `font-${weight.weight}`);
      tr.style.fontWeight = weight.weight;
      tbody.appendChild(tr);

      var td = document.createElement('td');
      td.innerHTML = weight.weight;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = 'The quick brown fox jumps over the lazy dog';
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('rendered-font-family-name');
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('font-style');
      td.innerHTML = weight.style;
      tr.appendChild(td);

      td = document.createElement('td');
      td.classList.add('post-script-font-name');
      td.innerHTML = 'N/A';
      tr.appendChild(td);
   }
}

document.addEventListener('DOMContentLoaded', function () {

   populateRows();

   // populate css font-family name
   var tds = document.querySelectorAll('.rendered-font-family-name');
   for (let td of tds) {
      td.innerHTML = getComputedStyle(td).fontFamily;
   }

   if ("queryLocalFonts" in window) {
      window.queryLocalFonts().then((fonts) => {
         // filter the fonts whose family matches /roboto/is
         var robotoFonts = fonts.filter((font) => /roboto/i.test(font.family));
         // log out the filtered fonts
         console.log(robotoFonts);
         window.robotoFonts = robotoFonts;

         // loop through each td.post-script-font-name
         for (let weight of weights) {
            const postScriptName = postscriptNamesOSX[weight.weight];
            const theFont = robotoFonts.find((font) => font.postscriptName === postScriptName);
            if (theFont) {
               var td = document.querySelector(`.font-${weight.weight} td.font-style`);
               td.innerHTML = theFont.style;
            }
         }

         // for (let td of document.querySelectorAll('.post-script-font-name')) {
         //    // calculate the post script font name of td element
         //    var fontStyle = getFontStyleName(td);

         //    var postScriptName = window.robotoFonts.find((font) => font.family === "Roboto" && font.style === fontStyle);

         //    // set the innerHTML of td element to the calculated font family name
         //    td.innerHTML = postScriptName?.fullName || "N/A";
         // }

         for (let weight of weights) {
            const fontStyleName = fontStylesOSX[weight.weight];
            const theFont = robotoFonts.find((font) => font.style === fontStyleName);
            var td = document.querySelector(`.font-${weight.weight} td.post-script-font-name`);
            td.innerHTML = theFont?.postscriptName || "N/A";
         }
      });
   } else {
      console.log("queryLocalFonts API is not supported.");
   }
});

window.logAllRobotoFonts = function () {
   window.queryLocalFonts().then((fonts) => {
      fonts.forEach((font) => {
         if (/roboto/i.test(font.family)) {
            console.log(font);
         }
      });
   });
}