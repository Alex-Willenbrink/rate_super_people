$(document).ready(function() {
  const sliders = ["intelligence", "strength"];

  // With JQuery
  sliders.forEach(sliderType => {
    $(`#slider-${sliderType}`).slider();
  });
});
