"use strict";
(function () {
  const overlay = document.querySelector("#overlay");
  const challenges = document.querySelector(".challenges");

  challenges.addEventListener("click", function () {
    overlay.classList.toggle("active");
  });
})();
