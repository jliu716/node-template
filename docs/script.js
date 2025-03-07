function getFontStyleName(element) {
   const computedStyle = window.getComputedStyle(element);
   const fontWeight = computedStyle.fontWeight;
   const fontStyle = computedStyle.fontStyle;

   let weightName;

   if (fontWeight === "100") weightName = "Thin";
   else if (fontWeight === "200") weightName = "Extra Light";
   else if (fontWeight === "300") weightName = "Light";
   else if (fontWeight === "400") weightName = "Regular";
   else if (fontWeight === "500") weightName = "Medium";
   else if (fontWeight === "600") weightName = "Semi-Bold";
   else if (fontWeight === "700") weightName = "Bold";
   else if (fontWeight === "800") weightName = "Extra Bold";
   else if (fontWeight === "900") weightName = "Black";
   else weightName = `Unknown (${fontWeight})`;

   // Add Italic if applicable
   if (fontStyle === "italic") {
      weightName += " Italic";
   } else if (fontStyle === "oblique") {
      weightName += " Oblique";
   }

   return weightName;
}

function loadPostScriptName() {
   for (let td of document.querySelectorAll('.post-script-font-name')) {
      // calculate the post script font name of td element
      var fontStyle = getFontStyleName(td);

      var postScriptName = window.robotoFonts.find((font) => font.family === "Roboto" && font.style === fontStyle);

      // set the innerHTML of td element to the calculated font family name
      td.innerHTML = postScriptName?.fullName || "N/A";
   }
}

document.addEventListener('DOMContentLoaded', function () {


   if ("queryLocalFonts" in window) {
      window.queryLocalFonts().then((fonts) => {
         // filter the fonts whose family matches /roboto/is
         var robotoFonts = fonts.filter((font) => /roboto/i.test(font.family));
         // log out the filtered fonts
         console.log(robotoFonts);
         window.robotoFonts = robotoFonts;

         loadPostScriptName();
      });
   } else {
      console.log("queryLocalFonts API is not supported.");
   }


   // get all the td.rendered-font-family-name elements
   var tds = document.querySelectorAll('.rendered-font-family-name');

   // loop through each td element in for of
   for (let td of tds) {
      // calculate the rendered font family name of td element
      var fontFamily = getComputedStyle(td).fontFamily;

      var fontStyle = getFontStyleName(td);

      // set the innerHTML of td element to the calculated font family name
      td.innerHTML = fontFamily;
   }

   // loop through each td.post-script-font-name
   for (let td of document.querySelectorAll('.font-style')) {
      // calculate the post script font name of td element
      var fontStyle = getFontStyleName(td);

      // set the innerHTML of td element to the calculated font family name
      td.innerHTML = fontStyle;
   }


});